import mongoose from "mongoose";

const helpTicketSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    message: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["pending", "in_progress", "resolved"],
      default: "pending"
    },

    adminReply: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

export default mongoose.model("HelpTicket", helpTicketSchema);
