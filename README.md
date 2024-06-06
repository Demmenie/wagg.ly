# Wagg.ly

This web application allows dog owners to find dog walkers and vice versa.
It allows anyone to create a posting and look for potential matches!

## API
It uses a RESTful API to query the NoSQL MongoDB database. This can be accessed thorugh GET requests to '/getWalkers' and '/getOwners' or POST requests to
'/addWalker' or '/addOwner'.

## Set-up
To set this web app up locally, simply clone this repository and navigate into
the directory, then using npm with Node 20 run `npm install` and `npm start`.

## Pushing to Azure
Using the Azure plugin for VSCode, we can craete a Web App instance and deploy
the code in a matter of minutes.

The result is available at: https://bs3928-waggly.azurewebsites.net
The Github repository can be found at: https://github.com/Demmenie/wagg.ly