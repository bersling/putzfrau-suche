### Prerequisites

Ubuntu 14.04 Server

### Usage

1) Configure `properties.sh`
2) For first time setup run `sh setup-and-deploy.sh`
3) For later iterations only run `sh deploy.sh`

### Customizations

- If you need additional software, modify setup-server.sh


### What's happening

setup.sh installs
- node
- mongo
- meteor

deploy.sh
- builds the code (meteor command)
- uploads the code
- runs the code

