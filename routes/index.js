var express = require('express');
var router = express.Router();
const Booking = require('../models/bookings')
const Trip = require('../models/trips');
const Cart = require('../models/carts');
/* GET home page. */

router.post('/', (req, res) => {
  const departure = req.body.departure; 
  const arrival = req.body.arrival; 
  const departureDate = req.body.departureDate;

  if (!departure || !arrival || !departureDate) { 
      return res.json({ result: false, error: "Les champs de départ et d'arrivée et dates sont obligatoires" });
  }
  const fromDate = new Date(departureDate);
  const toDate = new Date(fromDate);
  toDate.setHours(23, 59, 59);
  
  Trip.find({
    departure: {$regex: new RegExp(departure, "i") },
    arrival: { $regex: new RexExp(arrival, "i") },
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

router.post('/', (req, res) => { 
  Cart.findOne().then(data => {
    console.log(data);
    res.json({ })
  })

})




  
module.exports = router;
