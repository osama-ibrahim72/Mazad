const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');
const Point = require('../models/pointModel');




exports.getPoint = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const point = await Point.findOne({seller :id});
    if (point) {
        res.status(200).json({data : point});
    } else {
        res.status(404);
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

