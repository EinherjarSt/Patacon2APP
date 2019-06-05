const express = require('express');
const app = express();
const passport = require('passport');

const Route = require('../models/route');

app.get('/route/get/:id_route',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	let idRoute = req.params.id_route;

    Route.addRoute(idRoute, (err, route) => {
    	if(err){
    		return res.status(400).json(err);
    	}
    	return res.json(route);
    })
});

app.put('/route/add',  passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    let body = req.body;
    let newRoute = new Route(body.id_route,body.routes,body.ref_location);
	
	Route.addRoute(newRoute, (err, result) => {
		if(err){
			return res.status(400).json(err);
		}

		return res.json({
			message: "The producer has been added correctly"
		});
	});
});

app.get('/route/getAllInfo', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	Route.getAllRoutesInfo((err, result) => {
		if(err){
			return res.status(400).json(err);
		}
		return res.json(result);
	});
    
});

app.get('/route/getWithoutRoutes', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
	Route.getProducersWithoutRoute((err, result) => {
		if(err){
			return res.status(400).json(err);
		}
		return res.json(result);
	});
    
});

app.post("/route/delete/:idLocation",
    passport.authenticate("jwt", {
        session: false
    }),
    (req, res) => {
        let idLocation = req.params.idLocation;
        Route.deleteRoute(idLocation,(err, resp) => {
            if (err) {
                return res.status(400).json(err);
            }
            return res.json(resp);
        });
    }
);
module.exports = app;