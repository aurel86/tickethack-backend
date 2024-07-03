var express = require('express');
var router = express.Router();
const Booking = require('../models/bookings')
const Trip = require('../models/trips');
const Cart = require('../models/carts');
/* GET home page. */

router.get('/trips/:departure/:arrival/:departureDate', (req, res) => {
  const departure = req.params.departure; 
  const arrival = req.params.arrival; 
  const departureDate = req.params.departureDate;

  if (!departure || !arrival || !departureDate) { 
      return res.json({ result: false, error: "Les champs de départ et d'arrivée et dates sont obligatoires" });
  }
  const fromDate = new Date(departureDate);
  const toDate = new Date(fromDate);
  toDate.setHours(23, 59, 59);
  
  Trip.find({
    departure: {$regex: new RegExp(departure, "i") },
    arrival: { $regex: new RegExp(arrival, "i") },
    date: {
      $gte: fromDate,
      $lte: toDate
    }
  })
  .then(data => {
    if (data.length > 0) {
                  res.json({ result: true, trips: data });
    } else {
                  res.json({ result: false, error: "Aucun trajet trouvé" });
    }
    
  })
  
})


router.post('/carts', (req, res) => {
  const newTrip = new Trip ({
    departure:req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
    price: req.body.price,
  });
  newTrip.save().then(() => {
    res.json({ result: true});
  })

  });
  router.get('/carts', (req, res) => {
    Cart.find().then(data => {
      res.json({ allCartItem: data});
    });
  });
  
  router.delete('/carts', (req, res) => {
    Cart.deleteOne().then(data => {
      res.json({result: true})
      })
    })
  







  
module.exports = router;
