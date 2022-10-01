var fs = require('fs');
function deleteFile  (path){
    fs.stat(path, function (err, stats) {
        console.log(stats);//here we got all information of file in stats variable
     
        if (err) {
            return err
        }
     
        fs.unlink(path,function(err){
             if(err) return err;
           return true
        });  
     });
}


 module.exports = deleteFile