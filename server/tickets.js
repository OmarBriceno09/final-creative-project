const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

//
// Tickets
//

const ticketSchema = new mongoose.Schema({
  name: String,
  win_score: {type: Number, default: 0},
  problem: String,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

router.get('/', async (req, res) => {
  try {
    let tickets = await Ticket.find();
    return res.send(tickets);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const ticket = new Ticket({
    name: req.body.name,
    win_score:req.body.win_score,
    problem: req.body.problem
  });
  try {
    await ticket.save();
    return res.send(ticket);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Ticket.deleteOne({
      _id: req.params.id
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;