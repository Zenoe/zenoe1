#!/usr/bin/bash

yarn build
if [ $? -eq 0 ]; then
    rsync -azv --exclude={'.git','node_modules','log','upload'}  dist/* root@10.110.198.52:/var/www/html/zenoe/
else
    echo 'build error'
fi
