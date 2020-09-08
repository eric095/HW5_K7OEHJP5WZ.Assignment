

// With Mongo CLient

const express = require('express')
const app = express()
const port = 4000;
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');



// const url = "mongodb+srv://elvis:elvis@cluster0.aaetk.mongodb.net/COVID_CASES";
const url = "mongodb+srv://ericdb:awasty45k@cluster0.k13ur.mongodb.net/CORONA_CASES"


// DB Name
const dbName = 'ERICDB';

// Creating new MongoClient
const client = new MongoClient(url);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {

    // Stating the constants needed
    const db = client.db(dbName);
    const collection = db.collection('CORONA_CASES');



    // Finding all the cases
    collection.find({}).toArray(async function (err, cases_list) {
        assert.equal(err, null);
        let cases = await cases_list;
        res.render('index.ejs', { 'stories': cases })
    });
})




// Connecting to server
client.connect(function (err) {
    assert.equal(null, err);
    console.log('====================================');
    console.log('Connected successfully to DB😐 ');
    console.log('====================================');

    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`)
    })
})



