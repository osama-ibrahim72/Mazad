const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const User = require('../models/userModel');





exports.getPoint = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const point = await User.findById(id);
    if (point) {
        res.status(200).json({data : point.point});
    } else {
        res.status(500);
    }
})

exports.updatePoint = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const amount = req.body.amount;
    const point = await Point.findOne({seller :id});
    if (point) {
        point.amount += amount;
        await point.save();
        res.status(200).json({data : point});
    } else {
        res.status(404);
    }
})

