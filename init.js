var MongoClient = require('mongodb');
var async = require("async"),
    init = function () {
        async.series([
                function (cb) {
                    MongoClient.connect("mongodb://" + global.config["mongo"].hostname + ":" + global.config["mongo"].port + "/" + global.config["mongo"].database, function (err, db) {
                        if (!err) {
                            console.log("Connection : success");
                            db.createCollection('action', function (err, collection) {
                                if (!err) {
                                    console.log("Create collection : created");
                                    global.mongoDb = db;
                                    var collection =  db.collection("action");
                                    var count=0;
                                    collection.distinct('id',function(err, docs){
                                        if(!err){
                                            if(docs==undefined){
                                                global.collectionLength = count;
                                                cb();
                                            }
                                            else{
                                                global.collectionLength = docs.length;
                                                cb();
                                            }
                                        }
                                        else
                                        {
                                            cb();
                                        }
                                    });
                                    cb();
                                }
                                else
                                    cb();
                            });
                        }
                        else
                            console.log("MongoDB is offline")
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