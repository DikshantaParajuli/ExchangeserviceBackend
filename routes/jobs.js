var express = require('express');
var jobs = require('../models/Job');
var verify = require('../verify');
var router = express.Router();

router.route('/')
    .get((req, res, next) => {
        jobs.find({})
            .then((jobs) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(jobs);
            }, (err) => next(err))
            .catch((err) => next(err));
    }) 
  
    .post((req, res, next) => {
       jobs.create(req.body)
            .then((job) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(job);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

router.route('names')
    .get((req, res, next) => {
        jobs.findById(req.params.name)
            .then((job) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(job);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    router.route('images')
    .get((req, res, next) => {
       jobs.findById(req.params.name)
            .then((job) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.sendFile(job);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
    router.route('/:id')
    .get((req, res, next) => {
        jobs.findById(req.params.id)
            .then((job) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(job);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported!");
    })
    .put((req, res, next) => {
        jobs.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useFindAndModify: false })
            .then((job) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(job);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        jobs.findByIdAndDelete(req.params.id)
            .then((reply) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(reply);
            }, (err) => next(err))
            .catch((err) => next(err));
    });
   

module.exports = router;