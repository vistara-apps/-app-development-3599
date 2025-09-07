import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Accordion = ({ items, className = '' }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-md overflow-hidden">
          <button
            onClick={() => toggleItem(index)}
            className="w-full px-4 py-3 text-left bg-surface hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
          >
            <span className="font-medium text-gray-900">{item.title}</span>
            {openItems.has(index) ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openItems.has(index) && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 text-sm leading-relaxed">
                {typeof item.content === 'string' ? (
                  <div dangerouslySetInnerHTML={{ __html: item.content.replace(/\n/g, '<br />') }} />
                ) : (
                  item.content
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
