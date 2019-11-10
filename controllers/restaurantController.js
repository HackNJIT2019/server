var restaurantModel = require('../models/restaurantSchema');

exports.getAllRestaurants = (req, res, next) => {
    restaurantModel.find({}, {name: 1, _id: 1})
    .then((restaurant) => {
        res.statusCode = 200;
        // res.header("Access-Control-Allow-Origin", "*");
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Content-Type', 'application/json');
        res.json(restaurant);
        console.log(restaurant);
    }, (err) => next(err))
    .catch((err) => next(err));
}

exports.getSingleRestaurent = (req, res, next) => {
    restaurantModel.findById(req.params.restId)
    .then((restaurant) => {
        res.statusCode = 200;
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader('Content-Type', 'application/json');
        res.json(restaurant);
    }, (err) => next(err))
    .catch((err) => next(err));
}

exports.search = (req, res, next) => {
    console.log("query", req.query.q);
    var query = req.query.q;
    restaurantModel.find({"$text": { "$search": query}}, (err, resp) => {
        if ( err ) {
            console.log("err", err);
            res.json({success: false, err: err});
        } else {
            console.log("resp", resp);
            res.json({success: true, resp: resp});
        }
    });
    // .then((resp) => {
    //     res.statusCode = 200;
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     res.setHeader('Content-Type', 'application/json');
    //     res.json(resp);
    //     console.log("resp", resp);
    // }, (err) => next(err))
    // .catch((err) => next(err));
}