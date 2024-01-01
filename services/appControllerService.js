const asyncHandler = require('express-async-handler');

const factory = require('./handlersFactory');
const AppCotroller = require('../models/appControllerModel');


exports.getControllers = factory.getAll(AppCotroller);
exports.getController = factory.getOne(AppCotroller);
exports.addControllers = factory.createOne(AppCotroller);
exports.updateControllers = factory.updateOne(AppCotroller);

exports.getTerms = asyncHandler(async (req, res) =>{
    const controller = await AppCotroller.findOne({git:75});
    res.status(200).json({"terms": controller.termsUser});
});

exports.getPrivacy = asyncHandler(async (req, res) =>{
    const controller = await AppCotroller.findOne({git:75});
    res.status(200).json({data: controller.privacyUser});
});


exports.updateTerms = asyncHandler(async (req, res)=>{
    const terms = req.body.termsUser;
    const controller = await AppCotroller.findOne({git:75});
    controller.termsUser = terms;
    controller.save();
    res.status(200).json({"terms": controller.termsUser});
});

exports.updatePrivacy = asyncHandler(async (req, res)=>{
    const privacy = req.body.privacy;
    const controller = await AppCotroller.findOne({git:75});
    controller.privacyUser = privacy;
    controller.save();
    res.status(200).json({"privacy": controller.privacyUser});
});

