


async function SendNotification(data,callback){

    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization" : "key="+process.env.API_KEY,
    };

    var https = require("https");
    var option ={
        host :"fcm.googleapis.com",
        path : "/fcm/send"   ,
        method : "POST",
        headers :headers
    };
    var req = https.request(option,function(res){
        res.on("data",function(data){
            console.log(JSON.parse(data));
            return callback(null,JSON.parse(data))
        });
    });

    req.on("error",function(e){
        return callback({message:e});
    });

    req.write(JSON.stringify(data));
    req.end();
}

module.exports = {SendNotification}