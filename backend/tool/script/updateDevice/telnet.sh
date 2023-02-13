#!/usr/bin/expect

# telnet 172.27.80.184 <<EOF
# upgrade download oob_ftp://1:1@172.27.66.42/VSWITCH_N8000R-DEBUG_RGOS12.8(3)_install.bin
# EOF

#!/usr/bin/expect
# ./myscript.expect name user password
#If it all goes pear shaped the script will timeout after 20 seconds.
# set timeout 20
# #First argument is assigned to the variable name
# set name [lindex $argv 0]
# #Second argument is assigned to the variable user
# set user [lindex $argv 1]
# #Third argument is assigned to the variable password
# set password [lindex $argv 2]
# #This spawns the telnet program and connects it to the variable name
# spawn telnet $name
# #The script expects login
# expect "login:"
# #The script sends the user variable
# send "$user "
# #The script expects Password
# expect "Password:"
# #The script sends the password variable
# send "$password "
# #This hands control of the keyboard over to you (Nice expect feature!)
# interact

set ftpIpaddr 10.104.30.88
set timeout -1
#First argument is assigned to the variable name
set name [lindex $argv 0]
#This spawns the telnet program and connects it to the variable name
spawn telnet $name
#This hands control of the keyboard over to you (Nice expect feature!)
send "upgrade download oob_ftp://1:1@$ftpIpaddr/VSWITCH_N8000R-DEBUG_RGOS12.8(3)_install.bin\r"
# send "\n"
expect "The terminal is unlocked by upgrade module"
# interact
