sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y build-essential

#install node
sudo apt-get install -y nodejs
sudo apt-get install npm

#install mongo
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo service mongod start

#install meteor
curl https://install.meteor.com/ | sh

#utils
sudo apt-get install graphicsmagick