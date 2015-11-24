# attention, the parameters in deploy.sh and helper.sh need to be adjusted first
# setup server only needs to be adjusted when additional software is needed on the server

server=root@46.101.201.6

scp setup-server.sh ${server}:setup-server.sh
ssh ${server} sh setup-server.sh
sh deploy.sh