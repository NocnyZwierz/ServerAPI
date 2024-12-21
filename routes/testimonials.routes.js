const express = require('express');
const db = require('../db/db.js')
const { v4: uuidv4 } = require('uuid');
const router = express.Router();


router.route('/testimonials').get((req, res) =>{
   res.send(db.testimonials)
})

router.route('/testimonials/random').get((req, res) => {
    const randomId = Math.floor(Math.random() * db.testimonials.length);
    res.json(db.testimonials[randomId]);
});

router.route('/testimonials/:id').get((req, res) => {
    const id = parseInt(req.params.id)
    const sortedById = db.testimonials.find(item => item.id === id);

    if(sortedById) {
        res.send(sortedById);
    } else {
        res.status(404).json({error: 'User not found!'});
    }
});

router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;

    if (!author || !text) {
        return res.status(400).json({ error: 'Author and text are required!' });
    }

    newtestimonials = {
        id: uuidv4(),
        author,
        text,
    };
    
    db.testimonials.push(newtestimonials);
    res.status(200).json({messege: 'OK'})

});

router.route('/testimonials/:id').put((req, res) => {
    if(!req.body) {
        res.status(400).json({error: 'Request body is required!'})
    }

    const id = parseInt(req.params.id)
    const { author, text } = req.body;
    const testimonial = db.testimonials.find(item => item.id === id);

    if (!testimonial) {
        return res.status(404).json({ error: 'Testimonial not found!' });
    }

    if (author) testimonial.author = author;
    if (text) testimonial.text = text;

    res.json({ message: 'OK' });
});

router.route('/testimonials/:id').delete((req, res) => {
    const id = parseInt(req.params.id);
    const index = db.testimonials.findIndex(item => item.id === id);

    if (index === -1) {
        return res.status(404).json({ error: 'Testimonial not found!' });
    }

    db.testimonials.splice(index, 1);
    res.json({ message: 'OK' });
});

module.exports = router;