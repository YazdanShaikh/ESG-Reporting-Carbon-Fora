import React, { useEffect, useRef, useState, useMemo } from "react";

export default function CountryMultiSelect({
  label,
  options = [],
  selected = [],
  onChange,
  placeholder = "Select countries...",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  /* ===============================
     CLOSE ON OUTSIDE CLICK
  =============================== */
  useEffect(() => {
    const handleClick = (e) => {
      if (!wrapperRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ===============================
     FILTER COUNTRIES
  =============================== */
  const filteredOptions = useMemo(() => {
    return options.filter((country) =>
      country.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

  /* ===============================
     SELECT COUNTRY
  =============================== */
  const toggleCountry = (country) => {
    if (selected.includes(country)) {
      onChange(selected.filter((c) => c !== country));
    } else {
      onChange([...selected, country]);
    }
  };

  const removeCountry = (country) => {
    onChange(selected.filter((c) => c !== country));
  };

  return (
    <div ref={wrapperRef} className="relative w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-white mb-1">
          {label}
        </label>
      )}

      {/* ================= INPUT BOX ================= */}
      <div
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
        className="min-h-[42px] w-full bg-white rounded-md border border-gray-300 px-3 py-1 flex flex-wrap items-center gap-2 cursor-text focus-within:ring-2 focus-within:ring-[#4639AA]"
      >
        {selected.map((country) => (
          <span
            key={country}
            className="border-[#999999] border text-[#4639AA] text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
          >
            {country}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeCountry(country);
              }}
              className="ml-1 hover:text-gray-200"
            >
              ×
            </button>
          </span>
        ))}

        {/* SEARCH INPUT */}
        <input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setOpen(true)}
          placeholder={selected.length === 0 ? placeholder : ""}
          className="flex-1 outline-none text-sm min-w-[120px]"
        />
      </div>

      {/* ================= DROPDOWN ================= */}
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-hidden">
          <ul className="overflow-auto max-h-64">
            {filteredOptions.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-400">
                No country found
              </li>
            )}

            {filteredOptions.map((country) => (
              <li
                key={country}
                onClick={() => toggleCountry(country)}
                className={`px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-[#4639AA]/10 ${
                  selected.includes(country)
                    ? "bg-[#4639AA]/10"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={selected.includes(country)}
                  className="accent-[#4639AA]"
                />

                <span className="text-sm">{country}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}