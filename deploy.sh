#!/usr/bin/bash

rsync -azv --exclude={'.git','node_modules','log','upload'}  ../zenoe1 root@10.110.198.52:/home/
cd front
./deploy.sh

ssh root@10.110.198.52 'systemctl restart nginx'
