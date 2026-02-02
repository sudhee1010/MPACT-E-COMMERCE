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
      if (item.currentStock === 0) status = "Out of Stock";
      else if (item.currentStock <= item.minStock) status = "Low Stock";

      return {
        id: item._id,
        productName: item.product.name,
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
export const addStock = async (req, res) => {
  try {
    console.log("ADD STOCK BODY 👉", req.body);
    const { productId, warehouse, quantity, unitCost, sku, reason } = req.body;

    let inventory = await Inventory.findOne({ product: productId, warehouse });

    if (!inventory) {
      inventory = await Inventory.create({
        product: productId,
        sku,
        warehouse,
        currentStock: quantity,
        unitCost
      });
    } else {
      inventory.currentStock += Number(quantity);
    }

    await inventory.save();

    await StockMovement.create({
      product: productId,
      warehouse,
      type: "In",
      quantity,
      reason
    });

    res.json({ message: "Stock added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Add stock failed" });
  }
};

/**
 * POST /api/inventory/adjust
 * Adjust stock
 */
export const adjustStock = async (req, res) => {
  try {
    const { inventoryId, type, quantity, reason } = req.body;

    const inventory = await Inventory.findById(inventoryId);
    if (!inventory) {
      return res.status(404).json({ message: "Inventory not found" });
    }

    let adjustedQty = Number(quantity);

    if (type === "Out") {
      inventory.currentStock -= adjustedQty;
      adjustedQty = -adjustedQty;
    } else {
      inventory.currentStock += adjustedQty;
    }

    await inventory.save();

    await StockMovement.create({
      product: inventory.product,
      warehouse: inventory.warehouse,
      type,
      quantity: adjustedQty,
      reason
    });

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
      productName: m.product.name,
      type: m.type,
      quantity: m.quantity,
      warehouse: m.warehouse,
      date: m.createdAt,
      reason: m.reason
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stock movements" });
  }
};


export const getLowStockItems = async (req, res) => {
  try {
    const items = await Inventory.find({
      $expr: { $lte: ["$currentStock", "$minStock"] }
    }).populate("product", "name");

    const formatted = items.map(item => ({
      productName: item.product.name,
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
      productName: item.product.name,
      warehouse: item.warehouse,
      currentStock: item.currentStock,
      minStock: item.minStock
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch out of stock items" });
  }
};
