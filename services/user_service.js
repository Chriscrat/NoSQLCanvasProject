var userService = {

    insert: function(data, _collection, callback){
            var collection =  global.mongoDb.collection(_collection);
            collection.insert(data, function(err, result) {
                if(!err)
                    console.log("Insert success");
                else
                    console.log("Error insert")});
            callback();
        },
        getCountDrawing: function(_collection, callback){
            var collection =  global.mongoDb.collection(_collection);
            var count=0;
            collection.distinct('id',function(err, docs){
                if(!err){
                    if(docs==undefined){
                        global.collectionLength = count;
                        callback();
                    }
                    else{
                        global.collectionLength = docs.length;
                        callback();
                    }
                }
                else
                {
                    callback();
                }
            });
            callback();
        },
        getCollectionContentById: function(_collection, id, callback){
            var collection =  global.mongoDb.collection(_collection);
            collection.find({'id': id }).toArray(function(err, items) {
                if(!err){
                    global.content = items;
                    callback();
                }
                else
                {
                    console.log("Error during query request");
                    callback();
                }
            });
        }
}
module.exports=userService;