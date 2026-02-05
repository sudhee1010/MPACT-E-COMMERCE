import React, { useEffect, useState } from "react";
import api from "../api/axios";

export function AdminHelpSupport() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const { data } = await api.get("/api/help");
      setTickets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async (id, payload) => {
    try {
      await api.put(`/api/help/${id}`, payload);
      fetchTickets();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  if (loading) {
    return <p className="text-gray-400">Loading support tickets...</p>;
  }

  return (
    <div className="space-y-6">
      {tickets.length === 0 ? (
        <p className="text-gray-400">No support requests found.</p>
      ) : (
        tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="bg-[#2b2b2b] p-6 rounded-lg border border-gray-700"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">{ticket.name}</h3>
              <span className="text-xs uppercase text-yellow-400">
                {ticket.status}
              </span>
            </div>

            <p className="text-sm text-gray-400 mb-2">{ticket.email}</p>
            <p className="text-sm mb-4">{ticket.message}</p>

            <select
              className="bg-[#1f1f1f] border border-gray-600 text-sm p-2 rounded mb-3"
              value={ticket.status}
              onChange={(e) =>
                updateTicket(ticket._id, {
                  status: e.target.value,
                  adminReply: ticket.adminReply
                })
              }
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}
