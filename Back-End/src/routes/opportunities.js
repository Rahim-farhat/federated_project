import express from 'express';
import { opportunitiesModel } from '../models/Opportunities.js';
import mongoose from 'mongoose';
import { UserModel } from '../models/Users.js';
import { verifyToken } from './users.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await opportunitiesModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
/*
router.post('/', async (req, res) => {
  const opportunity = new opportunitiesModel(req.body);
  try {
    const response = await opportunity.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});
*/
router.post('/', verifyToken, async (req, res) => {
  const opportunity = new opportunitiesModel({
    _id: new mongoose.Types.ObjectId(),
    oppname: req.body.oppname,
    imageUrl: req.body.imageUrl,
    duration: req.body.duaration,
    companyName: req.body.companyName,
    details: req.body.details,
    Email: req.body.Email,
    userOwner: req.body.userOwner,
  });
  console.log(opportunity);

  try {
    const result = await opportunity.save();
    res.status(201).json({
      createdOpportunity: {
        oppname: result.oppname,
        duration: result.duration,
        companyName: result.companyName,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:opportunityId', async (req, res) => {
  try {
    const result = await opportunitiesModel.findById(req.params.opportunityId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/', async (req, res) => {
  const opportunity = await opportunitiesModel.findById(req.body.opportunityID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedOpp.push(opportunity);
    await user.save();
    res.status(201).json({ savedOpp: user.savedOpp });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/savedOpportunities/ids/:userId', async (req, res) => {
  try {
    console.log('trying to get 1');
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedOpp: user?.savedOpp });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/savedOpportunities/:userId', async (req, res) => {
  try {
    console.log('trying to get 2');
    const user = await UserModel.findById(req.params.userId);
    const savedOpp = await opportunitiesModel.find({
      _id: { $in: user.savedOpp },
    });

    console.log(savedOpp);
    res.status(201).json({ savedOpp });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as opportunitiesRouter };
