import HelpTicket from "../models/HelpTicket.js";

/**
 * USER: Create support ticket
 */
export const createTicket = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const ticket = await HelpTicket.create({
      user: req.user?._id || null,        // cookie user if exists
      name: name || req.user?.name,       // fallback logic
      email: email || req.user?.email,
      message
    });

    res.status(201).json({
      success: true,
      message: "Support request submitted successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/**
 * USER: Get own tickets
 */
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await HelpTicket.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN: Get all tickets
 */
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await HelpTicket.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * ADMIN: Update ticket
 */
export const updateTicket = async (req, res) => {
  try {
    const { status, adminReply } = req.body;

    const ticket = await HelpTicket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    ticket.status = status || ticket.status;
    ticket.adminReply = adminReply || ticket.adminReply;

    await ticket.save();

    res.json({
      success: true,
      message: "Ticket updated",
      ticket
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
