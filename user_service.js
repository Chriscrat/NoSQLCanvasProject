var userService = {
    insert: function(data, cfg, callback){
        mongo.insert("test:success");
    }
}
module.exports=userService;