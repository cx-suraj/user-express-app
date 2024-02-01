const multer = require("multer");
const customerModel = require("../models/customerModel");
const mongoose = require("mongoose");

const homepage = async (req, res) => {
  const messages = await req.flash("info");
  const locals = {
    title: "User Management System",
    description: "User Management System Node JS",
  };
  try {
    const customerData = await customerModel.find({}).limit(10);
    res.render("index", { locals, messages, customerData });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      success: true,
      result: error.messages,
    });
  }
};

const addCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer",
    description: "User Management System Node JS",
  };
  res.render("customer/addCustomerData.ejs", { locals });
};

const postCustomer = async (req, res) => {
  const newCustomer = new customerModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    tel: req.body.tel,
    email: req.body.email,
    details: req.body.details,
  });
  try {
    await customerModel.create(newCustomer);
    await req.flash("info", "New Customer has been added.");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const viewCustomerData = async (req, res) => {
  try {
    const customerData = await customerModel.findOne({ _id: req.params.id });
    const locals = {
      title: "Customer Data",
      description: "User Management System Node JS",
    };
    // console.log(customerData);
    res.render("customer/viewCustomerData", { customerData, locals });
  } catch (error) {
    console.log(error);
  }
};

const editCustomerData = async (req, res) => {
  try {
    const customerData = await customerModel.findOne({ _id: req.params.id });
    const locals = {
      title: "Edit Customer Data",
      description: "User Management System Node JS",
    };
    res.render("customer/editCustomerData", { customerData, locals });
  } catch (error) {
    console.log(error);
  }
};

const editPostCustomerData = async (req, res) => {
  try {
    await customerModel.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updateAt: Date.now(),
    });
    // await res.redirect(`/edit/${req.params.id}`);
    await res.redirect(`/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

const deleteCustomerData = async (req, res) => {
  try {
    await customerModel.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const searchCustomerData = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "User Management System Node JS",
  };
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
    const customerData = await customerModel.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });
    res.render("search", { customerData, locals });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  homepage,
  addCustomer,
  postCustomer,
  viewCustomerData,
  editCustomerData,
  editPostCustomerData,
  deleteCustomerData,
  searchCustomerData,
};
