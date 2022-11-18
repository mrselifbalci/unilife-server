const PropertiesModel = require('../models/Properties.model');
const mongoose = require('mongoose');
const CitiesModel = require('../models/Cities.model')

exports.getAll =async (req,res)=>{
	try {
		const { page = 1, limit } = req.query;

		const data = await PropertiesModel.find()
		    .populate('city_id','name')
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
        bedroom_count: req.body.bedroom_count,
        bathroom_count: req.body.bathroom_count,
        deposit: req.body.deposit,
        rent: req.body.rent,
        availability: req.body.availability,
        address: req.body.address,
        images: req.body.images,
		furnished:req.body.furnished,
		bedroom_prices:req.body.bedroom_prices
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

exports.createMany= async (req,res) => {
	
	  const propertiesArray = req.body;

	  const data = await PropertiesModel.insertMany(propertiesArray)
	  .then((data) =>  
		  res.json({
			  status: 200,
			  message: 'Multiple properties are created successfully',
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
	const{page=1,limit=10}=req.query
	const total = await PropertiesModel.find({ city_id: req.params.city_id }).countDocuments();
    const city = await CitiesModel.findById({ _id: req.params.city_id })
	const city_description = city.city_description
	await PropertiesModel.aggregate(
		[  
			{
				$match: {city_id: mongoose.Types.ObjectId(req.params.city_id)} 
			},
			{$sort:{createdAt: -1}},  
		    {$skip:(page - 1) * limit}, 
		    {$limit:limit*1},
			{
				$project:{
					// city_id:true,
		            key_features:true,
					property_type:true,
					property_description:true,
					bedroom_count:true,
					bathroom_count:true,
					deposit:true,
					rent:true,
					availability:true,
					address:true,
					images:true,
					furnished:true,
					bedroom_prices:true
				} 
			},
		
		],
		(err,response)=>{
		if(err)res.json(err);
		res.json({status: 200, total,city_description,response })
	}) 



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

exports.getWithQuery = async (req, res, next) => {
	const myRent = +req.body.query.rent
   if(!req.body.query.city_id){
	res.json({status:404,message:"Provide city id"}) 
   }else if(!myRent){
		try {
			const  query  = typeof req.body.query==="string" ?  JSON.parse(req.body.query) : req.body.query
			const response = await PropertiesModel.find(
			{$and:[
				{city_id:req.body.query.city_id},
				{bedroom_count:{$gte:req.body.query.bedroom_count}},
				{bathroom_count:{$gte:req.body.query.bathroom_count}}
			]}
			)
			res.json({status:200,message: 'Filtered Properties',count:response.length, response }); 
		} catch (error) {
			next({ status: 404, message: error });
		}
   }else{
		try {
			const  query  = typeof req.body.query==="string" ?  JSON.parse(req.body.query) : req.body.query
			const response = await PropertiesModel.find(
			 {$and:[{rent:{$lte:myRent}},
				{city_id:req.body.query.city_id},
				{bedroom_count:{$gte:req.body.query.bedroom_count}},
				{bathroom_count:{$gte:req.body.query.bathroom_count}}
			]}
			)
			res.json({status:200,message: 'Filtered Properties',count:response.length, response }); 
		} catch (error) {
			next({ status: 404, message: error });
		}
   }

};
 