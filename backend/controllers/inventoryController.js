import Inventory from "../models/Inventory.js";
import StockMovement from "../models/StockMovement.js";
import Product from "../models/Product.js";

/**
 * GET /api/inventory
 * Inventory list
 */
export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find()
      .populate("product", "name")
      .sort({ updatedAt: -1 });

    const formatted = inventory.map(item => {
      let status = "In Stock";

      if (item.currentStock === 0) {
        status = "Out of Stock";
      } else if (item.currentStock > 0 && item.currentStock <= 5) {
        status = "Low Stock";
      }


      return {
        id: item._id,
        // productName: item.product.name,
        productName: item.product?.name || "Unknown Product",
        sku: item.sku,
        warehouse: item.warehouse,
        currentStock: item.currentStock,
        minStock: item.minStock,
        maxStock: item.maxStock,
        unitCost: item.unitCost,
        status,
        lastUpdated: item.updatedAt
      };
    });

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory" });
  }
};

/**
 * POST /api/inventory/add
 * Add stock
 */
// export const addStock = async (req, res) => {
//   try {
//     console.log("ADD STOCK BODY 👉", req.body);
//     const { productId, warehouse, quantity, unitCost, sku, reason } = req.body;

//     let inventory = await Inventory.findOne({ product: productId, warehouse });

//     if (!inventory) {
//       inventory = await Inventory.create({
//         product: productId,
//         sku,
//         warehouse,
//         currentStock: quantity,
//         unitCost
//       });
//     } else {
//       inventory.currentStock += Number(quantity);
//     }

//     await inventory.save();

//     await StockMovement.create({
//       product: productId,
//       warehouse,
//       type: "In",
//       quantity,
//       reason
//     });

//     res.json({ message: "Stock added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Add stock failed" });
//   }
// };


export const addStock = async (req, res) => {
  try {
    const { productId, warehouse, quantity, unitCost, sku, reason } = req.body;

    const qty = Number(quantity);
    const cost = Number(unitCost);

    if (qty <= 0 || cost <= 0) {
      return res.status(400).json({
        message: "Quantity and Unit Cost must be greater than zero"
      });
    }

    let inventory = await Inventory.findOne({ product: productId, warehouse });

    if (!inventory) {
      inventory = await Inventory.create({
        product: productId,
        sku,
        warehouse,
        currentStock: qty,
        unitCost: cost
      });
    } else {
      inventory.currentStock += qty;
      inventory.unitCost = cost;
      await inventory.save();
    }

    await StockMovement.create({
      product: productId,
      warehouse,
      type: "In",
      quantity: qty,
      reason: reason || "Stock added"
    });

    res.json({ message: "Stock added successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Add stock failed" });
  }
};




/**
 * POST /api/inventory/adjust
 * Adjust stock
 */
// export const adjustStock = async (req, res) => {
//   try {
//     const { inventoryId, type, quantity, reason } = req.body;

//     const inventory = await Inventory.findById(inventoryId);
//     if (!inventory) {
//       return res.status(404).json({ message: "Inventory not found" });
//     }

//     // let adjustedQty = Number(quantity);


//     const qty = Number(quantity);

//     if (qty <= 0) {
//       return res.status(400).json({
//         message: "Quantity must be greater than zero"
//       });
//     }

//     if (type === "Out") {
//       if (inventory.currentStock - qty < 0) {
//         return res.status(400).json({
//           message: "Stock cannot go below zero"
//         });
//       }
//        inventory.currentStock -= qty;
//       await StockMovement.create({
//         product: inventory.product,
//         warehouse: inventory.warehouse,
//         type: "Out",
//         quantity: -qty,
//         reason
//       });
//     }

//     else {
//       inventory.currentStock += qty;
//     }

//     await inventory.save();

//     await StockMovement.create({
//       product: inventory.product,
//       warehouse: inventory.warehouse,
//       type,
//       quantity: adjustedQty,
//       reason
//     });

//     res.json({ message: "Stock adjusted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Stock adjustment failed" });
//   }
// };


export const adjustStock = async (req, res) => {
  try {
    const { inventoryId, type, quantity, reason } = req.body;

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    const qty = Number(quantity);

    if (qty <= 0) {
      return res.status(400).json({
        message: "Quantity must be greater than zero"
      });
    }

    if (type === "Out") {
      if (inventory.currentStock - qty < 0) {
        return res.status(400).json({
          message: "Stock cannot go below zero"
        });
      }
      inventory.currentStock -= qty;
      await StockMovement.create({
        product: inventory.product,
        warehouse: inventory.warehouse,
        type: "Out",
        quantity: -qty,
        reason
      });
    } else {
      inventory.currentStock += qty;
      await StockMovement.create({
        product: inventory.product,
        warehouse: inventory.warehouse,
        type: "In",
        quantity: qty,
        reason
      });
    }

    await inventory.save();
    res.json({ message: "Stock adjusted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Stock adjustment failed" });
  }
};

/**
 * GET /api/inventory/movements
 */
export const getStockMovements = async (req, res) => {
  try {
    const movements = await StockMovement.find()
      .populate("product", "name")
      .sort({ createdAt: -1 });

    const formatted = movements.map(m => ({
      id: m._id,
      productName: m.product ? m.product.name : "Deleted Product",
      type: m.type,
      quantity: m.quantity,
      warehouse: m.warehouse,
      date: m.createdAt,
      reason: m.reason
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Stock movement fetch error:", error);
    res.status(500).json({ message: "Failed to fetch stock movements" });
  }
};


export const getLowStockItems = async (req, res) => {
  try {
    const items = await Inventory.find({
      currentStock: { $gt: 0, $lte: 5 }
    }).populate("product", "name");

    const formatted = items.map(item => ({
      productName: item.product?.name || "Unknown Product",
      warehouse: item.warehouse,
      currentStock: item.currentStock,
      minStock: item.minStock
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch low stock items" });
  }
};


export const getOutOfStockItems = async (req, res) => {
  try {
    const items = await Inventory.find({ currentStock: 0 })
      .populate("product", "name");

    const formatted = items.map(item => ({
      productName: item.product?.name || "Unknown Product",
      warehouse: item.warehouse,
      currentStock: item.currentStock,
      minStock: item.minStock
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch out of stock items" });
  }
};

/**
 * GET /api/inventory/alerts
 * Dashboard alerts
 */
export const getInventoryAlerts = async (req, res) => {
  try {
    const lowStock = await Inventory.find({
      currentStock: { $gt: 0, $lte: 5 }
    }).populate("product", "name");

    const outOfStock = await Inventory.find({
      currentStock: 0
    }).populate("product", "name");

    res.json({
      lowStock: lowStock.map(item => ({
        productName: item.product?.name || "Unknown Product",
        warehouse: item.warehouse,
        currentStock: item.currentStock
      })),
      outOfStock: outOfStock.map(item => ({
        productName: item.product?.name || "Unknown Product",
        warehouse: item.warehouse
      }))
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inventory alerts" });
  }
};

/**
 * DELETE /api/inventory/:id
 * Delete inventory item (only inventory row)
 */
export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;

    const inventory = await Inventory.findById(id);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    // ✅ Only delete inventory document
    await Inventory.findByIdAndDelete(id);

    res.json({ message: "Inventory deleted successfully" });

  } catch (error) {
    console.error("Delete inventory error:", error);
    res.status(500).json({ message: "Failed to delete inventory" });
  }
};