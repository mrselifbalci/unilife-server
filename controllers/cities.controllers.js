const mongoose = require('mongoose')
const CitiesModel = require('../models/Cities.model')

exports.getAllCities = async (req, res, next) => { 
	const{page=1,limit=10}=req.query
	const total = await CitiesModel.find().countDocuments();
	await CitiesModel.aggregate(
	[ 
		 {$sort:{createdAt: -1} },
		 {$skip:(page - 1) * limit},
		 {$limit:limit*1}, 
		 {
            $lookup:{
				from:'properties',
				localField:"_id",
				foreignField:'city_id',
				as:'property_count'
			}, 
			
		}, 
		{
			$addFields: { property_count: { $size: "$property_count" } }  
		},
		{
			$project:{
				name:true,universities:true,student_life:true,image_url:true,property_count:true,
                createdAt:true,updatedAt:true
			} 
		},
	
	],
	(err,response)=>{
	if(err)res.json(err);
	const pages = limit === undefined ? 1 : Math.ceil(total / limit);
	res.json({ total,totalPages:pages,currentPage:+page,status: 200, response })
}) 
}

exports.create = async (req, res) => {
    const newCity = await new CitiesModel({
        name: req.body.name,
		universities:req.body.universities,
		student_life:req.body.student_life,
		image_url: req.body.image_url,
    })

    newCity.save((err, data) => {
        if(err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({
                message: 'new city created',
                data
            })
        }
    })

}



exports.getSingleCity = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		res.json({message:"Invalid city id"})
		return;
	  }

	await CitiesModel.aggregate(
		[
			{
				$match: { _id: mongoose.Types.ObjectId(req.params.id) }
			},
			{$sort:{createdAt: -1} },
			{
			   $lookup:{
				   from:'properties',
				   localField:"_id",
				   foreignField:'city_id',
				   as:'property_count'
			   }, 
			   
		   }, 
		   {
			   $addFields: { property_count: { $size: "$property_count" } }  
		   },
		   {
			   $project:{
				   name:true,universities:true,student_life:true,image_url:true,property_count:true,
				   createdAt:true,updatedAt:true
			   } 
		   },
		],
		(err,data)=>{ 
			if(err)res.json(err);
			res.json({data})
		})
}


exports.updateCity = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		res.json({message:"Invalid city id"})
		return;
	  }
    await CitiesModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((data) => res.json({ message: 'Successfully updated', data }))
    .catch((err) => res.json({ message: err }));
}

exports.deleteCity = async (req, res) => {
	if (!ObjectId.isValid(req.params.id)) {
		res.json({message:"Invalid city id"})
		return;
	  }
    await CitiesModel.findByIdAndDelete({ _id: req.params.id })
	.then((data) => res.json(data))
	.catch((err) => res.json({ message: err }));
}