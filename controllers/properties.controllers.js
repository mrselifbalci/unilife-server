const PropertiesModel = require('../models/Properties.model');
const mongoose = require('mongoose');

exports.getAll =async (req,res)=>{
	try {
		const { page = 1, limit } = req.query;

		const data = await PropertiesModel.find()
		    .populate('city_id')
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })
		const total = await PropertiesModel.find().count();
		const pages = limit === undefined ? 1 : Math.ceil(total / limit);
		res.json({ total: total, pages, status: 200, data });
	} catch (error) {
		res.status(500).json(error);
	}
}
 
exports.create = async (req, res) => {
	const newPost = await new PropertiesModel({
		city_id: req.body.city_id,
		key_features: req.body.key_features,
		property_type: req.body.property_type,
		property_description: req.body.property_description,
        bedroom: req.body.bedroom,
        bathroom: req.body.bathroom,
        deposit: req.body.deposit,
        rent: req.body.rent,
        availability: req.body.availability,
        address: req.body.address,
        images: req.body.images,
	}); 

	newPost
		.save()
		.then((data) =>
			res.json({
				status: 200,
				message: 'New property is created successfully',
				data,
			})
		)
		.catch((err) => res.json({ status: false, message: err }));
};

exports.getSingleProperty = async (req, res) => { 	
	await PropertiesModel.findOne({ _id: req.params.id }, (err, data) => {
		if (err) {
			res.json({ message: err }); 
		} else {
			res.json(data)
			
		}   
	}).clone()
    .populate('city_id')
}



exports.getPropertiesByCityId = async (req, res) => {
	await PropertiesModel.find({ city_id: req.params.cityid }, (err, data) => { 
		if (err) {
			res.json({ status: false, message: err });
		} else {
			res.json({ status: 200, data });
		}
	}).clone()
	.populate('city_id')
};

exports.updateProperty = async (req, res) => {
	await PropertiesModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
		.then((data) => res.json({ message: 'Successfully updated', data }))
		.catch((err) => res.json({ message: err }));
};

exports.removeSingleProperty = async (req, res) => {
	await PropertiesModel.findByIdAndDelete({ _id: req.params.id })
	.then((data) => res.json(data))
	.catch((err) => res.json({ message: err }));
}; 
