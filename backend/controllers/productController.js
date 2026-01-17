// import Product from "../models/Product.js";

// // @desc    Get all products (with search & filter)
// // @route   GET /api/products
// export const getProducts = async (req, res) => {
//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: "i"
//         }
//       }
//     : {};

//   const products = await Product.find({ ...keyword, isActive: true })
//     .populate("category", "name")
//     .sort({ createdAt: -1 });

//   res.json(products);
// };

// // @desc    Get single product
// // @route   GET /api/products/:id
// export const getProductById = async (req, res) => {
//   const product = await Product.findById(req.params.id).populate(
//     "category",
//     "name"
//   );

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   res.json(product);
// };

// // @desc    Create product (Admin)
// // @route   POST /api/products
// export const createProduct = async (req, res) => {
//   const product = new Product(req.body);
//   const createdProduct = await product.save();
//   res.status(201).json(createdProduct);
// };

// // @desc    Update product (Admin)
// // @route   PUT /api/products/:id
// export const updateProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   Object.assign(product, req.body);
//   const updatedProduct = await product.save();
//   res.json(updatedProduct);
// };

// // @desc    Delete product (Admin)
// // @route   DELETE /api/products/:id
// export const deleteProduct = async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   await product.deleteOne();
//   res.json({ message: "Product removed" });
// };











/**
 * @desc    Get all products (search + only active)
 * @route   GET /api/products
 * @access  Public
 */
// export const getProducts = async (req, res) => {
//   const keyword = req.query.keyword
//     ? {
//         name: {
//           $regex: req.query.keyword,
//           $options: "i"
//         }
//       }
//     : {};

//   const products = await Product.find({
//     ...keyword,
//     isActive: true
//   })
//     .populate({
//       path: "category",
//       match: { isActive: true },
//       select: "name"
//     })
//     .sort({ createdAt: -1 });

//   res.json(products);
// };








import Product from "../models/Product.js";
import Category from "../models/Category.js";
import cloudinary from "../config/cloudinary.js";


export const getProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      rating,
      limit = 10,
      cursor
    } = req.query;

    const filter = { isActive: true };

    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    if (category) filter.category = category;

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 🔥 Cursor logic
    if (cursor) {
      filter.createdAt = { $lt: new Date(cursor) };
    }

    const pageSize = Number(limit) + 1;

    const products = await Product.find(filter)
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .limit(pageSize);

    const hasNextPage = products.length > limit;
    if (hasNextPage) products.pop();

    const nextCursor = hasNextPage
      ? products[products.length - 1].createdAt
      : null;

    res.json({
      products,
      pageInfo: {
        hasNextPage,
        nextCursor
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




/**
 * @desc    Get single product
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true
    }).populate("category", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Create product
 * @route   POST /api/products
 * @access  Admin
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      highlights,
      category,
      originalPrice,
      price,
      images,
      countInStock
    } = req.body;

    const categoryExists = await Category.findOne({
      _id: category,
      isActive: true
    });

    if (!categoryExists) {
      return res.status(400).json({ message: "Invalid category" });
    }

    if (price > originalPrice) {
      return res
        .status(400)
        .json({ message: "Price cannot exceed original price" });
    }

    const discountPercent =
      originalPrice > price
        ? Math.round(
          ((originalPrice - price) / originalPrice) * 100
        )
        : 0;

    const product = await Product.create({
      name,
      description,
      highlights,
      category,
      originalPrice,
      price,
      discountPercent,
      images,
      countInStock
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Admin
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ If category is updated, validate it
    if (req.body.category) {
      const categoryExists = await Category.findOne({
        _id: req.body.category,
        isActive: true
      });

      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category" });
      }
    }

    Object.assign(product, req.body);
    if (
      req.body.originalPrice !== undefined ||
      req.body.price !== undefined
    ) {
      const original =
        req.body.originalPrice ?? product.originalPrice;
      const selling = req.body.price ?? product.price;

      product.discountPercent =
        original > selling
          ? Math.round(((original - selling) / original) * 100)
          : 0;
    }

    const updatedProduct = await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete product (Soft delete)
 * @route   DELETE /api/products/:id
 * @access  Admin
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ Soft delete
    // product.isActive = false;
    // await product.save();

    await Product.findByIdAndUpdate(req.params.id, {
      isActive: false
    });


    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE IMAGE ================= */

export const deleteProductImage = async (req, res) => {
  try {
    const { productId, imageId } = req.params;

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    const image = product.images.find(
      img => img._id.toString() === imageId
    );

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Remove from DB
    product.images = product.images.filter(
      img => img._id.toString() !== imageId
    );

    await product.save();

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE IMAGE ================= */

export const updateProductImage = async (req, res) => {
  try {
    const { productId, imageId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    const index = product.images.findIndex(
      img => img._id.toString() === imageId
    );

    if (index === -1) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete old image
    await cloudinary.uploader.destroy(
      product.images[index].public_id
    );

    // Replace with new image
    product.images[index] = {
      url: req.file.path,
      public_id: req.file.filename
    };

    await product.save();

    res.json({
      message: "Image updated successfully",
      image: product.images[index]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


