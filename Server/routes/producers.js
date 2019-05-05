const express = require('express');
const app = express();

const Producer = require('../models/producer');

app.get('/producer/getAll', (req, res) => {
	let body = req.body;

	Producer.getAllProducers((err, producers) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json(producers);
	});
    
});

app.put('/producer/add', (req, res) => {
	let body = req.body;
	let newProducer = new Producer(body.name, body.rut, body.location, body.telephone, body.manager);
	
	Producer.addProducer(newProducer, (err, result) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json({
			message: "The producer has been added correctly"
		});
	});
});

app.post('/producer/update', (req, res) => {
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

app.post('/producer/delete', function(req, res){
	console.log('/delete-producer');
},)

app.get('/producer/get', function(req, res){
    res.send('/producers');
});