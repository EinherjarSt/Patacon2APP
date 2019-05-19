const express = require('express');
const app = express();

const Producer = require('../models/producer');
const Location = require('../models/location');
const passport = require('passport');

app.get('/producer/get/:rut',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	let rut = req.params.rut;

    Producer.getProducer(rut, (err, producer) => {
    	if(err){
    		return res.status(400).json(err);
    	}
    	return res.json(producer);
    })
});

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
	let newProducer = new Producer(body.name, body.rut);
	
	Producer.addProducer(newProducer, (err, result) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json({
			message: "The producer has been added correctly"
		});
	});
});

app.put('/producer/update',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	let body = req.body;
	let newProducer = new Producer(body.name, body.rut);

	Producer.updateProducer(newProducer, (err, result) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json({
			message: "The producer has been modified"
		});
	});
});

app.put('/producer/updateLocation',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	let body = req.body;
	let newLocation = new Location(body.ref_producer, body.address, body.latitude, body.longitude, body.manager, body.managerPhoneNumber);

	Location.updateLocation(newProducer, (err, result) => {
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
});


app.put('/producer/addLocation',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	let body = req.body;
	let newLocation = new Location(body.ref_producer, body.address, body.latitude,
	 body.longitude, body.manager, body.managerPhoneNumber);
	
	Location.addLocation(newLocation, (err, result) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json({
			message: "The location has been added correctly"
		});
	});
});

app.get('/producer/getLocation/:ref_producer',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	let ref_producer = req.params.ref_producer;

    Location.getAllLocations(ref_producer, (err, locations) => {
    	if(err){
    		return res.status(400).json(err);
    	}
    	return res.json(locations);
    })
});

module.exports = app;