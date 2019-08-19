var express = require('express');
var router = express.Router();
var db = [];

router.get('/', function(req,res){
    res.send('<h1>Warehouse Database Items</h1>')
})

router.get('/additem/:name/:quantity/:price', function(req,res){
    let randomID = Math.floor(Math.random() * 1000);
    let quantity = parseInt(req.params.quantity);
    let price = parseInt(req.params.price);
    let cost = quantity * price;
    
    let item = {
        id: randomID,
        name: req.params.name,
        quantity: quantity,
        price: price,
        cost: cost
    }
        
    db.push(item);
    res.send(item.name + " added to database");
   
});

router.get('/deleteItem/:id', function(req,res){
    let itemIndex = db.findIndex(function(item){
        return item.id;
    });
    
    if(itemIndex > -1){
        db.splice(itemIndex, 1);
        res.send("Item deleted");
    }
    else{
        res.send("Item not found");
    }
});

router.get('/listAllItems', function(req,res){
    let itemList = "ID | Name | Quantity | Price | Cost<br>";
    db.forEach(function(item){
        let listRow = item.id + "     |     " + item.name + "     |     " + item.quantity
        + "     |     " + item.price + "     |     " + item.cost;
        itemList += listRow + "<br>";
    });
    
    res.send(itemList);
});

router.get('/totalValue', function(req,res){
    let totalCost = 0;
    db.forEach(function(item){
        totalCost += item.cost;
    });
    res.send(totalCost.toString());
});

module.exports = router;
