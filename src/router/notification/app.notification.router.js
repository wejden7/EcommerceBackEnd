const {PushdNotification}=require('../../controller/push-notification.controller');

const express =require("express");

const  router =express.Router();

router.get("/SendNotification",PushdNotification);

module.exports =router;