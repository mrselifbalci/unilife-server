const mongoose = require('mongoose')
const CitiesModel = require('../models/Cities.model')

exports.getAllCities = async (req, res, next) => { 
    try {
		const { page = 1, limit } = req.query;

		const data = await CitiesModel.find()
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })
		const total = await CitiesModel.find().count();
		const pages = limit === undefined ? 1 : Math.ceil(total / limit);
		res.json({ total: total, pages, status: 200, data });
	} catch (error) {
		res.status(500).json(error);
	}
}

exports.create = async (req, res) => {
    const newCity = await new CitiesModel({
        name: req.body.name,
		city_description: req.body.city_description,
		image_url: req.body.image_url,
    })

    newCity.save((err, data) => {
        if(err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({
                message: 'City created',
                data
            })
        }
    })

}



exports.getSingleCity = async (req, res) => {
    await CitiesModel.findOne({_id: req.params.id}, (err, data) => {
        if(err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json(data)
        }
    }).clone()
}

exports.updateCity = async (req, res) => {
    await CitiesModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((data) => res.json({ message: 'Successfully updated', data }))
    .catch((err) => res.json({ message: err }));
}

exports.deleteCity = async (req, res) => {
    await CitiesModel.findByIdAndDelete({ _id: req.params.id })
	.then((data) => res.json(data))
	.catch((err) => res.json({ message: err }));
}