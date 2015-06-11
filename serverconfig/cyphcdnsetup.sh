#!/bin/bash

# CDN node setup script for Ubuntu 14.04

cert='LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tDQpNSUlIeVRDQ0JyR2dBd0lCQWdJUUNyeFVnd3gzNm5oc3lxS3lkUGJ2d0RBTkJna3Foa2lHOXcwQkFRc0ZBREIxDQpNUXN3Q1FZRFZRUUdFd0pWVXpFVk1CTUdBMVVFQ2hNTVJHbG5hVU5sY25RZ1NXNWpNUmt3RndZRFZRUUxFeEIzDQpkM2N1WkdsbmFXTmxjblF1WTI5dE1UUXdNZ1lEVlFRREV5dEVhV2RwUTJWeWRDQlRTRUV5SUVWNGRHVnVaR1ZrDQpJRlpoYkdsa1lYUnBiMjRnVTJWeWRtVnlJRU5CTUI0WERURTFNRFF3TnpBd01EQXdNRm9YRFRFMU1UQXlNREV5DQpNREF3TUZvd2dmUXhIVEFiQmdOVkJBOE1GRkJ5YVhaaGRHVWdUM0puWVc1cGVtRjBhVzl1TVJNd0VRWUxLd1lCDQpCQUdDTnp3Q0FRTVRBbFZUTVJrd0Z3WUxLd1lCQkFHQ056d0NBUUlUQ0VSbGJHRjNZWEpsTVJBd0RnWURWUVFGDQpFd2MxTmpBd01ETTVNU0l3SUFZRFZRUUpFeGt6TlRBd0lGTnZkWFJvSUVSMWNHOXVkQ0JJYVdkb2QyRjVNUTR3DQpEQVlEVlFRUkV3VXhPVGt3TVRFTE1Ba0dBMVVFQmhNQ1ZWTXhFVEFQQmdOVkJBZ1RDRVJsYkdGM1lYSmxNUTR3DQpEQVlEVlFRSEV3VkViM1psY2pFVE1CRUdBMVVFQ2hNS1EzbHdhQ3dnU1c1akxqRVlNQllHQTFVRUF4TVBibUV1DQpZMlJ1TG1ONWNHZ3VZMjl0TUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUF2YmdtDQo2UHBkT1dCUGs5dGJtMTFQTDhWbU5UZkZlL2JZZmtWRit4QlU5N3FyUnRObEVZelZhWFZDdnJuNEkwNGNjMGlVDQpHSTZGaWl2NnI4N3I5eFVrb2t3akpBYVZmYndoNnlDalpDQU14S3VXRW01QVF2LzhSY25ldng4dTBJV0hjdWtUDQpCeTNzUitjUldsMVhIM1UwcHA1TGx0N0xaTkpoZzlHTjZtQUZoQzYzZXRRVHJ4STFaUzhqZVVTclhKeTEvdHN2DQpFbmlXN01pR3lUMHFiWmR5OXJ2UUcyZjdMR3IxSitmbGcyQm40NzZwVkpQeWlIV1Q1d1BBZnFtY1lGL256cml2DQo5QkdNbU1FMXJCRHloWDh2dkFIVTJ0aUdBNFdZRWkvY2Nad1lwc3JrZ0hFNmQwZ2RkVFhydWlHcitiL2szNWxzDQpUMmpnVjdzeTJGYUxRMTJTNFFJREFRQUJvNElEMHpDQ0E4OHdId1lEVlIwakJCZ3dGb0FVUGROUXBkYWdyZTd6DQpTbUFLWmRNaDFQajQxZzh3SFFZRFZSME9CQllFRkFXdDB1Wkd2V3gwV2luM0VVdG9QcGU0YmlPcE1JR0lCZ05WDQpIUkVFZ1lBd2ZvSVBibUV1WTJSdUxtTjVjR2d1WTI5dGdnOWhaaTVqWkc0dVkzbHdhQzVqYjIyQ0QyRnpMbU5rDQpiaTVqZVhCb0xtTnZiWUlQWlhVdVkyUnVMbU41Y0dndVkyOXRnZzl2WXk1alpHNHVZM2x3YUM1amIyMkNEM05oDQpMbU5rYmk1amVYQm9MbU52YllJV1kzbHdhR1JpZVdocFpHUmxibUpvY3k1dmJtbHZiakFPQmdOVkhROEJBZjhFDQpCQU1DQmFBd0hRWURWUjBsQkJZd0ZBWUlLd1lCQlFVSEF3RUdDQ3NHQVFVRkJ3TUNNSFVHQTFVZEh3UnVNR3d3DQpOS0F5b0RDR0xtaDBkSEE2THk5amNtd3pMbVJwWjJsalpYSjBMbU52YlM5emFHRXlMV1YyTFhObGNuWmxjaTFuDQpNUzVqY213d05LQXlvRENHTG1oMGRIQTZMeTlqY213MExtUnBaMmxqWlhKMExtTnZiUzl6YUdFeUxXVjJMWE5sDQpjblpsY2kxbk1TNWpjbXd3UWdZRFZSMGdCRHN3T1RBM0JnbGdoa2dCaHYxc0FnRXdLakFvQmdnckJnRUZCUWNDDQpBUlljYUhSMGNITTZMeTkzZDNjdVpHbG5hV05sY25RdVkyOXRMME5RVXpDQmlBWUlLd1lCQlFVSEFRRUVmREI2DQpNQ1FHQ0NzR0FRVUZCekFCaGhob2RIUndPaTh2YjJOemNDNWthV2RwWTJWeWRDNWpiMjB3VWdZSUt3WUJCUVVIDQpNQUtHUm1oMGRIQTZMeTlqWVdObGNuUnpMbVJwWjJsalpYSjBMbU52YlM5RWFXZHBRMlZ5ZEZOSVFUSkZlSFJsDQpibVJsWkZaaGJHbGtZWFJwYjI1VFpYSjJaWEpEUVM1amNuUXdEQVlEVlIwVEFRSC9CQUl3QURDQ0FYMEdDaXNHDQpBUVFCMW5rQ0JBSUVnZ0Z0QklJQmFRRm5BSFlBcExrSmtMUVlXQlNIdXhPaXpHZHdDancxbUFUNUc5KzQ0M2ZODQpEc2dOM0JBQUFBRk1sU3IzdGdBQUJBTUFSekJGQWlFQXBwc2RuSTVvSUZIeWhiOERNb2pjQUpSaVNLeHhJd2ZqDQp5eUJ2dFBXN0RvOENJRk1IMXQ2bVNKcFlmK2ExMERYOFFiYXhIeFcvWXYvb0J6c1l4dm1BRFdZRkFIWUFhUGFZDQorQjlrZ3I0NmpPNjVLQjFNL0hGUlhXZVQxRVRSQ21lc3UwOVArOFFBQUFGTWxTcjNVUUFBQkFNQVJ6QkZBaUFYDQprQ2tBaGNIYjBtWUYwVis2Wjg1R2FialROWEhISXZKTGRaZDZ6MDhrWndJaEFJKzltUVpFdU5aMTROL2JBVDVjDQoxdmVhYlRhd0wxT1VUbDdUMWRNajFWYU9BSFVBVmhRR21pL1h3dXpUOWVHOVJMSSt4MFoydWJ5WkVWekE3NVNZDQpWZGFKME4wQUFBRk1sU3I0bVFBQUJBTUFSakJFQWlBdG9RajVxSWEvTlJ3b2g0TjR2S3I5bGZ3SnlzOXpoMWFkDQp3aGNYY0FmWXFRSWdVb1h3dlRSK1N2OFA5UytnUG0wSXYxVTAwRDFQdTZaOW9xaEZieVl3R2g0d0RRWUpLb1pJDQpodmNOQVFFTEJRQURnZ0VCQUhZRFNuKzU1aGZ2ZnQ4YzUrRGM4ZFlXM2FvUFBrRkdqSWo0N09haFMrNzdVQis3DQoxSW56VUtvSGljUEhUQTZWY25ScUxoSXJDWm1QbXI3U0o5RUpPekZvRUhkZ2RpYWx5NlQrRCtGa0pSaHlvY3J0DQpNeHRsS21wU3dEdzBjRTQxTGxqQkJDUU9CZ3VjeEdqZzRIM0xLcjJab3lMMnJyZGRQVVhFMjVBNVlubmNMbWg4DQorOFQvSUUxZG56MUpRUXNtd1kxTVdmRnM0bmh5WlV1Vmw1TFgwWmlyaWJIbFQ0clFUN3RGRTVVanNNZW92b3NKDQpXUnpxR20wMzVHMndKYlpFaDFrbWtZRWxNV0dpMlNiRVA0MmlWRVhuZ1dJVXVxZVZhYlk3ZDF4Zm92YldZUmhGDQpWeFhrSEpLbm1RQktsTGFhdlpUS0ZLV1g0TWJkR2Jtb3MrTFM0MjA9DQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tDQotLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS0NCk1JSUV0akNDQTU2Z0F3SUJBZ0lRREhtcFJMQ01FWlVna21GZjRtc2RnekFOQmdrcWhraUc5dzBCQVFzRkFEQnMNCk1Rc3dDUVlEVlFRR0V3SlZVekVWTUJNR0ExVUVDaE1NUkdsbmFVTmxjblFnU1c1ak1Sa3dGd1lEVlFRTEV4QjMNCmQzY3VaR2xuYVdObGNuUXVZMjl0TVNzd0tRWURWUVFERXlKRWFXZHBRMlZ5ZENCSWFXZG9JRUZ6YzNWeVlXNWoNClpTQkZWaUJTYjI5MElFTkJNQjRYRFRFek1UQXlNakV5TURBd01Gb1hEVEk0TVRBeU1qRXlNREF3TUZvd2RURUwNCk1Ba0dBMVVFQmhNQ1ZWTXhGVEFUQmdOVkJBb1RERVJwWjJsRFpYSjBJRWx1WXpFWk1CY0dBMVVFQ3hNUWQzZDMNCkxtUnBaMmxqWlhKMExtTnZiVEUwTURJR0ExVUVBeE1yUkdsbmFVTmxjblFnVTBoQk1pQkZlSFJsYm1SbFpDQlcNCllXeHBaR0YwYVc5dUlGTmxjblpsY2lCRFFUQ0NBU0l3RFFZSktvWklodmNOQVFFQkJRQURnZ0VQQURDQ0FRb0MNCmdnRUJBTmRUcEFSUitKbW1Ga2hMWnllcWswblFPZTBNc0xBQWgvRm5LSWFGakk1ajJyeXhRRGppMC9Yc3BRVVkNCnVEMCt4WmtYTXV3WWpQcnhES1prSVlYTEJ4QTBzRktJS3g5b205S3hqeEt3czlMbmlCOGY3emgzVkZOZmdIay8NCkxocXFxQjVMS3cycnQyTzVOYmQ5Rkx4WlM5OVJTdEtoNGd6aWtJS0hhcTdxMTJUV21GWG8vYThhVUd4VXZCSHkNCi9VcnluYnQvRHZUVnZvNFdpUkpWMk1CeE5PNzIzQzNzeEljbGhvM1lJZVN3VFF5SjNEa21GOTMyMTVTRjJBUWgNCmNKMXZiLzljdWhuaFJjdFdWeWgrSEExQlY2cTN1Q2U3c2VUNkt1OGhJM1VhclMyYmhqV01uSGUxYzYzWWxDM2sNCjh3eWQ3c0ZPWW40WHdIR2VMTjd4K1JBb0dUTUNBd0VBQWFPQ0FVa3dnZ0ZGTUJJR0ExVWRFd0VCL3dRSU1BWUINCkFmOENBUUF3RGdZRFZSMFBBUUgvQkFRREFnR0dNQjBHQTFVZEpRUVdNQlFHQ0NzR0FRVUZCd01CQmdnckJnRUYNCkJRY0RBakEwQmdnckJnRUZCUWNCQVFRb01DWXdKQVlJS3dZQkJRVUhNQUdHR0doMGRIQTZMeTl2WTNOd0xtUnANCloybGpaWEowTG1OdmJUQkxCZ05WSFI4RVJEQkNNRUNnUHFBOGhqcG9kSFJ3T2k4dlkzSnNOQzVrYVdkcFkyVnkNCmRDNWpiMjB2UkdsbmFVTmxjblJJYVdkb1FYTnpkWEpoYm1ObFJWWlNiMjkwUTBFdVkzSnNNRDBHQTFVZElBUTINCk1EUXdNZ1lFVlIwZ0FEQXFNQ2dHQ0NzR0FRVUZCd0lCRmh4b2RIUndjem92TDNkM2R5NWthV2RwWTJWeWRDNWoNCmIyMHZRMUJUTUIwR0ExVWREZ1FXQkJROTAxQ2wxcUN0N3ZOS1lBcGwweUhVK1BqV0R6QWZCZ05WSFNNRUdEQVcNCmdCU3hQc05wQS9pL1J3SFVtQ1lhQ0FMdlkyUXJ3ekFOQmdrcWhraUc5dzBCQVFzRkFBT0NBUUVBbmJiUWtJYmgNCmhnTHR4YUR3TkJ4MHdZMTJ6SVlLcVBCS2lrTFdQOGlwVGExOENLM210bEM0b2hwTmlBZXhLU0hjNTlyR1BDSGcNCjR4RkpjS3g2SFFHa3loRTZWNnQ5VnlwQWRQM1RIWVVZVU45WFIzV2hmVlVnTGtjM1VIS01mNEliMG1LUExRTmENCjJzUElvYzRzVXFJQVkrdHp1bkhJU1NjamwyU0ZuamdPcldOb1BMcFNnVmg1b3l3TTM5NXQ2ekh5dXFCOGJQRXMNCjFPRzlkNFEzQTg0eXRjaWFnUnBLa2s0N1JwcUYvb09pK1o2TW84d05Yck05endSNGp4UVVlektjeHdDbVhNUzENCm9WV05XbFpvcENKd3FqeUJjZG1kcUVVNzlPWDJvbEhkeDN0aTZHOE1kT3U0MnZpL2h3MTVVSkdRbXhnN2tWa24NCjhUVW9FNnNtZnRYM2VnPT0NCi0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0NCg=='
key='ASK RYAN FOR THIS'
conf='dXNlciB3d3ctZGF0YTsKd29ya2VyX3Byb2Nlc3NlcyBhdXRvOwpwaWQgL3J1bi9uZ2lueC5waWQ7CgpldmVudHMgewoJd29ya2VyX2Nvbm5lY3Rpb25zIDc2ODsKCW11bHRpX2FjY2VwdCBvZmY7Cn0KCmh0dHAgewoKCSMjCgkjIEJhc2ljIFNldHRpbmdzCgkjIwoKCXNlbmRmaWxlIG9uOwoJdGNwX25vcHVzaCBvbjsKCXRjcF9ub2RlbGF5IG9uOwoJa2VlcGFsaXZlX3RpbWVvdXQgNjU7Cgl0eXBlc19oYXNoX21heF9zaXplIDIwNDg7CglzZXJ2ZXJfdG9rZW5zIG9mZjsKCXNlcnZlcl9uYW1lc19oYXNoX2J1Y2tldF9zaXplIDY0OwoJaW5jbHVkZSAvZXRjL25naW54L21pbWUudHlwZXM7CglkZWZhdWx0X3R5cGUgYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtOwoKCSMjCgkjIExvZ2dpbmcgU2V0dGluZ3MKCSMjCgoJYWNjZXNzX2xvZyBvZmY7CgllcnJvcl9sb2cgL2Rldi9udWxsIGNyaXQ7CgoJIyMKCSMgR3ppcCBTZXR0aW5ncwoJIyMKCglnemlwIG9uOwoJZ3ppcF9odHRwX3ZlcnNpb24gMS4wOwoJZ3ppcF9zdGF0aWMgYWx3YXlzOwoKCXNlcnZlciB7CgkJbGlzdGVuIDQ0MyBzc2w7CgkJbGlzdGVuIFs6Ol06NDQzIGlwdjZvbmx5PW9uOwoKCQlzc2xfY2VydGlmaWNhdGUgc3NsL2NlcnQucGVtOwoJCXNzbF9jZXJ0aWZpY2F0ZV9rZXkgc3NsL2tleS5wZW07CgoJCXJvb3QgL2N5cGhjZG47CgkJaW5kZXggaW5kZXguaHRtbDsKCgkJc3NsX2NlcnRpZmljYXRlIHNzbC9jZXJ0LnBlbTsKCQlzc2xfY2VydGlmaWNhdGVfa2V5IHNzbC9rZXkucGVtOwoJCXNzbF9kaHBhcmFtIHNzbC9kaHBhcmFtcy5wZW07CgoJCXNzbF9zZXNzaW9uX3RpbWVvdXQgMWQ7CgkJc3NsX3Nlc3Npb25fY2FjaGUgc2hhcmVkOlNTTDo1MG07CgoJCXNzbF9wcm90b2NvbHMgVExTdjEgVExTdjEuMSBUTFN2MS4yOwoJCXNzbF9jaXBoZXJzICdFQ0RIRS1SU0EtQUVTMTI4LUdDTS1TSEEyNTY6RUNESEUtRUNEU0EtQUVTMTI4LUdDTS1TSEEyNTY6RUNESEUtUlNBLUFFUzI1Ni1HQ00tU0hBMzg0OkVDREhFLUVDRFNBLUFFUzI1Ni1HQ00tU0hBMzg0OkRIRS1SU0EtQUVTMTI4LUdDTS1TSEEyNTY6REhFLURTUy1BRVMxMjgtR0NNLVNIQTI1NjprRURIK0FFU0dDTTpFQ0RIRS1SU0EtQUVTMTI4LVNIQTI1NjpFQ0RIRS1FQ0RTQS1BRVMxMjgtU0hBMjU2OkVDREhFLVJTQS1BRVMxMjgtU0hBOkVDREhFLUVDRFNBLUFFUzEyOC1TSEE6RUNESEUtUlNBLUFFUzI1Ni1TSEEzODQ6RUNESEUtRUNEU0EtQUVTMjU2LVNIQTM4NDpFQ0RIRS1SU0EtQUVTMjU2LVNIQTpFQ0RIRS1FQ0RTQS1BRVMyNTYtU0hBOkRIRS1SU0EtQUVTMTI4LVNIQTI1NjpESEUtUlNBLUFFUzEyOC1TSEE6REhFLURTUy1BRVMxMjgtU0hBMjU2OkRIRS1SU0EtQUVTMjU2LVNIQTI1NjpESEUtRFNTLUFFUzI1Ni1TSEE6REhFLVJTQS1BRVMyNTYtU0hBOiFhTlVMTDohZU5VTEw6IUVYUE9SVDohREVTOiFSQzQ6ITNERVM6IU1ENTohUFNLJzsKCQlzc2xfcHJlZmVyX3NlcnZlcl9jaXBoZXJzIG9uOwoKCQlhZGRfaGVhZGVyIFN0cmljdC1UcmFuc3BvcnQtU2VjdXJpdHkgJ21heC1hZ2U9MzE1MzYwMDA7IGluY2x1ZGVTdWJkb21haW5zJzsKCgkJc3NsX3N0YXBsaW5nIG9uOwoJCXNzbF9zdGFwbGluZ192ZXJpZnkgb247CgoJCSMgVGhpcyBpcyBmb3IgQ3lwaCwgbm90IFNTTAoJCWFkZF9oZWFkZXIgQ2FjaGUtQ29udHJvbCAncHVibGljLCBtYXgtYWdlPTMxNTM2MDAwJzsKCQlhZGRfaGVhZGVyIEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiAnKic7CgkJYWRkX2hlYWRlciBBY2Nlc3MtQ29udHJvbC1BbGxvdy1NZXRob2RzICdHRVQnOwoJfQp9Cg=='
script='IyEvYmluL2Jhc2gKCm1rZGlyIC9jeXBoY2RuLm5ldwpjZCAvY3lwaGNkbi5uZXcKCndnZXQgaHR0cHM6Ly9naXRodWIuY29tL2N5cGgvY3lwaC5naXRodWIuaW8vYXJjaGl2ZS9tYXN0ZXIuemlwIC1PIGRvdGhlbW92ZS56aXAKdW56aXAgZG90aGVtb3ZlLnppcApybSBkb3RoZW1vdmUuemlwCnJlcG89IiQobHMpIgptdiAqLyogLi8KaWYgWyAkcmVwbyA9PSAxIF0gOyB0aGVuIHJtIC1yZiAkcmVwbyA7IGZpICMgSW4gY2FzZSBHaXRIdWIgZ2V0cyByaWQgb2YgaW5uZXIgZGlyZWN0b3J5Cmd6aXAgLTlyIC4KY2htb2QgNzc3IC1SIC4KCmNkIC8KCmlmIFsgLWQgL2N5cGhjZG4ubmV3L3dlYnNpZ24gXSA7IHRoZW4KCXJtIC1yZiAvY3lwaGNkbi5vbGQKCW12IC9jeXBoY2RuIC9jeXBoY2RuLm9sZAoJbXYgL2N5cGhjZG4ubmV3IC9jeXBoY2RuCmVsc2UKCXJtIC1yZiAvY3lwaGNkbi5uZXcKZmkKCgppZiBbICQocHMgYXV4IHwgZ3JlcCBuZ2lueCB8IGdyZXAgLXYgZ3JlcCB8IHdjIC1sKSAtbHQgMSBdIDsgdGhlbgoJc2VydmljZSBuZ2lueCBzdG9wCglzZXJ2aWNlIG5naW54IHN0YXJ0CmZpCg=='
update='IyEvYmluL2Jhc2gKCmV4cG9ydCBERUJJQU5fRlJPTlRFTkQ9bm9uaW50ZXJhY3RpdmUKZWNobyAiKioqKioqKioqKioqKioiID4+IC92YXIvbG9nL2FwdC1zZWN1cml0eS11cGRhdGVzCmRhdGUgPj4gL3Zhci9sb2cvYXB0LXNlY3VyaXR5LXVwZGF0ZXMKYXB0aXR1ZGUgdXBkYXRlID4+IC92YXIvbG9nL2FwdC1zZWN1cml0eS11cGRhdGVzCmFwdGl0dWRlIHNhZmUtdXBncmFkZSAtbyBBcHRpdHVkZTo6RGVsZXRlLVVudXNlZD1mYWxzZSAtLWFzc3VtZS15ZXMgLS10YXJnZXQtcmVsZWFzZSBgbHNiX3JlbGVhc2UgLWNzYC1zZWN1cml0eSA+PiAvdmFyL2xvZy9hcHQtc2VjdXJpdHktdXBkYXRlcwpyZWJvb3QKCg=='


dir="$(pwd)"
cd $(cd "$(dirname "$0")"; pwd) # $(dirname `readlink -f "${0}" || realpath "${0}"`)

sed -i 's/# deb /deb /g' /etc/apt/sources.list
sed -i 's/\/\/.*archive.ubuntu.com/\/\/archive.ubuntu.com/g' /etc/apt/sources.list

export DEBIAN_FRONTEND=noninteractive
apt-add-repository -y ppa:nginx/development
apt-get -y --force-yes update
apt-get -y --force-yes upgrade
apt-get -y --force-yes install aptitude nginx openssl unzip

mkdir /etc/nginx/ssl
chmod 600 /etc/nginx/ssl
echo "${cert}" | base64 --decode > /etc/nginx/ssl/cert.pem
echo "${key}" | base64 --decode > /etc/nginx/ssl/key.pem
openssl dhparam -out /etc/nginx/ssl/dhparams.pem 2048

echo "${conf}" | base64 --decode | sed "s/worker_connections 768;/worker_connections $(ulimit -n);/g" > /etc/nginx/nginx.conf

rm -rf /cyphcdn
echo "${script}" | base64 --decode > /cyphcdn.sh
echo "${update}" | base64 --decode > /update.sh
chmod 700 /cyphcdn.sh
chmod 700 /update.sh
/cyphcdn.sh

updatehour=$RANDOM
let 'updatehour %= 24'
updateday=$RANDOM
let 'updateday %= 7'

crontab -l > /cyphcdn.cron
echo '0,30 * * * * /cyphcdn.sh' >> /cyphcdn.cron
echo "45 ${updatehour} * * ${updateday} /update.sh" >> /cyphcdn.cron
crontab /cyphcdn.cron
rm /cyphcdn.cron

rm cyphcdnsetup.sh
reboot
