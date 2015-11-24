#!/bin/bash
source properties.sh

scp setup-server.sh ${server}:setup-server.sh
ssh ${server} ./setup-server.sh
./deploy.sh