#!/bin/bash

source ~/.bashrc

dir="$(pwd)"
cd $(cd "$(dirname "$0")"; pwd)/..

gcloud auth login

all=''
test=true
if [ "${1}" == '--prod' ] ; then
	test=''
	shift
elif [ "${1}" == '--all' ] ; then
	all=true
	test=''
	shift
fi

site=''
if [ "${1}" == '--site' ] ; then
	shift
	site="${1}"
	shift
fi

comment="${*}"
test "${comment}" == "" && comment=deploy
./commands/commit.sh "${comment}"

rm -rf .build
mkdir .build
cp -rfL * .build/
cd .build


# Branch config setup
branch="$(git describe --tags --exact-match 2> /dev/null || git branch | awk '/^\*/{print $2}')"
if [ $branch == 'prod' ] ; then
	branch='staging'
fi
ls */*.yaml | xargs -I% sed -i.bak "s/version: master/version: ${branch}/g" %

defaultCSP='referrer no-referrer'
cyphComCSP="$( \
	cat shared/websign/csp | \
	grep -v img-src | \
	sed "s/ data://g" | \
	tr '\n' ' ' \
)"
webSignCSP="$(cat shared/websign/csp | tr '\n' ' ')"
ls cyph.com/*.yaml | xargs -I% sed -i.bak "s|${defaultCSP}|${cyphComCSP}|g" %
ls */*.yaml */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s|${defaultCSP}|${webSignCSP}|g" %

defaultHost='\${location\.protocol}\/\/\${location\.hostname}:'
ls */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s/${defaultHost}43000//g" %
ls */js/cyph/envdeploy.ts | xargs -I% sed -i.bak 's/isLocalEnv: boolean		= true/isLocalEnv: boolean		= false/g' %

if [ $test ] ; then
	sed -i.bak "s/staging/${branch}/g" default/config.go
	ls */*.yaml */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s/api.cyph.com/${branch}-dot-cyphme.appspot.com/g" %
	ls */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s/${defaultHost}42000/https:\/\/${branch}-dot-cyphme.appspot.com/g" %
	ls */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s/${defaultHost}42001/https:\/\/${branch}-dot-cyph-com-dot-cyphme.appspot.com/g" %
	ls */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s/${defaultHost}42002/https:\/\/${branch}-dot-cyph-im-dot-cyphme.appspot.com/g" %
	ls */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s/${defaultHost}42003/https:\/\/${branch}-dot-cyph-me-dot-cyphme.appspot.com/g" %

	# for yaml in `ls */cyph*.yaml` ; do
	# 	cat $yaml | perl -pe 's/(- url: .*)/\1\n  login: admin/g' > $yaml.new
	# 	mv $yaml.new $yaml
	# done
else
	ls */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s/${defaultHost}42000/https:\/\/api.cyph.com/g" %
	ls */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s/${defaultHost}42001/https:\/\/www.cyph.com/g" %
	ls */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s/${defaultHost}42002/https:\/\/www.cyph.im/g" %
	ls */js/cyph/envdeploy.ts | xargs -I% sed -i.bak "s/${defaultHost}42003/https:\/\/www.cyph.me/g" %

	ls */*.yaml | xargs -I% sed -i.bak 's/max-age=0/max-age=31536000\n    Expires: Thu, 31 Dec 2037 23:55:55 GMT/g' %
	ls */*.yaml | xargs -I% sed -i.bak 's/version: staging/version: prod/g' %
fi


# Compile + translate + minify
for d in cyph.im cyph.com ; do
	cd translations

	echo "Translations = { \
		$(echo "$( \
			ls | \
			sed 's/\.json//' | \
			xargs -I% bash -c 'echo -n "\"%\": $(cat %.json | tr "\n" " "),"')" | \
			rev | \
			cut -c 2- | \
			rev \
		) \
	};" >> ../$d/js/preload/translations.ts

	cd ../$d

	../commands/build.sh --prod || exit;

	if [ "${branch}" == 'staging' ] ; then
		echo "JS Minify ${d}"
		find js -name '*.js' | xargs -I% uglifyjs -r \
			importScripts,Cyph,ui,session,vars,self,isaac,onmessage,postMessage,onthreadmessage,WebSign,Translations,IS_WEB,crypto \
			'%' -o '%' -m

		echo "CSS Minify ${d}"
		find css -name '*.css' | grep -v bourbon/ | xargs -I% cleancss -o '%' '%'
		echo "HTML Minify ${d}"
		ls index.html | xargs -I% html-minifier --minify-js --minify-css --remove-comments --collapse-whitespace '%' -o '%'
	fi

	cd ..
done

# Cache bust
echo "Cache bust"
find shared ! -wholename '*fonts/*' ! -wholename '*twemoji*' ! -wholename '*websign*' -type f -print0 | while read -d $'\0' f ; do
	f="$(echo "$f" | sed 's/shared\///g')"
	safeF="$(echo "$f" | sed 's/\//\\\//g' | sed 's/ /\\ /g' | sed 's/\_/\\_/g')"

	for d in cyph.com ; do
		cd $d

		for g in index.html $(find js -name '*.js') $(find css -name '*.css') ; do
			if ( grep -o "$safeF" $g ) ; then
				cat $g | perl -pe "s/(\\/$safeF)/\1?`md5 "$f" | perl -pe 's/.*([a-f0-9]{32}).*/\1/g'`/g" > $g.new
				mv $g.new $g
			fi
		done

		cd ..
	done
done


### WebSign-related stuff

for d in cyph.im ; do
	cd $d

	echo 'WebSign'

	# Merge in base64'd images and audio, BUT NOT fonts (they add 7mb)
	find img audio -type f -print0 | while read -d $'\0' f ; do
		for g in index.html $(find js -name '*.js') $(find css -name '*.css') ; do
			if ( grep -o "$f" $g ) ; then
				dataURI="data:$(echo -n "$(file --mime-type "$f")" | perl -pe 's/.*\s+(.*?)$/\1/g');base64,$(base64 "$f")"

				echo "s|/$f|$dataURI|g" | tr -d '\n' > $g.tmp
				sed -i.bak -f $g.tmp $g
				rm $g.tmp $g.bak
			fi
		done
	done

	# Merge imported libraries into threads
	find js -name '*.js' | xargs -I% ../commands/websign/threadpack.js %

	if [ $test ] ; then
		../commands/websign/pack.py index.html pkg.html
	else
		../commands/websign/pack.py index.html $d.pkg
		cat websign/index.html | sed "s/\\\$PROJECT/$d/g" > index.html
		rm websign/index.html

		currentDir="$(pwd)"
		cd ..
		git clone git@github.com:cyph/cyph.github.io.git github.io
		cd github.io
		git reset --hard
		git clean -f
		git pull

		cp -f $currentDir/$d.pkg websign/

		HASH_TTL=3944620 # 1.5 months

		sha512hash="$(shasum -p -a 512 websign/$d.pkg | perl -pe 's/(.*) .*/\1/')"
		sha256hash="$(shasum -p -a 256 websign/$d.pkg | perl -pe 's/(.*) .*/\1/')"
		timestamp="$(date +%s)000"
		expires="$(($(date +%s)+${HASH_TTL}))000"
		websignhashes="$(cat $currentDir/websignhashes.json)"

		# Leaving old-style signing for continued compatibility with old WebSign instances
		echo "\
{
	\"hash\": \"$sha512hash\",
	\"timestamp\": $timestamp,
	\"expires\": $expires
}" | gpg --clearsign > websign/$d.hash
		cat websign/$d.hash | gpg --clearsign -u 'Alternate Key' > websign/$d.hash2
		cp -f websign/$d.hash2 websign/$d.hash

		$currentDir/../commands/websign/sign.js "{
			\"hash\": \"$sha256hash\",
			\"timestamp\": $timestamp,
			\"expires\": $expires,
			\"webSignHashes\": $websignhashes
		}" > websign/$d.sig
		echo $timestamp >> websign/$d.sig

		git add .
		git commit -a -m 'package update'
		git push
		cd $currentDir
	fi

	cd ..
done


find . -name '*.bak' | xargs rm

# Doesn't hurt, legally
if [ ! $test ] ; then
	find . -type d -name cryptolib | xargs rm -rf
fi


# AWS credentials
cat ~/.cyph/jobs.vars >> jobs/jobs.yaml

if [ $site ] ; then
	goapp deploy $site/*.yaml
else
	goapp deploy default/app.yaml jobs/jobs.yaml cyph.com/cyph-com.yaml cyph.im/cyph-im.yaml cyph.me/cyph-me.yaml
fi

appcfg.py update_dispatch .
appcfg.py -A cyphme update_cron .

if [ $all ] ; then
	../commands/deploy.sh
fi

cd "${dir}"
