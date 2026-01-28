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
  const enquiry = await DistributorEnquiry.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );

  res.json(enquiry);
};
