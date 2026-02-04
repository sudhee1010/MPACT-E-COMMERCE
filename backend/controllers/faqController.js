// import Faq from "../models/Faq.js";

// /* CREATE FAQ (Admin) */
// export const createFaq = async (req, res) => {
//   try {
//     const { question, answer } = req.body;

//     const faq = await Faq.create({ question, answer });

//     res.status(201).json({
//       success: true,
//       message: "FAQ created successfully",
//       faq,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* GET ALL FAQs (User side – grouped) */
// export const getFaqs = async (req, res) => {
//   try {
//     const faqs = await Faq.find({ isActive: true }).sort({ createdAt: 1 });

//     // Group by category
//     // const groupedFaqs = faqs.reduce((acc, faq) => {
//     //   acc[faq.category] = acc[faq.category] || [];
//     //   acc[faq.category].push({
//     //     q: faq.question,
//     //     a: faq.answer,
//     //   });
//     //   return acc;
//     // }, {});

//     res.json(groupedFaqs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* ADMIN – GET ALL FAQs */
// export const getAllFaqsAdmin = async (req, res) => {
//   try {
//     const faqs = await Faq.find().sort({ createdAt: -1 });
//     res.json(faqs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* UPDATE FAQ */
// export const updateFaq = async (req, res) => {
//   try {
//     const faq = await Faq.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json({
//       success: true,
//       message: "FAQ updated",
//       faq,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// /* DELETE FAQ */
// export const deleteFaq = async (req, res) => {
//   try {
//     await Faq.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "FAQ deleted" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


import Faq from "../models/Faq.js";

/* ================= CREATE FAQ (ADMIN) ================= */
export const createFaq = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and Answer are required",
      });
    }

    const faq = await Faq.create({ question, answer });

    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      faq,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET FAQs (USER SIDE) ================= */
export const getFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find({ isActive: true })
      .sort({ createdAt: 1 })
      .select("question answer");

    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL FAQs (ADMIN) ================= */
export const getAllFaqsAdmin = async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: -1 });
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE FAQ ================= */
export const updateFaq = async (req, res) => {
  try {
    const { question, answer, isActive } = req.body;

    const faq = await Faq.findByIdAndUpdate(
      req.params.id,
      { question, answer, isActive },
      { new: true }
    );

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json({
      success: true,
      message: "FAQ updated successfully",
      faq,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE FAQ ================= */
export const deleteFaq = async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
