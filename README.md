# fh-health-monitor

FeedHenry Health Monitor service is a pingdom like general monitoring service.

## MongoDB setup

Create new db and user.

    mongo
    use fhmonitor
    db.createUser({user: 'fhmonitor', pwd: 'fhmonitor', roles: [{role:'dbOwner',db:'fhmonitor'}]});

You should see the following if the user was created ok:

    Successfully added user: {
      "user" : "fhmonitor",
      "roles" : [
        {
          "role" : "dbOwner",
          "db" : "fhmonitor"
        }
      ]
    }

## Installation/Running

    npm install
    node application.js

If you get a port conflict, you can specify the port to start the server on:

    FH_PORT=3333 node application.js

## Supported Checks/Protocols

* HTTP(S)