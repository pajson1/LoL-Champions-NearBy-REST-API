const express = require('express');
const router = express.Router();
const Champion = require('../models/champion');

// get a list of champions from the db
router.get('/champions', function (req, res, next) {

    Champion.aggregate().near({
        near: {
            'type': 'Point',
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        maxDistance: 100000,
        spherical: true,
        distanceField: "dis"
    }).then(function (champions) {
        res.send(champions);
    }).catch(next);
});

// add a new champion to the db
router.post('/champions', (req, res, next) => {
    Champion.create(req.body).then(champion => {
        res.send(champion);
    }).catch(next);
});

// update a champion in the db
router.put('/champions/:id', function (req, res, next) {
    Champion.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        Champion.findOne({ _id: req.params.id }).then(function (champion) {
            res.send(champion);
        });
    }).catch(next);
});

// delete a champion from the db
router.delete('/champions/:id', function (req, res, next) {
    Champion.findByIdAndRemove({ _id: req.params.id }).then(function (champion) {
        res.send(champion);
    }).catch(next);
});

module.exports = router;
