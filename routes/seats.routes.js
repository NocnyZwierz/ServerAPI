const express = require('express');
const db = require('../db/db.js')
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

router.route('/seats').get((req, res) =>{
    res.send(db.seats)
 })

router.route('/seats/:id').get((req, res) => {
    const id = parseInt(req.params.id)
    const sortedById = db.seats.find(item => item.id === id);

    if(sortedById) {
        res.send(sortedById);
    } else {
        res.status(404).json({error: 'Seat not found!'});
    }
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email} = req.body;

    if (!day || !seat || !client || !email) {
        return res.status(400).json({ error: 'All information required!' });
    }

    newConcerts = {
        id: uuidv4(),
        day: parseInt(day),
        seat:parseInt(seat),
        client,
        email,
    };
    
    db.seats.push(newConcerts);
    res.status(200).json({messege: 'OK'})
});

router.route('/seats/:id').put((req, res) => {
    if(!req.body) {
        res.status(400).json({error: 'Request body is required!'})
    }

    const id = parseInt(req.params.id)
    const { day, seat, client, email} = req.body;
    const seats = db.seats.find(item => item.id === id);

    if (!seats) {
        return res.status(404).json({ error: 'Seat not found!' });
    }

    if (day) seats.day = parseInt(day);
    if (seat) seats.seat = parseInt(seat);
    if (client) seats.client = client;
    if (email) seats.email = email;
    console.log(db.seats);
    res.json({ message: 'OK' });
});

router.route('/seats/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
    const index = db.seats.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Seat not found!' });
    }

    db.seats.splice(index, 1);
    res.json({ message: 'OK' });
});

module.exports = router;