var MongoClient = require('mongodb');
var async = require("async"),
    init = function (callback) {
        async.series([
                function (cb) {
                    MongoClient.connect("mongodb://" + global.config["mongo"].hostname + ":" + global.config["mongo"].port + "/" + global.config["mongo"].database, function (err, db) {
                        if (!err) {
                            console.log("Connection : success");
                            db.createCollection('action', function (err, collection) {
                                if (!err) {
                                    console.log("Create collection : created");
                                    global.mongoDb = db;
                                    cb();
                                }
                                else
                                    cb();
                            });
                        }
                        else
                            cb();
                    });
                }
            ],
            function (err) {
                if(err)
                    console.log("error");
            });
    }
module.exports = init;