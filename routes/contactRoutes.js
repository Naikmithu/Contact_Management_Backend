const express = require("express");

const router = express.Router();

const {
  getContacts,
  getContact,
  createContact,
  UpdateContact,
  deleteContact,
} = require("../Controllers/contactController");
const validateToken = require("../middleware/validationError");
router.use(validateToken)
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(UpdateContact).delete(deleteContact);

module.exports = router;
