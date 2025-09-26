const express = require('express');
const {
    getAllLists,
    createList,
    getSingleList,
    deleteList,
    deleteAllList,
    updateList
} = require('../connection/connect');
const router = express.Router();
router.route('').get(getAllLists).post(createList).delete(deleteAllList)
router.route('/:id').get(getSingleList).delete(deleteList).patch(updateList)
module.exports = router