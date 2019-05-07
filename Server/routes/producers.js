const express = require('express');
const app = express();

const Producer = require('../models/producer');
const passport = require('passport');

app.get('/producer/getall', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	Producer.getAllProducers((err, producers) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json(producers);
	});
    
});

app.put('/producer/add',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	let body = req.body;
	let newProducer = new Producer(body.name, body.rut, body.telephone, body.manager);
	
	Producer.addProducer(newProducer, (err, result) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json({
			message: "The producer has been added correctly"
		});
	});
});

app.post('/producer/update',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	let body = req.body;
	let newProducer = new Producer(body.name, body.rut, body.location, body.telephone, body.manager);

	Producer.updateProducer(newProducer, (err, result) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json({
			message: "The producer has been modified"
		});
	});
});

app.post('/producer/delete',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	console.log('/delete-producer');
},)

app.get('/producer/get',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    res.send('/producers');
});

module.exports = app;