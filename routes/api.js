const express = require('express');
const ninja = require('../models/users');
const router = express.Router();

// get list ninjas from the db
router.get('/ninjas', (req, res, next) => {
    /* ninja.find({}).then((ninjas) => {
         res.send(ninjas);
     });

    ninja.aggregate().near({
        near: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        maxDistance: 100000,
        spherical: true,
        distanceField: "dist.calculated"
    }).then((ninjas) => {
        res.send(ninjas);
    });
    */
    ninja.aggregate().near({
        near: {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 300000,
        spherical: true,
        distanceField: "dist.calculated"
    }).then((ninjas) => {
        res.send(ninjas);
    });

})
// add a new ninja to the database
router.post('/ninjas', (req, res, next) => {
    ninja.create(req.body)
        .then((Ninja) => {
            res.send(Ninja);
        })
        .catch(next);
    ;
    // var Ninja = ninja(req.body);
    // Ninja.save();
})

//update a ninja to the database
router.put('/ninjas/:id', (req, res, next) => {
    const id = req.params.id;
    ninja.findByIdAndUpdate({ _id: id }, req.body)
        .then(() => {
            ninja.findOne({ _id: id }).then((Ninja) => {
                res.send(Ninja);
            });

        });
})

// delete a ninja from a database
router.delete('/ninjas/:id', (req, res, next) => {
    const id = req.params.id;
    ninja.findByIdAndRemove({ _id: id })
        .then((Ninja) => {
            res.send(Ninja);
        });
})

module.exports = router;

/*
{
    "name" : "luigi",
    "rank" : "pink belt",
    "available" :true,
    "geometry" :{"type" : "point", "coordinates" :[-81.1, 24.95]}
}
*/