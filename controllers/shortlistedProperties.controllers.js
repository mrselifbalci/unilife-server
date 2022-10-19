const ShortlistedPropertiesModel = require('../models/ShortlistedProperties.model');
const UserModel = require('../models/Users.model');
const mongoose = require('mongoose');
require('dotenv').config();

 
exports.getAllShortlistedProperties = async (req, res) => {
	const{page=1,limit=10}=req.query
	const total = await ShortlistedPropertiesModel.find().countDocuments();
	await ShortlistedPropertiesModel.aggregate(
	[
		{
			$sort:
			{
			 createdAt: -1
			} 
		},
		{
			 $skip:(page - 1) * limit 
		},
		{
			 $limit:limit*1 
		},   
		{
			$project:{
				property_id:true,user_id:true,createdAt:true,updatedAt:true
			}
		},
	],
	(err,data)=>{
	if(err)res.json(err);
	const pages = limit === undefined ? 1 : Math.ceil(total / limit);
	res.json({ total,pages, status: 200, data })
}) 
};


  
exports.getShortlistedPropertiesByUserId = async (req, res) => { 
	await ShortlistedPropertiesModel.aggregate(
		[
			{
				$match: { user_id: mongoose.Types.ObjectId(req.params.userid) }
			},
			{
				$sort:
				{
				 createdAt: -1
				} 
			}, 
            {
            $lookup:{ 
				from:'properties',
				let:{"property_id":"$property_id"},
				pipeline:[
					{$match:{$expr:{$eq:["$_id","$$property_id"]}}},
                    {$project:{
                        property_type:1,bedroom_count:1,bathroom_count:1,
                        rent:1,adress:1,images:1,furnished:1
					}},
				],
				as:'property_details' 
			} 
		    },
			{
				$project:{
					property_details:true,_id:false
				}
			},
		],
		(err,favorites)=>{ 
		if(err)res.json(err);
		res.json({favorites})
	}) 

};





exports.createShortlistedProperty = async (req, res) => {
	const { 
		property_id,
		user_id
	} = req.body;
	if(user_id && property_id){
		await ShortlistedPropertiesModel.find({property_id:req.body.property_id,user_id:req.body.user_id})
		.populate('property_id') 
		.then(async data=>{ 
			if(data.length>0){ 
                ShortlistedPropertiesModel.findByIdAndDelete({ _id: data[0]._id })
                .then((data) => res.json({ status: 200,message:"Removed from shortlist", data }))
                .catch((err) => res.json({ status: false, message: err }));
			}else{ 
				const newUserFavorite = await new ShortlistedPropertiesModel({
					property_id,
					user_id
				});
				newUserFavorite
					.save()
					.then((response) => res.json(response))
					.catch((err) => res.json(err));
			}
		})
	}

};

 
exports.checkExistence = async (req, res, next) => {
	console.log(req.body)
			try {
				const response = await ShortlistedPropertiesModel.findOne({ "user_id": req.body.user_id,"property_id":req.body.property_id} )
				res.json(response); 
			} catch (error) {
				next({ status: 404, message: error });
			}   
};
  
 

exports.updateShortlistedProperty = async (req, res) => {
	await ShortlistedPropertiesModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
		.then((data) => res.json({ message: 'Successfully updated', data }))
		.catch((err) => res.json({ message: err }));
};


exports.deleteShortlistedProperty = async (req, res) => {
	await ShortlistedPropertiesModel.findByIdAndDelete({ _id: req.params.id })
	.then((data) => res.json(data))
	.catch((err) => res.json({ message: err }));
};

