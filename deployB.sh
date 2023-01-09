#!/usr/bin/bash

rsync -azv --exclude={'.git','node_modules','log','upload','front/dist'}  ../zenoe1 root@10.110.198.52:/home/
