var PUBLIC_KEYS	= [
	/* Ryan Lester */
	[171,158,152,155,236,240,244,58,137,127,124,197,144,148,23,9,182,155,38,234,162,220,154,16,69,114,125,253,84,165,6,68],
	[164,232,65,97,199,34,201,22,213,144,18,73,214,238,66,221,173,27,177,81,186,136,197,47,172,173,192,237,4,78,122,109],
	[201,157,3,232,71,18,158,210,161,103,37,130,174,255,36,20,219,38,241,91,15,50,9,250,150,197,253,68,212,158,198,61],
	[81,95,213,235,44,166,216,12,209,50,109,250,129,18,148,28,233,2,93,56,48,131,2,133,221,184,216,121,70,133,207,226],

	/* Baron Joshua Cyrus Boehm */
	[54,68,189,86,179,118,181,79,126,180,23,61,106,33,27,216,187,15,41,133,165,136,78,82,76,178,131,105,130,29,16,248],
	[254,116,107,13,205,177,182,66,218,246,80,212,224,93,232,117,103,215,20,107,15,0,180,126,7,54,230,237,228,172,240,216],
	[138,80,104,72,225,56,44,148,43,74,181,180,189,47,101,252,207,103,147,116,124,245,247,243,63,131,175,121,111,50,33,254],
	[87,217,62,125,158,235,200,67,46,139,127,213,99,232,175,181,251,167,251,35,174,138,169,218,142,31,132,35,100,40,172,87],

	/* Backup keys */
	[80,34,63,80,99,53,236,55,146,236,96,243,191,119,124,138,181,216,166,179,145,116,110,137,12,164,230,136,66,128,207,161],
	[254,32,42,185,90,12,19,73,226,244,226,248,151,197,28,50,14,212,17,211,14,62,55,22,189,234,110,43,151,140,41,102],
	[152,237,236,22,148,215,224,134,111,147,182,143,22,253,152,209,90,25,246,127,10,117,116,210,238,116,227,8,226,22,43,145],
	[65,146,44,216,222,131,27,43,63,236,95,112,40,70,78,216,49,219,42,137,189,125,57,112,97,227,4,86,140,204,185,21],
	[117,208,191,26,184,56,234,65,54,152,164,55,79,49,83,48,55,156,89,11,219,14,165,55,118,156,217,193,233,148,222,191],
	[225,189,174,212,25,207,148,53,79,212,145,78,165,107,215,43,239,159,59,36,163,188,209,255,155,59,98,222,102,15,30,29],
	[117,78,212,174,100,243,159,38,76,206,214,203,246,170,227,218,199,211,74,0,22,253,185,75,79,50,191,69,167,136,252,147],
	[219,7,103,156,28,7,27,8,32,222,44,12,45,124,69,189,140,76,95,34,15,33,94,194,234,82,227,135,206,208,25,184],
	[132,7,58,170,120,225,255,121,145,232,129,44,56,101,2,52,201,162,122,22,216,147,76,94,52,170,214,107,231,107,206,123],
	[230,207,218,31,1,238,236,105,184,177,78,64,139,90,40,25,13,198,125,28,26,45,152,24,133,70,143,205,142,8,29,230],
	[166,147,223,59,22,130,26,21,57,236,111,73,209,213,73,56,78,35,88,145,182,151,142,136,191,243,67,134,229,240,184,170],
	[46,226,233,110,172,181,229,24,12,168,55,238,89,225,167,69,149,10,193,229,14,76,206,121,159,184,126,200,204,212,212,83],
	[99,235,31,197,190,86,127,120,116,79,221,96,197,64,244,62,35,97,41,96,75,90,3,74,242,233,182,157,112,3,129,182],
	[197,238,61,142,106,1,151,102,28,175,182,146,24,112,245,196,19,197,32,196,88,24,143,174,90,91,178,91,214,89,79,137],
	[137,75,186,156,28,163,103,194,58,38,41,215,204,246,31,177,205,61,236,249,132,150,131,74,127,199,36,122,225,213,208,207],
	[4,161,36,128,16,32,198,43,140,83,95,229,19,150,96,116,160,117,152,223,242,7,183,204,57,242,2,235,194,116,134,172],
	[139,9,238,173,8,191,76,26,103,201,151,21,157,140,248,56,200,24,166,139,127,201,194,161,53,94,107,97,27,186,192,87],
	[93,79,75,144,111,213,66,190,240,62,24,0,200,196,209,12,74,253,0,110,254,38,42,190,121,39,26,231,145,130,194,180],
	[23,191,46,120,247,141,142,231,211,97,185,204,203,137,41,254,91,171,161,192,255,141,238,138,235,212,56,223,225,152,74,38],
	[98,208,182,99,203,84,14,158,38,156,228,96,82,215,185,237,237,134,73,39,64,125,75,176,108,8,121,242,201,96,195,130],
	[187,213,252,19,164,162,98,233,253,157,208,254,23,41,132,184,179,144,180,221,162,64,227,110,78,51,55,199,206,172,222,249],
	[95,77,232,71,6,211,54,192,99,83,150,80,120,156,231,65,18,126,90,233,225,228,252,15,122,249,176,157,151,115,240,205],
	[44,40,38,10,229,112,20,122,110,246,47,124,224,30,120,31,226,222,76,217,221,156,180,216,11,20,146,105,117,228,101,190],
	[92,168,19,74,178,53,178,169,172,219,105,235,127,10,215,112,54,197,119,171,186,11,35,94,67,200,34,187,146,69,177,32],
	[248,57,131,113,226,31,54,70,68,42,254,13,185,149,152,234,190,143,210,129,229,53,14,10,141,140,184,11,10,206,229,243],
	[223,208,224,30,23,119,49,254,20,99,5,206,27,31,85,75,184,210,49,51,131,15,251,196,129,91,40,100,177,174,179,179],
	[247,49,106,70,14,52,6,99,20,164,193,209,248,152,23,205,148,106,37,250,9,231,252,67,238,255,7,116,112,225,60,226],
	[4,159,196,111,155,30,15,30,120,179,53,6,8,160,25,96,219,117,58,53,39,138,120,35,164,157,177,204,30,42,24,125],
	[154,162,24,176,197,82,175,28,187,165,233,124,136,122,27,209,63,146,88,155,111,83,84,135,255,237,214,157,196,22,104,130],
	[88,211,16,67,220,139,233,172,134,236,7,216,58,124,53,99,75,52,110,76,191,238,133,187,109,86,149,234,50,139,80,82],
	[228,151,77,42,18,238,174,173,61,155,201,116,156,183,157,19,211,172,80,134,145,118,242,114,245,196,97,160,111,100,136,134],
	[63,225,24,60,91,62,116,119,47,190,252,46,72,208,98,161,82,51,155,154,243,85,134,215,66,242,53,244,2,20,159,164],
	[59,253,182,19,64,125,201,149,228,169,63,121,148,18,159,253,118,141,187,202,31,184,72,176,64,24,33,194,183,125,249,229],
	[27,184,248,116,248,254,98,24,171,24,31,46,9,90,113,96,236,239,170,225,82,220,38,119,138,98,242,69,226,227,99,129],
	[133,167,65,162,84,108,161,45,45,77,242,246,61,5,113,117,212,224,252,62,226,72,121,161,8,8,227,37,74,23,132,81],
	[122,193,7,155,101,136,140,115,16,144,219,242,162,79,47,130,8,5,59,212,7,249,155,131,148,235,43,100,172,38,235,88],
	[104,183,120,18,211,77,89,86,163,88,212,67,52,185,95,47,111,248,62,95,18,220,135,158,216,59,165,32,50,153,209,237],
	[244,183,175,2,114,23,130,54,155,12,111,216,161,76,0,20,87,120,78,89,87,220,206,126,130,7,253,234,94,240,101,210],
	[103,28,160,2,93,87,131,179,164,33,218,189,138,43,87,179,251,179,12,124,148,71,104,6,61,219,80,2,81,176,110,231],
	[161,175,113,71,73,81,111,111,44,250,25,241,227,48,172,56,79,102,108,143,250,197,82,206,189,238,32,215,171,247,24,103],
	[23,110,247,171,140,143,192,99,139,147,151,16,12,183,217,200,90,37,4,79,197,249,117,248,120,149,251,81,253,127,219,83],
	[99,216,40,198,244,89,141,244,78,202,109,37,14,30,237,238,147,60,15,250,238,123,129,27,31,139,101,183,118,74,118,47],
	[109,202,85,201,180,177,205,245,123,41,182,147,137,205,183,23,252,231,246,143,42,132,253,23,224,177,41,5,13,136,185,176],
	[119,95,58,239,142,100,110,209,59,139,0,73,127,3,76,80,205,87,118,38,151,106,185,88,173,5,12,39,181,73,205,220],
	[15,30,166,174,44,245,125,54,24,158,224,219,153,157,188,74,0,52,153,26,52,151,115,57,174,104,238,62,126,18,93,224],
	[65,194,246,98,129,143,46,198,17,135,22,187,32,183,17,61,253,18,43,126,208,21,180,87,138,0,209,147,42,165,187,161],
	[53,8,115,27,3,140,194,157,138,2,20,238,254,125,110,27,23,214,64,131,183,84,209,128,143,238,81,230,155,77,127,225],
	[191,233,51,87,113,0,171,249,24,2,223,203,178,174,218,120,181,254,245,46,100,83,91,32,16,11,133,41,5,196,149,63],
	[205,89,124,69,103,248,85,187,214,44,73,235,127,253,250,191,190,36,93,97,91,86,97,125,217,215,216,245,155,18,178,90],
	[157,153,90,138,78,166,229,72,26,23,228,151,180,101,234,140,5,101,196,69,186,8,221,166,202,203,136,70,44,80,20,32],
	[121,253,244,122,202,96,105,232,33,69,3,188,123,103,228,215,114,230,193,94,7,120,23,96,177,134,248,159,162,103,33,192],
	[165,20,111,72,27,138,48,211,205,182,140,237,211,64,31,136,165,155,175,16,163,204,245,245,44,252,128,31,242,149,239,172],
	[252,202,194,18,90,197,126,134,202,111,191,36,139,102,174,63,42,138,225,13,243,123,53,208,196,108,24,88,122,185,84,97],
	[157,31,126,172,58,6,107,24,183,186,14,165,216,185,182,205,179,33,122,204,131,67,181,74,238,232,231,125,33,66,248,114],
	[29,133,180,184,248,170,116,199,19,8,145,92,199,116,36,72,4,81,78,59,68,171,215,5,191,165,104,17,208,81,109,241],
	[157,49,52,165,189,100,5,187,230,31,249,239,104,136,170,241,133,43,46,203,170,160,253,151,66,59,187,84,254,233,86,49],
	[84,42,156,194,130,38,14,91,119,15,191,54,78,151,242,42,229,65,173,24,227,141,173,133,76,55,69,26,84,134,92,31],
	[190,146,184,18,252,27,27,8,201,220,202,118,230,218,105,218,188,120,56,109,32,36,243,22,243,119,54,5,161,121,172,153],
	[151,250,25,102,215,146,62,241,93,213,49,156,24,129,211,80,16,27,40,10,246,206,213,149,80,173,208,179,158,176,40,90],
	[211,79,23,61,59,76,175,37,36,42,200,177,8,79,189,104,127,36,62,107,249,131,54,137,222,226,16,137,78,121,73,98],
	[255,103,211,142,50,72,151,48,244,210,147,11,12,61,212,114,73,251,78,85,200,237,8,184,207,148,132,80,213,246,112,25],
	[130,134,188,139,234,212,223,225,249,130,28,234,111,83,82,29,11,233,165,102,244,107,146,210,37,193,127,53,35,47,229,143],
	[77,226,232,54,115,250,197,160,107,32,229,55,171,255,130,158,192,89,108,168,18,117,44,125,166,243,162,121,109,168,91,12],
	[105,41,202,203,168,245,119,107,177,253,98,47,58,130,223,82,120,36,37,71,187,100,165,96,20,240,250,241,53,194,30,145],
	[254,154,251,175,66,119,125,33,68,184,144,147,251,77,99,43,224,212,177,116,245,73,124,125,58,151,206,15,71,139,12,0],
	[17,12,21,155,248,50,139,235,110,243,224,209,172,50,198,155,219,189,18,205,85,88,51,217,88,207,234,120,161,113,134,182],
	[216,230,165,198,173,154,201,25,7,155,189,15,175,163,122,58,160,248,41,222,182,4,200,44,182,178,134,186,26,242,233,211],
	[160,80,227,173,197,24,61,198,69,176,103,116,172,14,233,21,184,241,12,109,184,207,23,178,214,217,10,28,71,82,206,52],
	[179,163,165,152,64,227,229,222,171,217,166,253,142,133,254,34,47,71,112,46,219,122,65,74,54,196,150,190,103,152,3,63],
	[1,113,106,68,202,198,37,185,252,209,88,148,147,96,44,192,43,80,177,30,231,14,134,187,184,88,206,141,216,163,209,79],
	[127,114,102,249,195,196,7,210,249,61,224,47,123,60,242,52,97,59,105,221,115,125,19,232,174,254,133,69,106,82,6,150],
	[29,2,71,173,180,168,49,131,196,3,84,72,254,214,158,58,181,12,107,111,75,232,6,167,173,234,3,22,204,232,145,43],
	[182,166,111,166,150,201,14,106,16,100,203,200,61,182,78,146,231,99,61,227,63,100,110,194,242,58,255,102,113,31,177,22],
	[190,35,73,195,161,67,26,114,242,189,46,122,164,102,197,227,127,13,172,255,173,77,4,47,180,93,210,222,167,184,178,195],
	[5,177,190,239,164,69,165,204,22,109,47,90,7,131,73,87,73,170,228,85,73,105,22,86,125,104,238,169,77,248,82,168],
	[118,25,120,251,15,69,67,148,186,200,175,218,29,178,141,215,135,62,31,39,232,226,58,14,117,180,126,228,217,219,87,176],
	[233,167,151,66,123,192,104,7,176,199,211,26,214,241,127,12,135,28,160,66,208,195,255,57,91,239,85,112,33,51,206,171],
	[32,21,5,9,84,86,108,59,122,140,69,41,213,55,61,145,121,221,202,203,126,124,159,138,251,217,248,189,4,52,134,5],
	[53,161,15,162,144,118,33,22,213,11,40,238,148,154,20,111,200,70,1,240,27,86,20,79,141,17,95,105,117,201,239,61],
	[181,70,92,135,59,144,222,100,126,49,156,116,88,168,174,243,171,7,45,173,148,118,234,230,179,59,121,197,121,241,202,32],
	[196,65,206,206,100,33,162,245,39,116,121,249,44,254,142,252,53,72,107,133,134,111,75,142,45,13,253,139,217,180,229,113],
	[112,118,71,56,179,29,45,246,210,61,191,218,2,188,179,18,10,128,105,133,40,51,47,92,103,98,89,255,13,107,201,191],
	[181,111,237,12,244,168,245,51,23,21,42,125,168,235,124,57,180,227,114,151,42,159,242,54,25,241,88,169,202,254,130,40],
	[210,113,209,224,170,88,132,153,18,246,64,230,197,101,226,3,11,193,141,129,19,32,253,101,206,30,128,176,230,158,196,119],
	[116,30,75,176,217,220,146,150,174,128,202,139,112,69,65,138,11,201,72,39,64,190,78,69,85,255,226,102,160,75,114,134],
	[147,197,108,166,158,235,91,195,161,67,178,159,127,86,15,166,18,174,105,245,65,101,177,141,15,149,48,120,145,233,188,47],
	[2,165,42,184,145,251,63,12,155,2,243,93,166,4,9,100,137,169,225,236,60,58,147,35,14,132,164,16,0,119,161,7],
	[18,216,110,230,233,198,205,100,22,241,176,12,96,224,208,53,18,156,13,147,173,164,78,98,172,96,167,163,148,53,147,128],
	[51,250,150,89,71,194,42,231,181,230,196,33,144,182,87,42,236,64,227,15,186,121,226,83,200,230,108,94,158,100,27,137],
	[26,176,1,247,170,203,112,42,255,218,105,104,93,197,156,131,83,29,173,218,154,255,166,95,232,15,221,49,214,202,31,146],
	[17,85,78,230,50,22,196,38,145,39,240,169,13,150,31,62,240,131,106,148,157,89,228,252,40,109,167,31,22,239,72,210],
	[226,253,182,15,110,207,46,233,216,62,20,90,6,211,177,73,137,166,156,15,217,217,129,255,115,163,102,20,165,236,180,2],
	[58,11,45,209,226,64,242,122,79,57,168,132,90,73,5,90,158,15,32,107,222,233,72,32,165,180,125,99,31,228,56,129],
	[206,181,156,135,45,219,195,220,247,101,0,154,145,135,129,205,218,84,34,22,39,234,75,186,6,58,223,136,202,215,31,216],
	[163,74,216,176,227,189,63,42,230,154,0,31,148,33,156,62,104,88,65,32,242,113,58,56,140,124,91,36,232,130,155,205],
	[186,154,174,44,197,72,178,203,70,61,128,178,143,39,227,92,17,171,172,32,142,159,188,226,167,129,125,131,146,109,219,135],
	[158,144,40,58,160,98,204,79,229,77,241,76,243,129,255,185,235,124,207,116,42,47,46,13,87,215,233,220,105,117,185,255],
	[67,211,217,111,30,0,232,152,102,151,104,17,127,129,197,138,236,26,120,36,8,41,122,32,61,168,103,110,102,119,145,170],
	[186,245,237,169,160,49,175,218,211,191,44,1,175,58,16,165,225,32,17,84,174,157,243,88,191,239,84,22,95,77,37,188],
	[69,176,99,15,187,230,158,106,26,127,71,111,242,201,53,39,239,129,90,115,246,146,78,110,206,40,93,27,48,182,173,177]
];