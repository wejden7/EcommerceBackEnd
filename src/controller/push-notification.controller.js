const pushNotificationService = require ("../service/push-notificarion.service");

exports.PushdNotification =(req,res,next)=>{

    var message ={
        "to":"fOZiVArLSkS0DUKaKKnkEv:APA91bEM1nlwAA27xPyx1vORyHaggIJfpasjxZ0_34bHe6S13H4mdMEjh9Guq-_tf80B3vMcJrQlBVUymIFr8-cv464r00guH9sAgWHx4AEZvgMlsmP4FRZvwpU-dirGnuegqbJ8AuKz",
        "notification":{
          "title":"you have recieveda message from wejden",
          "body":"testing body from post",
          "sound":"default"
        },
        "android":{
          "priority":"HIGH",
          "notification":{
            "notification_priority":"PRIPRITY_MAX",
            "sound":"default",
            "default_sound":"true",
            "default_vibrate_timings":"true",
            "default_light_settings":"true"
          }
          
        },
        "data":{
          "type":"order",
          "id":"87",
          "click_action":"FLUTTER_NOTIFICATION_CLICK"
          
        }
        
      }

    pushNotificationService.SendNotification(message,(error,results)=>{
        if(error){
            return next(error);
        }
        
        return res.status(200).send({
            message:"Successf",
            data :results,
        });
    });
}

