const express = require('express');
const db = require('../db/db.js')
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.route('/concerts').get((req, res) =>{
    res.send(db.concerts)
 })

router.route('/concerts/:id').get((req, res) => {
    const id = parseInt(req.params.id)
    const sortedById = db.concerts.find(item => item.id === id);

    if(sortedById) {
        res.send(sortedById);
    } else {
        res.status(404).json({error: 'Concert not found!'});
    }
});

router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;

    if (!performer || !genre || !price || !day || !image) {
        return res.status(400).json({ error: 'All information required!' });
    }

    newConcerts = {
        id: uuidv4(),
        performer,
        genre,
        price: parseInt(price),
        day: parseInt(day),
        image,
    };
    
    db.concerts.push(newConcerts);
    res.status(200).json({messege: 'OK'})

});

router.route('/concerts/:id').put((req, res) => {
    if(!req.body) {
        res.status(400).json({error: 'Request body is required!'})
    }

    const id = parseInt(req.params.id)
    const { performer, genre, price, day, image } = req.body;
    const concerts = db.concerts.find(item => item.id === id);

    if (!concerts) {
        return res.status(404).json({ error: 'Concert not found!' });
    }

    if (performer) concerts.performer = performer;
    if (genre) concerts.genre = genre;
    if (price) concerts.price = parseInt(price);
    if (day) concerts.day = parseInt(day);
    if (image) concerts.image = image;

    res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
    const index = db.concerts.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Concert not found!' });
    }

    db.concerts.splice(index, 1);
    res.json({ message: 'OK' });
});

module.exports = router;