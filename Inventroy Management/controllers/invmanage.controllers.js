const invmanage = require("../models/invmanage.model");

exports.addInvmanage = async (req, res) => {
  try {
    const record = await invmanage.create(req.body);
    res.status(201).json({ status: true, message: "InvMange Add Successfully......", data: record });
  }  catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
};

exports.viewInvManage = async (req, res) => {
  try {
    const records = await invmanage.find({});
    res.status(200).json({ status: true, data: records });
  }  catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
};

exports.getInvManageById = async (req, res) => {
  try {
    const record = await invmanage.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ status: false, error: "Data is not found please cheack....." });
    }
    res.status(200).json({ status: true, data: record });
  }  catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }
};

exports.updateInvManage = async (req, res) => {
  try {
    const record = await invmanage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!record) {
      return res.status(404).json({ status: false, error: "Data is not found please cheack..... " });
    }
    res.status(200).json({ status: true, message: "Data Updation Successfully....", data: record });
  } catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }          
};

exports.deleteInvManage = async (req, res) => {
  try {
    const record = await invmanage.findByIdAndDelete(req.params.id);
    if (!record) {
       res.status(404).json({ status: false, error: "Data is not found please cheack..... " });
    }
    res.status(200).json({ status: true, message: "Data deletion Successfully...." });
  }  catch (e) {
    res.status(400).json({
      status: false,
      error: "Something went wrong...",
      error_data: e,
    });
  }          
}


