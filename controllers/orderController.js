var orderModel = require('../models/orderSchema');

exports.getAllOrders = (req, res, next) => {
    orderModel.find({}, {_id: 1})
    .then((order) => {
        res.statusCode = 200;
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Content-Type', 'application/json');
        res.json(order);
        console.log(order);
    }, (err) => next(err))
    .catch((err) => next(err));
}

exports.getSingleOrder = (req, res, next) => {
    orderModel.findById(req.params.orderId)
    .then((order) => {
        res.statusCode = 200;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Content-Type', 'application/json');
        res.json(order);
    }, (err) => next(err))
    .catch((err) => next(err));
}

exports.uploadOrder = (req, res, next) => {
    let order = new orderModel({
        userId: req.body.userId,
        userEmail: req.body.userEmail,
        userContactNo: req.body.userContactNo,
        items: req.body.items,
        itemCount: req.body.itemCount,
        totalPrice: req.body.totalPrice
    });

    order.save((err, order) => {
        if ( err ) {
            console.log("err", err);
            res.json({success: false, err: err});
        } else {
            res.statusCode = 200;
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, resp: order});
        }
    });   
}