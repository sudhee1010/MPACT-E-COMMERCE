import Address from "../models/Address.js";

// CREATE OR UPDATE ADDRESS
export const saveAddress = async (req, res, next) => {
  try {
    const existing = await Address.findOne({ userId: req.user._id });

    if (existing) {
      const updated = await Address.findByIdAndUpdate(
        existing._id,
        req.body,
        { new: true }
      );

      return res.json({
        success: true,
        message: "Address updated successfully",
        address: updated
      });
    }

    const address = await Address.create({
      userId: req.user._id,
      ...req.body
    });

    res.status(201).json({
      success: true,
      message: "Address saved successfully",
      address
    });
  } catch (error) {
    next(error);
  }
};

// GET LOGGED-IN USER ADDRESS
export const getMyAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ userId: req.user._id });

    if (!address) {
      res.status(404);
      throw new Error("Address not found");
    }

    res.json(address);
  } catch (error) {
    next(error);
  }
};

// ADMIN → GET ALL ADDRESSES
export const getAllAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.find()
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.json({
      count: addresses.length,
      addresses
    });
  } catch (error) {
    next(error);
  }
};
