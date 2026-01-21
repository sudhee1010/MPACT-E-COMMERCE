import About from "../models/About.js";

/* GET ABOUT PAGE */
export const getAbout = async (req, res) => {
  const about = await About.findOne();
  res.json(about);
};


export const updateHeroTitle = async (req, res, next) => {
  try {
    const { heroTitle } = req.body;

    // 🔒 Validation: hero title is mandatory
    if (!heroTitle || heroTitle.trim() === "") {
      return res.status(400).json({
        message: "Hero title is required"
      });
    }

    // 🔥 Add or Update hero title (UPSERT)
    const about = await About.findOneAndUpdate(
      {},
      {
        $set: {
          heroTitle: heroTitle.trim()
        }
      },
      {
        new: true,
        upsert: true   // ✅ creates About doc if not exists
      }
    );

    res.status(200).json({
      message: "Hero title saved successfully",
      heroTitle: about.heroTitle
    });
  } catch (error) {
    next(error);
  }
};



/* ADD HIGHLIGHT */
export const addHighlight = async (req, res) => {
  const about = await About.findOne();
  about.highlights.push({ text: req.body.text });
  await about.save();
  res.json(about);
};

/* DELETE HIGHLIGHT */
export const deleteHighlight = async (req, res, next) => {
  try {
    const { id } = req.params;

    const about = await About.findOneAndUpdate(
      {},
      {
        $pull: {
          highlights: { _id: id }
        }
      },
      { new: true }
    );

    if (!about) {
      return res.status(404).json({ message: "About data not found" });
    }

    res.json({
      message: "Highlight removed successfully",
      highlights: about.highlights
    });
  } catch (error) {
    next(error);
  }
};


/* ADD VIDEO */
export const addVideo = async (req, res) => {
  const about = await About.findOne();
  about.videos.push({ videoUrl: req.file.path });
  await about.save();
  res.json(about);
};

/* DELETE VIDEO */
export const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const about = await About.findOneAndUpdate(
      {},
      {
        $pull: {
          videos: { _id: id }
        }
      },
      { new: true }
    );

    if (!about) {
      return res.status(404).json({ message: "About data not found" });
    }

    res.json({
      message: "Video removed successfully",
      videos: about.videos
    });
  } catch (error) {
    next(error);
  }
};


export const updateKnowMore = async (req, res, next) => {
  try {
    const updateData = {};

    if (req.body.sectionTitle) {
      updateData["knowMore.sectionTitle"] = req.body.sectionTitle;
    }

    if (req.body.heading) {
      updateData["knowMore.heading"] = req.body.heading;
    }

    if (req.body.imageHeading !== undefined) {
      updateData["knowMore.imageHeading"] = req.body.imageHeading;
    }

    if (req.body.description) {
      updateData["knowMore.description"] = req.body.description;
    }

    if (req.file) {
      updateData["knowMore.image"] = req.file.path;
    }

    const about = await About.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true }
    );

    res.json({
      message: "Know More updated successfully",
      knowMore: about.knowMore
    });
  } catch (error) {
    next(error);
  }
};



/* DELETE KNOW MORE IMAGE */
export const deleteKnowMoreImage = async (req, res, next) => {
  try {
    const about = await About.findOneAndUpdate(
      {},
      {
        $set: {
          "knowMore.image": ""
        }
      },
      { new: true }
    );

    if (!about) {
      return res.status(404).json({ message: "About data not found" });
    }

    res.json({
      message: "Know more image deleted successfully",
      knowMore: about.knowMore
    });
  } catch (error) {
    next(error);
  }
};
