'use strict';

var PersonModel = require('../../../models/evento');

module.exports = function (router) {

    router.get('/:id', function (req, res) {

        var personId = req.params.id;

        PersonModel.findOne({_id: personId})
        .populate('user')
        .exec(function (err, person) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            if (!person) {
                return res.status(404).end();
            }
            res.status(200).json(person).end();
        });

    });

    router.get('/', function (req, res) {

        PersonModel.find()
        .populate('user')
        .exec(function (err, person) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            if (!person) {
                return res.status(404).end();
            }
            res.status(200).json(person).end();
        });

    });

    router.post('/', function (req, res) {

        var data = req.body;

        var newPerson = new PersonModel(data);

        newPerson.save(function (err, personCreated) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }
            res.status(201).json(personCreated).end();
        });

    });

    router.put('/:id', function (req, res) {

        var data = req.body;
        var personId = req.params.id;

        PersonModel.findOne({_id: personId}, function (err, personToUpdate) {
            if (err) {
                return res.status(500).json({error: err}).end();
            }

            mapPersonDataToUpdate(personToUpdate, data);
            personToUpdate.save(function (err, personToUpdate) {
                if (err) {
                    return res.status(500).json({error: err}).end();
                }
                res.status(201).json(personToUpdate).end();
            });
        });

    });

    router.delete('/:id', function (req, res) {

        var personId = req.params.id;

        PersonModel.remove({_id: personId}, function (err) {
            if (err) {
                res.status(500).json({error: err}).end();
            }

            res.status(204).end();
        });

    });

    function mapPersonDataToUpdate(personToUpdate, data) {

        personToUpdate.hr = data.hr || personToUpdate.hr;
        personToUpdate.categoria = data.categoria || personToUpdate.categoria;
        personToUpdate.day = data.day || personToUpdate.day;
        personToUpdate.desc = data.desc || personToUpdate.desc;

        return personToUpdate;

    };

};
