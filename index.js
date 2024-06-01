/** 22/11/2022
 *  Chico Demmenie
 *  Wagg.ly/index.js
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
require('dotenv').config({path: './config.env'});

const { MongoClient, ServerApiVersion } = require('mongodb');
const { name } = require('ejs');
const uri = "mongodb+srv://skullburry1:KXVHJHwVA5e7TJ3Z@cluster0.clpfqyy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Creating a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

// Setting the database variables
let db, walkers, owners; 

// A fucntion for establishing a connection to the database
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db('platform');
    walkers = db.collection('walkers'); 
    owners = db.collection('owners');
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit on connection failure
  }
}


//------------------------------------------------------------------------------
// Initialise server variables
const init = () => {
    // initialise express app
    this.app = express();
    this.app.set('view engine', 'ejs');
    this.app.use(express.urlencoded());
    this.app.use(morgan('combined'));
    server.bind(this)();
    console.log('Server connected.');


    connectDB();
    const db = client.db('platform');
    this.walkers = db.collection('walkers');
    this.owners = db.collection('owners');
}


//------------------------------------------------------------------------------
// Server runtime function
const server = () => {

    
    // =================================
    // listens for activity on root page
    // takes request, response
    this.app.get('/', (req, res) => {
        // Render page
        res.render('index.ejs', {});
    });

    this.app.get('/newWalker', (req, res) => {
        // Render page
        res.render('newWalker.ejs', {});
    });

    this.app.get('/newOwner', (req, res) => {
        // Render page
        res.render('newOwner.ejs', {});
    });

    // A function that returns all walkers in the DB in json form.
    this.app.get('/getWalkers', async (req, res) => { 
        try {
            const walkersList = await this.walkers.find({}).toArray(); // Await the query
            res.json(walkersList);
        } catch (err) {
            console.error("Error retrieving walkers:", err);
            res.status(500).send("Internal Server Error");
        }
    });

    // A function that returns all walkers in the DB in json form.
    this.app.get('/getOwners', async (req, res) => { 
        try {
            const ownersList = await this.owners.find({}).toArray(); // Await the query
            res.json(ownersList);
        } catch (err) {
            console.error("Error retrieving owners:", err);
            res.status(500).send("Internal Server Error");
        }
    });

    // A function that returns all owners in the DB in json form.
    this.app.post('/addOwner', async (req, res) => { 
        try {
            console.log(req.body)
            const owner = {
                'name': req.body.name,
                'bio': req.body.bio,
                'address': {
                    'street': req.body.street,
                    'town': req.body.town,
                    'county': req.body.county,
                    'postcode': req.body.postcode
                }
            }

            await this.owners.insertOne(owner);

            res.redirect('/')
        } catch (err) {
            console.error("Error adding owner:", err);
            res.status(500).send("Internal Server Error");
        }
    });

    // A function that returns all owners in the DB in json form.
    this.app.post('/addWalker', async (req, res) => { 
        try {
            const walker = {
                'name': req.body.name,
                'bio': req.body.bio,
                'address': {
                    'street': req.body.street,
                    'town': req.body.town,
                    'county': req.body.county,
                    'postcode': req.body.postcode
                },
                'dogsPerWalk': req.body.dpw,
                'walksPerDay': req.body.wpd
            }
            await this.walkers.insertOne(walker);

            res.redirect('/')
        } catch (err) {
            console.error("Error adding owner:", err);
            res.status(500).send("Internal Server Error");
        }
    });

    // A function that returns all walkers in the DB in json form.
    /*
    this.app.post('/getOwners', async (req, res) => { 
        try {
            req.
        } catch (err) {
            console.error("Error retrieving owners:", err);
            res.status(500).send("Internal Server Error");
        }
    });
*/

    // =================================
    // Returns any document within the 'assets' directory.
    this.app.get(`/assets/*`, (req, res) => {
        const assetPath = path.join(__dirname, req.path);

        // If the file doesn't exist return 404
        try {
            if (fs.existsSync(assetPath)) {
                res.sendFile(assetPath);
            } else {
                sendErr(req, res, 404);
            }
          } catch(err) {
            sendErr(req, res, 404);
          }
    });

    // =================================
    // Returns any document within the 'static' directory
    this.app.get(`/static/*`, (req, res) => {
        const assetPath = path.join(__dirname, req.path);

        try {
            if (fs.existsSync(assetPath)) {
                res.sendFile(assetPath);
            } else {
                sendErr(req, res, 404);
            }
          } catch(err) {
            sendErr(req, res, 404);
          }
    });

    // =================================
    // These are some extra routes for specific assets.
    this.app.get(`/site.webmanifest`, (req, res) => {
        const assetPath = path.join(__dirname, "/site.webmanifest");
        res.sendFile(assetPath);
    });

    this.app.get(`/offline`, (req, res) => {
        const assetPath = path.join(__dirname, "templates/offline.html");
        res.sendFile(assetPath);
    });

    this.app.get(`/favicon.ico`, (req, res) => {
        const assetPath = path.join(__dirname, "assets/favicon.ico");
        res.sendFile(assetPath);
    });

    // =================================
    // Sends any request that isn't recognised before this to the 404 function.
    this.app.get('*', (req, res, next) => {
        const err = 404
        sendErr(req, res, err);
    });

    // =================================
    // A function that will respond with a 404 error.
    function sendErr(req, res, err) {
        // Setting the response code to 404
        res.status(err);

        if (err == 404){
            title = "404: Page doesn't exist";
            text = "Whoops, Wrong page...maybe try a different one?";
        } else if (err == 500){
            title = "500: Server error";
            text = "Oops, something went wrong (It's us not you)..."+
                "maybe try again? 🤷";
        }
      
        // respond with html page rendered with the correct message
        if (req.accepts('html')) {
            res.render('error', {url: req.url, error: title,
            text: text});
            return;
        }
      
        // respond with json
        if (req.accepts('json')) {
          res.json({ error: err });
          return;
        }
      
        // default to plain-text
        res.type('txt').send(err);
    }
    
    // Start listening on the standard port
    this.app.listen(process.env.PORT, () => {
        console.log(`Server Listening on port ${process.env.PORT}`);
    });
}

init();