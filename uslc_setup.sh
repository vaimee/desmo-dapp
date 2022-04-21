cd ./example-tds
echo "Start WAT"
start npm start
echo "Wait 2s"
sleep 2
echo "START Directories"
cd ../linksmart-directory
./buildAndRunMultiple.sh
./setupMultiple.sh 
echo "Ready for usecase test, now you can run uslc_run.sh!"

