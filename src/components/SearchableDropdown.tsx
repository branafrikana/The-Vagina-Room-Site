import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ChevronDown } from 'lucide-react';

interface Option {
  label: string;
  icon?: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  label: string;
}

export const SearchableDropdown: React.FC<Props> = ({ options, value, onChange, placeholder = "Select...", disabled, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );
  
  const selectedOption = options.find(o => o.label === value);

  return (
    <div className="space-y-1 relative" ref={dropdownRef}>
      <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider ml-1">
        {label}
      </label>
      <div 
        className={`w-full bg-zinc-900 border border-white/10 rounded-xl p-4 text-white flex justify-between items-center cursor-pointer ${disabled ? "opacity-40 cursor-not-allowed" : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={value ? "text-white" : "text-zinc-400"}>
          {selectedOption ? (
            <span className="flex items-center gap-2">
              {selectedOption.icon && <span>{selectedOption.icon}</span>}
              {selectedOption.label}
            </span>
          ) : placeholder}
        </span>
        <ChevronDown size={16} className="text-zinc-500" />
      </div>
      
      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 w-full mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-xl"
          >
            <div className="p-2 border-b border-white/5">
              <div className="flex items-center gap-2 bg-zinc-950 rounded-lg px-3 py-2">
                <Search size={16} className="text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-white text-sm focus:outline-none w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <div
                    key={opt.label}
                    className={`p-3 text-sm cursor-pointer hover:bg-brand-gold/10 flex items-center gap-2 ${value === opt.label ? "text-brand-gold bg-brand-gold/5" : "text-zinc-300"}`}
                    onClick={() => {
                      onChange(opt.label);
                      setIsOpen(false);
                      setSearch("");
                    }}
                  >
                    {opt.icon && <span>{opt.icon}</span>}
                    {opt.label}
                  </div>
                ))
              ) : (
                <div className="p-4 text-sm text-zinc-500 text-center">No results found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
