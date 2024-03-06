// contains all the logic of requests

//desc get all contacts
//route get /api/contacts
//access private
const asyncHandler = require("express-async-handler"); //handls expeceptions
const Contact = require("../models/contactModels");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//desc get indivudial contacts
//route get /api/contacts/:id
//access private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }
  res.status(200).json(contact);
});

//desc create contacts
//route post     /api/contacts
//access private

const createContact = asyncHandler(async (req, res) => {
  const { name, Phone, email } = req.body;
  if (!name || !Phone || !email) {
    res.status(400);
    throw new Error("All Fields are Mandatory");
  }

  const contact = await Contact.create({
    name,
    Phone,
    email,
    user_id: req.user.id,
  });

  res.status(201).json(contact);
});

//desc update contacts
//route put /api/contacts
//access private

const UpdateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  const updateContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,

    { new: true }
  );
  res.status(200).json(updateContact);
});

//desc delete contacts
//route delete /api/contacts/:id
//access private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact Not Found");
  }

  await Contact.deleteOne();
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  UpdateContact,
  deleteContact,
};
