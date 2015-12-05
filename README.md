### Server Setup & Deployment

Create a server, then ssh into it and set it up using:

```
cd deployment
./setup-and-deploy.sh
```

For re-deploying after code changes run `./deploy.sh`

Note: The deploy script also sets up a cronjob for backups

### Angular Meteor

All Javascript is in `putzfrau-suche.js`, except for the routes, which can be found in `putzfrau-suche/client` and a one-liner in `/client/lib/app.js`.

The HTML is divided into components and directives. It would be the goal to separate controllers too, but there was an error. The root html file is the index.html in the client folder.

All css and scss is found in `putzfrau-suche.css` and the files located at `client/scss`.

The rest of the app follows the usual meteor rules: public is public, server is only server, etc. (meteor enforces this by folder name).

### See the code in action

Visit [putzfrau-suche.ch](http://putzfrau-suche.ch)