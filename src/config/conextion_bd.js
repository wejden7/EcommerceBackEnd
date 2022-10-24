const mongosse = require('mongoose');

url = "mongodb://"+process.env.HOST_bd+":"+process.env.PORT_bd+"/"+process.env.DB_NAME;
urlcloud = "mongodb+srv://wejden:wejden@cluster0.zmsspy3.mongodb.net/e_commerce?retryWrites=true&w=majority";

mongosse.connect(urlcloud, function(err, db) {
  if (err) throw err;
 console.log('conction succses to bd  ')
}); 