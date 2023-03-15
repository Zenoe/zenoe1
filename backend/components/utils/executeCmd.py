
import sys
import telnetlib
import threading
import time

# Define function to execute telnet command
def execute_telnet_command(server, command):
    tn = telnetlib.Telnet(server)
    tn.read_until(b"#")
    current_time = time.time()
    print('sending %s at time: %.3f' % (command, current_time))
    tn.write(command.encode('ascii') + b"\n")
    tn.write(b"exit\n")
    output = tn.read_all()
    # print (output)
    print(output.decode('ascii'))


def main():
    lstArugment = sys.argv[1].split(',')
    # Define server and commands to execute

    lstServer = lstArugment[:-1]
    command = lstArugment[-1]

    print(lstServer)
    print(cmd)

    server1 = lstServer[0]
    server2 = lstServer[1]

    # Create two threads to execute telnet commands
    thread1 = threading.Thread(target=execute_telnet_command, args=(server1, command))
    thread2 = threading.Thread(target=execute_telnet_command, args=(server2, command))

    # Start both threads
    thread1.start()
    thread2.start()

    # Wait for both threads to complete
    thread1.join()
    thread2.join()

    print('exit executeCmd.py')
    sys.stdout.flush()
if __name__ == "__main__":
    main()
