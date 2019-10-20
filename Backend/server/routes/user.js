const express = require('express');
const app = express();
const User = require('../models/user');
const bcrypt = require('bcrypt');
//////////////////////////////////////

app.get('/usuario',function(req,res){
  let id = req.params.id;
  res.json({
      id:1
  });
});

app.post('/agregarUsuario',function(req,res){
    let body = req.body;//asi leo lo que hay en el vody de la peticion post, debe usarse body parser de npm
    let usuario = new User({
      userName : body.userName,
      email : body.email,
      password : bcrypt.hashSync(body.password,10), //ENCRIPTACION HASH DE UNA VIA CON 10 VUELTAS 
      userType: body.userType
    });
    
    usuario.save((err,usuarioDB)=>{
      //callback que trae error si no pudo grabar en la base de datos y usuarioDB si lo inserto
      if(err){
        return res.status(400).json({
          ok:false,
          err
        });
      }

      usuario.password =null;
      res.json({
        ok:true,
        usuario: usuarioDB
      });
      
    });    
});


module.exports = app;//para importar al archivo de server.js