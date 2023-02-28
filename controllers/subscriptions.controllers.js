const mongoose = require('mongoose')
const SubscriptionsModel = require('../models/Subscriptions.model')

exports.getAllSubscriptions =async (req,res)=>{
	try {
		const { page = 1, limit } = req.query;
		const data = await SubscriptionsModel.find()
			.limit(limit * 1)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 })
		const total = await SubscriptionsModel.find().count();
		const pages = limit === undefined ? 1 : Math.ceil(total / limit);
		res.json({ total: total, totalPages:pages,currentPage:+page, status: 200, data });
	} catch (error) {
		res.status(500).json(error);
	}
}

exports.create = async (req, res) => {
    const newEmail = await new SubscriptionsModel({
        email: req.body.email
    })

    newEmail.save((err, data) => {
        if(err) {
            res.status(500).json({message: err})
        } else {
            res.status(200).json({
                message: 'new subscription created',
                data
            })
        }
    })

}



exports.getSingleSubscription = async (req, res) => {
	try {
	  const subscription = await SubscriptionsModel.findOne({ _id: req.params.id });
	  res.json(subscription);
	} catch (err) {
	  res.json({ message: err.message });
	}
  };
  


exports.updateSubscription = async (req, res) => {
    await SubscriptionsModel.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
    .then((data) => res.json({ message: 'Successfully updated', data }))
    .catch((err) => res.json({ message: err }));
}

exports.deleteSubscription = async (req, res) => {
    await SubscriptionsModel.findByIdAndDelete({ _id: req.params.id })
	.then((data) => res.json(data))
	.catch((err) => res.json({ message: err }));
}