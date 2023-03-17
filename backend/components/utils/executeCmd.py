
import sys
import telnetlib
import threading
import time

# Define function to execute telnet command
def execute_telnet_command(tn, command):
    # tn = telnetlib.Telnet(server)
    tn.read_until(b"#", 10)
    current_time = time.time()
    print('begin to execute at time: %.3f' % (current_time))
    tn.write(command.encode('ascii') + b"\n")

    tn.write(b"end\n")
    tn.write(b"exit\n")
    output = tn.read_all()
    # print (output)
    print(output.decode('ascii'))

def telnet_conn(server, lstCommand):
    tn = telnetlib.Telnet(server)
    for command in lstCommand:
        print('write command: %s' % (command))
        tn.read_until(b"#",timeout=10)
        tn.write(command.encode('ascii') + b"\n")


    # test
    # tn.write(b"end\n")
    # tn.write(b"exit\n")
    # output = tn.read_all()
    # print(output.decode('ascii'))
    # sys.stdout.flush()
    return tn

def execute_telnet_command_test(server):
    tn = telnetlib.Telnet(server)
    tn.read_until(b"#")
    tn.write(b"run-system-shell\n")

    # tn.write(b"configure terminal\n")
    # tn.write(b"show version devices\n")
    # tn.write(b'show arp\n')
    # tn.write(b"end\n")
    tn.write(b"exit\n")
    tn.write(b"exit\n")
    output = tn.read_all()
    print(output.decode('ascii'))
    return

def main():

    lstArugment = sys.argv[1].split(',')
    server1 = lstArugment[0]
    server2 = lstArugment[1]
    lstCommand = lstArugment[2:]
    if len(lstCommand) == 0:
        print('no command found')
        sys.stdout.flush()
        return

    # print(lstArugment)
    # sys.stdout.flush()
    # return
    print(lstArugment)
    print(lstCommand)

    # command='ls'
    # server1 = '172.27.80.102'
    # server2 = '172.27.80.149'

    lstPriorCommand=[]
    if(len(lstCommand) >=2):
        lstPriorCommand = lstCommand[:-1]


    # print('lstPriorCommand')
    # print(lstCommand)
    # print(lstPriorCommand)
    # sys.stdout.flush()
    # return
    tn1 = telnet_conn(server1, lstPriorCommand)
    tn2 = telnet_conn(server2, lstPriorCommand)

    # return

    # print('b4 thread')
    # sys.stdout.flush()
    # return
    # Create two threads to execute telnet commands
    thread1 = threading.Thread(target=execute_telnet_command, args=(tn1, lstCommand[-1]))
    thread2 = threading.Thread(target=execute_telnet_command, args=(tn2, lstCommand[-1]))

    # Start both threads
    thread1.start()
    thread2.start()

    # Wait for both threads to complete
    thread1.join()
    thread2.join()

    # print('exit executeCmd.py')
    sys.stdout.flush()
if __name__ == "__main__":
    main()
