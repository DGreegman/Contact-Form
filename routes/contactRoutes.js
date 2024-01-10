const express = require('express')
const { getContact, createContact, getAContact, updateContact, deleteContact } = require('../controllers/contactControllers')
const validateToken = require('../middleware/validateTokenHandler')
const router = express.Router()

router.use(validateToken)
router.route("/").get(getContact).post(createContact)

router.route("/:id").get(getAContact).put(updateContact).delete(deleteContact)

module.exports = router