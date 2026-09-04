// // import Category from "../models/Category.js";

// // export const createCategory = async (req, res) => {
// //   const { name } = req.body;

// //   const exists = await Category.findOne({ name });
// //   if (exists) {
// //     return res.status(400).json({ message: "Category already exists" });
// //   }

// //   const category = await Category.create({ name });
// //   res.status(201).json(category);
// // };


// // export const getCategories = async (req, res) => {
// //   const categories = await Category.find({ isActive: true }).sort("name");
// //   res.json(categories);
// // };


// // export const updateCategory = async (req, res) => {
// //   const category = await Category.findById(req.params.id);

// //   if (!category) {
// //     return res.status(404).json({ message: "Category not found" });
// //   }

// //   category.name = req.body.name || category.name;
// //   await category.save();

// //   res.json(category);
// // };


// // export const deleteCategory = async (req, res) => {
// //   const category = await Category.findById(req.params.id);

// //   if (!category) {
// //     return res.status(404).json({ message: "Category not found" });
// //   }

// //   category.isActive = false;
// //   await category.save();

// //   res.json({ message: "Category removed" });
// // };

// import Category from "../models/Category.js";

// export const createCategory = async (req, res) => {
//   try {
//     const { name } = req.body;

//     // const exists = await Category.findOne({ name });
//     const exists = await Category.findOne({
//   name: { $regex: `^${name}$`, $options: "i" }
// });

//     if (exists) {
//       return res.status(400).json({ message: "Category already exists" });
//     }

//     const category = await Category.create({ name });
//     res.status(201).json(category);
//   } catch (error) {
//     console.error("Create Category Error:", error);
//     res.status(500).json({ message: "Failed to create category" });
//   }
// };

// export const getCategories = async (req, res) => {
//   try {
//     const categories = await Category.find({ isActive: true }).sort("name");
//     res.json(categories);
//   } catch (error) {
//     console.error("Get Categories Error:", error);
//     res.status(500).json({ message: "Failed to fetch categories" });
//   }
// };

// export const updateCategory = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     category.name = req.body.name || category.name;
//     await category.save();

//     res.json(category);
//   } catch (error) {
//     console.error("Update Category Error:", error);
//     res.status(500).json({ message: "Failed to update category" });
//   }

//   const duplicate = await Category.findOne({
//   _id: { $ne: req.params.id },
//   name: { $regex: `^${req.body.name}$`, $options: "i" }
// });

// if (duplicate) {
//   return res.status(400).json({ message: "Category name already exists" });
// }


// };

// export const deleteCategory = async (req, res) => {
//   try {
//     const category = await Category.findById(req.params.id);

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     category.isActive = false;
//     await category.save();

//     res.json({ message: "Category removed" });
//   } catch (error) {
//     console.error("Delete Category Error:", error);
//     res.status(500).json({ message: "Failed to delete category" });
//   }
// };



import Category from "../models/Category.js";
import { deleteFromCloudflare } from "../config/cloudflare.js";

export const createCategory = async (req, res) => {
  try {
    const { name, description, isActive = true } = req.body;

    // Case-insensitive duplicate check
    const exists = await Category.findOne({
      name: { $regex: `^${name}$`, $options: "i" }
    });

    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    let imageData = {};
    
    // Handle image upload if present
    if (req.file) {
      imageData = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    const category = await Category.create({
      name,
      description,
      image: imageData,
      isActive
    });
    
    res.status(201).json(category);
  } catch (error) {
    console.error("Create Category Error:", error);
    res.status(500).json({ message: "Failed to create category" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .sort("name")
      .lean();
    
    // Get product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const Product = (await import("../models/Product.js")).default;
        const productCount = await Product.countDocuments({ 
          category: category._id,
          isActive: true 
        });
        return {
          ...category,
          productCount
        };
      })
    );
    
    res.json(categoriesWithCount);
  } catch (error) {
    console.error("Get Categories Error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const getAdminCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
      .sort("name")
      .lean();
    
    // Get product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const Product = (await import("../models/Product.js")).default;
        const productCount = await Product.countDocuments({ 
          category: category._id 
        });
        return {
          ...category,
          productCount
        };
      })
    );
    
    res.json(categoriesWithCount);
  } catch (error) {
    console.error("Get Admin Categories Error:", error);
    res.status(500).json({ message: "Failed to fetch categories" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description, isActive } = req.body;
    const categoryId = req.params.id;

    // Find category
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check for duplicate name (excluding current category)
    if (name) {
      const duplicate = await Category.findOne({
        _id: { $ne: categoryId },
        name: { $regex: `^${name}$`, $options: "i" }
      });

      if (duplicate) {
        return res.status(400).json({ message: "Category name already exists" });
      }
      category.name = name;
    }

    // Update other fields
    if (description !== undefined) category.description = description;
    if (isActive !== undefined) category.isActive = isActive;

    // Handle image upload if new image provided
    if (req.file) {
      // Delete old image from R2 if it exists
      if (category.image?.publicId) {
        await deleteFromCloudflare(category.image.publicId);
      }

      // Upload new image
      category.image = {
        url: req.file.path,
        publicId: req.file.filename
      };
    }

    await category.save();
    res.json(category);
  } catch (error) {
    console.error("Update Category Error:", error);
    res.status(500).json({ message: "Failed to update category" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if category has products
    const Product = (await import("../models/Product.js")).default;
    const productCount = await Product.countDocuments({ 
      category: category._id 
    });

    if (productCount > 0) {
      return res.status(400).json({ 
        message: "Cannot delete category with products",
        productCount 
      });
    }

    // Delete image from R2 if it exists
    if (category.image?.publicId) {
      await deleteFromCloudflare(category.image.publicId);
    }

    // Hard delete the category
    await Category.findByIdAndDelete(req.params.id);

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete Category Error:", error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};

export const toggleCategoryStatus = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    category.isActive = !category.isActive;
    await category.save();

    res.json({ 
      message: `Category ${category.isActive ? 'activated' : 'deactivated'}`,
      category 
    });
  } catch (error) {
    console.error("Toggle Category Status Error:", error);
    res.status(500).json({ message: "Failed to update category status" });
  }
};
