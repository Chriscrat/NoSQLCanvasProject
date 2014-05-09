var async = require("gsync");

function init(job){
    async([function(db){
        MongoClient.connect("mongodb://"+global.config["mongo"].hostname+":"+global.config["mongo"].port+"/"+global.config["mongo"].database, function(err, db) {
            if(!err) {
                console.log("Connection : success");
                db.createCollection('action', function(err, collection) {
                    if(!err){
                        console.log("Create collection : created");
                    }
                    else
                        console.log("Create collection : error");
                });
            }
            else
                console.log("Connection : error");
        });
    }])
}