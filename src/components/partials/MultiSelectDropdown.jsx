import React, { useEffect, useRef, useState, useMemo } from "react";

export default function MultiSelectDropdown({
  label,
  options = [],
  selected = [],
  onChange,
  placeholder = "Select options...",
  tooltip,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      onChange(selected.filter((c) => c !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const removeOption = (option) => {
    onChange(selected.filter((c) => c !== option));
  };

  return (
    <div ref={wrapperRef} className="relative w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
          {label}
          {tooltip && (
            <span className="text-xs text-gray-400" title={tooltip}>
              <svg width="16" height="16" fill="currentColor" className="inline"><circle cx="8" cy="8" r="8" fill="#e5e7eb"/><text x="8" y="12" textAnchor="middle" fontSize="10" fill="#4639AA">i</text></svg>
            </span>
          )}
        </label>
      )}
      <div
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
        className="min-h-[42px] w-full bg-white rounded-md border border-gray-300 px-3 py-1 flex flex-wrap items-center gap-2 cursor-text focus-within:ring-2 focus-within:ring-[#4639AA]"
      >
        {selected.map((option) => (
          <span
            key={option}
            className="border-[#999999] border text-[#4639AA] text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
          >
            {option}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeOption(option);
              }}
              className="ml-1 hover:text-gray-200"
            >
              ×
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={selected.length === 0 ? placeholder : ""}
          className="flex-1 outline-none text-sm min-w-[120px]"
        />
      </div>
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-hidden">
          <ul className="overflow-auto max-h-64">
            {filteredOptions.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-400">No option found</li>
            )}
            {filteredOptions.map((option) => (
              <li
                key={option}
                onClick={() => toggleOption(option)}
                className={`px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#4639AA]/10 ${
                  selected.includes(option) ? "bg-[#4639AA]/10" : ""
                }`}
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={selected.includes(option)}
                  className="accent-[#4639AA]"
                />
                <span className="text-sm">{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
