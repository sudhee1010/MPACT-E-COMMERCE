// import Category from "../models/Category.js";

// export const createCategory = async (req, res) => {
//   const { name } = req.body;

//   const exists = await Category.findOne({ name });
//   if (exists) {
//     return res.status(400).json({ message: "Category already exists" });
//   }

//   const category = await Category.create({ name });
//   res.status(201).json(category);
// };


// export const getCategories = async (req, res) => {
//   const categories = await Category.find({ isActive: true }).sort("name");
//   res.json(categories);
// };


// export const updateCategory = async (req, res) => {
//   const category = await Category.findById(req.params.id);

//   if (!category) {
//     return res.status(404).json({ message: "Category not found" });
//   }

//   category.name = req.body.name || category.name;
//   await category.save();

//   res.json(category);
// };


// export const deleteCategory = async (req, res) => {
//   const category = await Category.findById(req.params.id);

//   if (!category) {
//     return res.status(404).json({ message: "Category not found" });
//   }

//   category.isActive = false;
//   await category.save();

//   res.json({ message: "Category removed" });
// };

import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // const exists = await Category.findOne({ name });
    const exists = await Category.findOne({
  name: { $regex: `^${name}$`, $options: "i" }
});

    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort("name");
    res.json(categories);
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.name = req.body.name || category.name;
    await category.save();

    res.json(category);
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ message: "Failed to update category" });
  }

  const duplicate = await Category.findOne({
  _id: { $ne: req.params.id },
  name: { $regex: `^${req.body.name}$`, $options: "i" }
});

if (duplicate) {
  return res.status(400).json({ message: "Category name already exists" });
}


};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.isActive = false;
    await category.save();

    res.json({ message: "Category removed" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
