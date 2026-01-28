import React from 'react';
import { BookOpen, FileText, Video, HelpCircle } from 'lucide-react';

const articles = [
  { id: 1, title: 'Getting Started with Admin Panel', category: 'Setup', icon: BookOpen, views: 1245 },
  { id: 2, title: 'Managing Products and Inventory', category: 'Products', icon: FileText, views: 987 },
  { id: 3, title: 'Processing Orders and Refunds', category: 'Orders', icon: FileText, views: 856 },
  { id: 4, title: 'Customer Management Best Practices', category: 'Customers', icon: BookOpen, views: 734 },
  { id: 5, title: 'Creating Discount Coupons', category: 'Marketing', icon: FileText, views: 623 },
  { id: 6, title: 'Analytics and Reporting Guide', category: 'Analytics', icon: Video, views: 512 },
];

const faqs = [
  { q: 'How do I add a new product?', a: 'Navigate to Products page and click "Add Product" button.' },
  { q: 'How can I process refunds?', a: 'Go to Orders, select the order, and click "Process Refund".' },
  { q: 'How do I create discount codes?', a: 'Visit the Coupons page and click "Create Coupon".' },
  { q: 'Can I export sales reports?', a: 'Yes, go to Reports and click "Export Report" button.' },
];

export function KnowledgeBase() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Knowledge Base</h2>
        <p className="text-gray-400">Learn how to use the admin panel effectively</p>
      </div>

      {/* Popular Articles */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Popular Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => {
            const Icon = article.icon;
            return (
              <div
                key={article.id}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 hover:border-yellow-400/40 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-yellow-400 font-medium">{article.category}</span>
                    <h4 className="text-sm font-semibold text-white mt-1">{article.title}</h4>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{article.views} views</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <HelpCircle size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-white mb-2">{faq.q}</h4>
                  <p className="text-sm text-gray-400">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Tutorials */}
      <div className="bg-[#2a2a2a] border border-yellow-400/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Video Tutorials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden hover:border-yellow-400/40 transition-all cursor-pointer"
            >
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <Video size={48} className="text-gray-700" />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-white mb-1">Admin Panel Tutorial #{i}</h4>
                <p className="text-sm text-gray-400">Learn the basics in 10 minutes</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
