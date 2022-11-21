rm *.csv
node extractSection.test.js
iconv -c rfc2205.csv -t gbk > rfc2205_gbk.csv
