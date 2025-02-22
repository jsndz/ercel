to test locally

sudo vi /etc/hosts

add:
127.0.0.1 test.ercel.com

sudo systemctl restart networking

http://test.ercel.com:3000/
