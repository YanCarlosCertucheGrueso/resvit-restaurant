require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

/////////
app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'SA',
        password: 'Sqlserver2.',
        server: '40.117.173.135', 
        database: 'ADMINISTRADOR',
        port: 1432 
    };

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log('error en la conexion',err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from USER', function (err, recordset) {
            
            if (err) console.log('error en la consulta',err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});
//==============================Eventos====================
app.post('/postevent',function(req,res){
    res.json('Aca va a tener que enviarme la informacion del evento para crearlo');
});
app.put('/editevent',function(req,res){
    res.json('Aca va a tener que enviarme la informacion del evento para actualizarlo');
});
app.get('/getevent/:id',function(req,res){
    let id = req.params.id;
    res.json({
        idEvent:id
    });
});
//========================================================
/*
app.post('/usuario',function(req,res){
    let body = req.body;//asi leo lo que hay en el vody de la peticion post, debe usarse body parser de npm

    if(body.nombre === undefined){ //asi respondo si las peticiones son buenas o malas
        res.status(400).json({
            ok:false,
            mensaje:'EL nombre es necesario'
        });
    }else{
        res.json({
            persona:body
        });
    }
    

});*/
/*DATA BASE CONFIGURING  TO sql server the tedius module is require */

app.listen(process.env.PORT,()=>{
    console.log('escuchando al puerto',3000);
});