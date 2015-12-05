#!/bin/bash
source properties.sh

meteor build compiled
scp -r compiled ${server}:compiled
rm -rf compiled
scp  helper.sh ${server}:helper.sh
scp  properties.sh ${server}:properties.sh
ssh ${server} chmod +x helper.sh
ssh ${server} ./helper.sh

#backups
scp  backup2.sh ${server}:backup2.sh
scp  backup2.sh ${server}:backup2.sh
ssh ${server} chmod +x backup2.sh
scp  backup-cronjob.txt ${server}:backup-cronjob.txt
ssh ${server} crontab -r
ssh ${server} crontab backup-cronjob.txt
