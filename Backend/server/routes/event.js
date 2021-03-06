const express = require('express');
const app = express();
const Event = require('../models/event');


app.get('/getEvents/:id',function(req,events){
  let desde = req.query.desde || 0; //logic operator, if user doesnt send "desde" propertie in the petition, then desde variable will be set in 0;
  desde = Number(desde);

  let limite = req.query.limite || 0; 
  limite = Number(limite);
  let idRes = req.query.id;
  idRes = Number(idRes);
  
  Event.find({'idRestaurant':idRes})
        .exec((err,resMon)=>{
            if(err){
              return resMon.status(400).json({
                response:1,
                content:err
              });
            }
            if(resMon){
              data = {
                response:2,
                events: resMon
               

              };
            }
            events.json(data)//display response
          });
});

app.delete('/deleteEvent',function(req,res){
  let id = req.query.id;
  Event.findByIdAndRemove(id,(err,eventDB)=>{
    if(err){
      return res.status(400).json({
        response:1,
        content:err
      });
    }
    res.json({
      response:2,
      event: eventDB
    });
  });  
  
    
  
});

app.post('/addEvent',function(req,res){
    let body = req.body;//asi leo lo que hay en el vody de la peticion post, debe usarse body parser de npm
    let event = new Event({
      idRestaurant : body.idRestaurant,
      name : body.name,
      date : body.date,
      type: body.type
    });
    
    Event.save((err,eventDB)=>{
      //callback que trae error si no pudo grabar en la base de datos y usuarioDB si lo inserto
      if(err){
        return res.status(400).json({
          response:1,
          content:err
        });
      }
      res.json({
        response:2,
        event: eventDB
      });
    });    
});


module.exports = app;