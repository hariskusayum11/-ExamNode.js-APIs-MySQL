'use strict';

const express = require('express') ;
const crypto = require ('crypto') ;
const wrRoute = express.Router();
const connection = require('../db');

wrRoute.post('/orders', function(req, res, next){
    connection.execute(`INSERT INTO orders 
        (order_id,customer_name ,product,quantity,order_date,status)
        VALUES(?,?,?,?,?,?);`,
        [req.body.order_id, req.body.customer_name, req.body.product, req.body.quantity, Date.now(), req.body.status])
        .then(()=>{
            console.log('ok');
            res.status(201).send("Insert sucsessfully");
        }).catch((err)=>{
            console.log(err);
            res.end();
        });
});

wrRoute.get('/orders',function(req, res, next){
    connection.execute('SELECT * FROM orders;')
    .then((result)=>{
       const rawData = result[0];
       res.json(rawData);
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("Read failed");  
      });
});

wrRoute.post('/orders/:id',function(req, res, next){
    connection.execute('SELECT * FROM orders WHERE customer_name=? AND product=?;',
        [req.body.customer_name, req.body.product])
    .then((result)=>{
       const data = result[0];
       res.json(data);
       if(data.length === 0){
        res.status(200).send('NO maching order found');
       }
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("order failed");  
      });
});

wrRoute.put('/orders/:id',function(req, res, next){
    connection.execute("UPDATE orders set customer_name=? ,product=?,quantity=?,order_date=?,status=? WHERE order_id=?;",
        [req.body.customer_name, req.body.product, req.body.quantity, Date.now(), req.body.status,req.params.order_id])
    .then((result)=>{
        console.log('UPDATE sucsessfully');
        res.status(200).send("UPDATE sucsessfully");
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("UPDATE failed");  
      });
});

wrRoute.delete('/orders/:id',function(req, res, next){
    connection.execute("DELETE FROM orders WHERE order_id=?;",
        [req.params.order_id])
    .then((result)=>{
        console.log('DELETE sucsessfully');
        res.status(200).send("DELETE sucsessfully");
    }).catch((err)=>{
        console.log(err);
        res.status(500).send("DELETE failed");  
      });
});

module.exports = wrRoute;