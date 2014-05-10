var registry = {},
    My = {
        getService: function(servicePath) {
            return registry[servicePath] || (registry[servicePath]= require(__dirname + servicePath));
        }
    }
module.exports=My;