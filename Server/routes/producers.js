const express = require('express');
const app = express();

const Producer = require('../models/producer');
const Location = require('../models/location');
const passport = require('passport');

app.get('/producer/get/:rut',  passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
	let rut = req.params.rut;

    Producer.getProducer(rut, (err, producer) => {
    	if(err){
    		return next(err)
    	}
    	return res.json(producer);
    })
});

app.get('/producer/getlocation/:id',  passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
	let idLocation = req.params.id;

    Producer.getLocation(idLocation, (err, location) => {
    	if(err){
    		return next(err)
    	}
    	return res.json(location);
    })
});

app.get('/producer/getall', passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
	Producer.getAllProducers((err, producers) => {
		if(err){
			return next(err)
		}

		return res.json(producers);
	});
    
});

app.put('/producer/add',  passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
	let body = req.body;
	let newProducer = new Producer(body.name, body.rut);
	
	Producer.addProducer(newProducer, (err, result) => {
		if(err){
			return next(err)
		}

		return res.json({
			message: "The producer has been added correctly"
		});
	});
});

app.post('/producer/update',  passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
	let body = req.body;
	let newProducer = new Producer(body.name, body.rut);

	Producer.updateProducer(newProducer, (err, result) => {
		if(err){
			return next(err)
		}

		return res.json({
			message: "The producer has been modified"
		});
	});
});

app.post('/producer/updateLocation',  passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
	let body = req.body;
	let newLocation = new Location(body.id_location, body.ref_producer, body.address, body.latitude, body.longitude, body.manager, body.managerPhoneNumber);

	Location.updateLocation(newLocation, (err, result) => {
		if(err){
			return next(err)
		}

		return res.json({
			message: "The Location has been modified"
		});
	});
});

app.post('/producer/deleteLocation/:id_location',  passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
	let id_location = req.params.id_location;
	
	Location.deleteLocation(id_location, (err, result) => {
		if(err){
			return next(err)
		}

		return res.json({
			message: "The Location has been deleted"
		});
	});
});

app.post('/producer/delete/:rut',  passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
	let rut = req.params.rut;

	Producer.deleteProducer(rut, (err, result) =>{
		if(err){
			return next(err)
		}

		return res.json({
			message: "The producer has been deleted"
		});
	});
});


app.put('/producer/addLocation',  passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
	let body = req.body;
	let newLocation = new Location(0,body.ref_producer, body.address, body.latitude,
	 body.longitude, body.manager, body.managerPhoneNumber);
	
	Location.addLocation(newLocation, (err, result) => {
		if(err){
			return next(err)
		}

		return res.json({
			message: "The location has been added correctly"
		});
	});
});

app.get('/producer/getLocation/:ref_producer',  passport.authenticate('jwt', {
    session: false
}), (req, res, next) => {
	let ref_producer = req.params.ref_producer;

    Location.getAllLocations(ref_producer, (err, locations) => {
    	if(err){
    		return next(err)
    	}
    	return res.json(locations);
    })
});

module.exports = app;