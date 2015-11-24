server=root@46.101.201.6

meteor build compiled
scp -r compiled ${server}:compiled
rm -rf compiled
scp  helper.sh ${server}:helper.sh
ssh ${server} sh helper.sh