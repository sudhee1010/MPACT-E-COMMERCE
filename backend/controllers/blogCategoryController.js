import BlogCategory from "../models/BlogCategory.js";
import slugify from "slugify";

/* CREATE CATEGORY (ADMIN) */
export const createCategory = async (req, res) => {
    console.log("hg");
    
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Category name required" });
  }

  const category = await BlogCategory.create({
    name,
    slug: slugify(name, { lower: true }),
  });

  res.status(201).json(category);
};

/* GET ALL CATEGORIES (PUBLIC) */
export const getAllCategories = async (req, res) => {
  const categories = await BlogCategory.find({ isActive: true }).sort({
    name: 1,
  });

  res.json(categories);
};
