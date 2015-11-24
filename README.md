### Server Setup & Deployment

Create a server, then ssh into it and set it up using:

cd deployment

scp server-setup.sh <server>:server-setup.sh
ssh <server> sh server-setup.sh

and afterwards deploy the code with:

sh deploy.sh


### Angular Meteor

All Javascript is in help2clean-angular.js, except for the routes, which can be found in help2clean-angular/client and a one-liner in /client/lib/app.js.

The HTML is divided into components and directives. It would be the goal to separate controllers too, but there was an error. The root html file is the index.html in the client folder.

All css is found in help2clean-angular.css

The rest of the app follows the usual meteor rules: public is public, server is only server, etc. (meteor enforces this by folder name).
