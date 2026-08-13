import DistributorEnquiry from "../models/DistributorEnquiry.js";

/* =========================
   SUBMIT DISTRIBUTOR ENQUIRY
   (PUBLIC)
========================= */
export const submitDistributorEnquiry = async (req, res) => {
  try {
    await DistributorEnquiry.create(req.body);

    res.status(201).json({
      success: true,
      message: "Distributor enquiry submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
    });
  }
};

/* =========================
   ADMIN: GET ALL ENQUIRIES
========================= */
export const getDistributorEnquiries = async (req, res) => {
  const enquiries = await DistributorEnquiry.find().sort({
    createdAt: -1,
  });

  res.json(enquiries);
};

/* =========================
   ADMIN: UPDATE STATUS
========================= */
export const updateDistributorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: "Status is required" });
    }

    const enquiry = await DistributorEnquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

/* =========================
   ADMIN: DELETE ENQUIRY
========================= */
export const deleteDistributorEnquiry = async (req, res) => {
  try {
    const enquiry = await DistributorEnquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: "Enquiry not found" });
    }

    res.json({ success: true, id: req.params.id });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete enquiry" });
  }
};
