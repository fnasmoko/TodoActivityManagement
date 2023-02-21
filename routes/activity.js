const express = require('express');
const bodyParser = require('body-parser');
const {getActivity, getActivityByID, addActivity, updateActivity, deleteActivityByID} = require('../controller/activity')
const router = express.Router();

router.use(bodyParser.json());

router.get('/', getActivity)
router.get('/:id', getActivityByID)

router.post('/', addActivity)

router.patch('/:id', updateActivity)

router.delete('/:id', deleteActivityByID)


module.exports = router;