#!/bin/bash
source properties.sh

#meteor build compiled
#scp -r compiled ${server}:compiled
#rm -rf compiled
scp  helper.sh ${server}:helper.sh
scp  properties.sh ${server}:properties.sh
ssh ${server} chmod +x helper.sh
ssh ${server} ./helper.sh