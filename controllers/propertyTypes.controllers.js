const mongoose = require('mongoose')
const PropertyTypesModel = require('../models/PropertyTypes.model')

exports.getAll = async (req, res, next) => { 
	const{page=1,limit=10}=req.query
	const total = await PropertyTypesModel.find().countDocuments();
	await PropertyTypesModel.aggregate(
	[ 
		 {$sort:{createdAt: -1} },
		 {$skip:(page - 1) * limit},
		 {$limit:limit*1}, 
		 {
            $lookup:{
				from:'properties',
				localField:"name",
				foreignField:'property_type',
				as:'property_count'
			}, 
			
		}, 
		{
			$addFields: { property_count: { $size: "$property_count" } }  
		},
		{
			$project:{
				name:true,property_count:true,_id:false
			} 
		},
	
	],
	(err,response)=>{
	if(err)res.json(err);
	const pages = limit === undefined ? 1 : Math.ceil(total / limit);
	res.json({ total,totalPages:pages,currentPage:+page, status: 200, response })
}) 
}

exports.create = async (req, res) => {
    const newType = await new PropertyTypesModel({
        name: req.body.name,
    })

    newType.save((err, data) => {
        if(err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({
                message: 'new type created',
                data
            })
        }
    })

}



exports.deleteType = async (req, res) => {
    await PropertyTypesModel.findByIdAndDelete({ _id: req.params.id })
	.then((data) => res.json(data))
	.catch((err) => res.json({ message: err }));
}