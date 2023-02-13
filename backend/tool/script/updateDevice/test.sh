#!/usr/bin/env bash

# echo "begin Time: $(date +"%T")"
TIME1=`date +%s`
echo "update for $1"
echo "update for $1"
sleep 10
echo "update for $1"
echo "update for $1"
echo "update for $1"
echo "update for $1"
echo "update for $1"
# expect ./telnet.sh $1
TIME2=`date +%s`
DIFF=$(($TIME2-$TIME1))
echo "$DIFF" | awk '{printf "%d:%02d\n",$1/60,$1%60}'

echo "last update for $1"
