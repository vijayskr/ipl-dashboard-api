const mongodb = require('mongodb').MongoClient;
const csvtojson = require('csvtojson');

let mongoUrl = "mongodb+srv://admin:admin@myatlascluster0.p0uai.mongodb.net?retryWrites=true&w=majority";

csvtojson ()
.fromFile('IPLMatches.csv')
.then(csvData => {
    //console.log(csvData);

    mongodb.connect(
        mongoUrl,
        { useNewUrlParser: true, useUnifiedTopology: true},
        (err, client) => {
            if(err) throw err;

            client
            .db("ipl-dashboard-data")
            .collection("ipl-match-data")
            .insertMany(csvData, (err, res) => {
                if(err) throw err;

                console.log(`Inserted: ${res.insertedCount} rows`);
                client.close();
            });
        }
    );
});


