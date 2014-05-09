var userService = {
    insert: function(data, _collection, callback){
            var collection =  global.mongoDb.collection(_collection);
            collection.insert([data], function(err, result) {
                if(!err)
                    console.log("Insert success");
                else
                    console.log("Error insert")});
            callback();
        }
}
module.exports=userService;