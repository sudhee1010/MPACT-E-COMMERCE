import TopOffer from "../models/Topoffer.js";

// @desc  Get all active top offers (public)
// @route GET /api/topoffers
export const getTopOffers = async (req, res) => {
  try {
    const offers = await TopOffer.find({ isActive: true }).sort({ order: 1, createdAt: 1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc  Get all top offers (admin — includes inactive)
// @route GET /api/topoffers/admin
export const getAllTopOffersAdmin = async (req, res) => {
  try {
    const offers = await TopOffer.find().sort({ order: 1, createdAt: 1 });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc  Create a top offer
// @route POST /api/topoffers
export const createTopOffer = async (req, res) => {
  try {
    const { text, isActive, order } = req.body;
    if (!text) return res.status(400).json({ message: "Text is required" });

    const offer = await TopOffer.create({ text, isActive, order });
    res.status(201).json(offer);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc  Update a top offer
// @route PUT /api/topoffers/:id
export const updateTopOffer = async (req, res) => {
  try {
    const offer = await TopOffer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    const { text, isActive, order } = req.body;
    if (text !== undefined) offer.text = text;
    if (isActive !== undefined) offer.isActive = isActive;
    if (order !== undefined) offer.order = order;

    const updated = await offer.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc  Delete a top offer
// @route DELETE /api/topoffers/:id
export const deleteTopOffer = async (req, res) => {
  try {
    const offer = await TopOffer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: "Offer not found" });

    await offer.deleteOne();
    res.json({ message: "Offer deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};