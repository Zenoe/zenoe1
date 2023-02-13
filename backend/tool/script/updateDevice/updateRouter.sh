#!/usr/bin/env bash
if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
fi

echo "begin Time: $(date +"%T")"
TIME1=`date +%s`
echo "update $1"
echo "before expect"
expect ./telnet.sh $1
echo "after expect"
TIME2=`date +%s`
DIFF=$(($TIME2-$TIME1))
echo "$DIFF" | awk '{printf "%d:%02d\n",$1/60,$1%60}'
