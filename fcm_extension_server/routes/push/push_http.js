var express = require('express');
var request = require('request');

var router = express.Router();
router.get('/:token', async(req, res, next) => {
  
  let token = req.params.token;

  if(!token){
    res.status(401).send({
        message : "null value"
    });
    return;
  }

  //post 요청
  let reqObj={
      "to" : token, 
      "priority" : "high",
      "notification" : {
        "title" : "sunny is back" //보내고자 하는 제목
      }
  };

  try{
    request.post({
      headers : {'Content-type':'application/json','Authorization':'key={server key}'},
      url : 'https://fcm.googleapis.com/fcm/send',
      body : reqObj,
      json : true
    }, function(error, response){

      if(response.statusCode == 200){
        res.status(201).send({
          message : "success"
        });
      }
    });
  
    }catch(err){
     
      res.status(500).send({
        message : "Internal Server Error",
        
      });
      return;
    }
  });

    module.exports = router;