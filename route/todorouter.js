const express = require('express');
const {
    getAllLists,
    createList,
    getSingleList,
    deleteList,
    deleteAllList,
    updateList
} = require('../connection/todoConnect');
const auth = require('../middleware/auth'); // import your auth middleware

const router = express.Router();

// ---------------- PROTECTED ROUTES ----------------
router.route('/lists')
    .get(auth, getAllLists) // only logged-in users can get their tasks
    .post(auth, createList) // only logged-in users can create tasks
    .delete(auth, deleteAllList) // only logged-in users can delete their tasks

router.route('/lists/:id')
    .get(auth, getSingleList) // only owner can access
    .delete(auth, deleteList) // only owner can delete
    .patch(auth, updateList); // only owner can update

module.exports = router;