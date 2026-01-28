import React, { useState } from 'react';
import { Mail, Star, Trash2, Search } from 'lucide-react';
import { Input } from '../components/ui/Input';

const initialMessages = [
  { id: 'MSG001', from: 'John Doe', subject: 'Question about order #1234', preview: 'Hi, I have a question regarding my recent order...', date: '2026-01-08', isRead: false, isStarred: false },
  { id: 'MSG002', from: 'Jane Smith', subject: 'Product inquiry', preview: 'Can you tell me more about the wireless headphones...', date: '2026-01-08', isRead: false, isStarred: true },
  { id: 'MSG003', from: 'Bob Johnson', subject: 'Refund request', preview: 'I would like to request a refund for order #5678...', date: '2026-01-07', isRead: true, isStarred: false },
  { id: 'MSG004', from: 'Alice Brown', subject: 'Shipping delay', preview: 'My order has not arrived yet, can you help...', date: '2026-01-07', isRead: true, isStarred: false },
  { id: 'MSG005', from: 'Charlie Wilson', subject: 'Product feedback', preview: 'I love the smart watch! Just wanted to share...', date: '2026-01-06', isRead: true, isStarred: true },
];

export function Inbox() {
  const [messages, setMessages] = useState(initialMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const filteredMessages = messages.filter((msg) =>
    msg.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleStar = (id) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg));
  };

  const markAsRead = (id) => {
    setMessages(messages.map(msg => msg.id === id ? { ...msg, isRead: true } : msg));
  };

  const deleteMessage = (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      setMessages(messages.filter(msg => msg.id !== id));
      setSelectedMessage(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Inbox</h2>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full border border-yellow-400/30">
            {messages.filter(m => !m.isRead).length} unread
          </span>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-[#2a2a2a] border-gray-700 text-white placeholder:text-gray-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 bg-[#2a2a2a] border border-yellow-400/20 rounded-lg overflow-hidden">
          <div className="max-h-[600px] overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => {
                  setSelectedMessage(message);
                  markAsRead(message.id);
                }}
                className={`p-4 border-b border-gray-800 cursor-pointer transition-colors ${
                  selectedMessage?.id === message.id ? 'bg-gray-800' : 'hover:bg-gray-800/50'
                } ${!message.isRead ? 'bg-yellow-400/5' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className={message.isRead ? 'text-gray-500' : 'text-yellow-400'} />
                    <p className={`text-sm font-medium ${message.isRead ? 'text-gray-400' : 'text-white'}`}>
                      {message.from}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar(message.id);
                    }}
                    className="p-1"
                  >
                    <Star size={16} className={message.isStarred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-500'} />
                  </button>
                </div>
                <p className={`text-sm mb-1 ${message.isRead ? 'text-gray-500' : 'text-white font-medium'}`}>
                  {message.subject}
                </p>
                <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                <p className="text-xs text-gray-600 mt-2">{message.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2 bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
          {selectedMessage ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between pb-4 border-b border-gray-700">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{selectedMessage.subject}</h3>
                  <p className="text-sm text-gray-400">From: {selectedMessage.from}</p>
                  <p className="text-xs text-gray-500 mt-1">{selectedMessage.date}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleStar(selectedMessage.id)}
                    className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 rounded-md transition-colors"
                  >
                    <Star size={18} className={selectedMessage.isStarred ? 'fill-yellow-400 text-yellow-400' : ''} />
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="text-gray-300 leading-relaxed">
                <p>{selectedMessage.preview}</p>
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
                </p>
                <p className="mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black font-medium rounded-md transition-colors">
                  Reply
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>Select a message to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}