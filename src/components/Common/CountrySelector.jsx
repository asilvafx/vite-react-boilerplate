import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { COUNTRIES } from "../../lib/countries.js";

export default function CountrySelector({
                                            id,
                                            open,
                                            disabled = false,
                                            onToggle,
                                            onChange,
                                            selectedValue,
                                        }) {
    const ref = useRef(null);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target) && open) {
                onToggle();
                setQuery("");
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open, onToggle]);

    return (
        <div ref={ref}>
            <div className="relative">
                <button
                    type="button"
                    className={`${
                        disabled ? "bg-neutral-100" : "bg-white"
                    } h-full relative w-full border border-gray-300 rounded-lg pl-3 pr-10 py-2 text-left cursor-default focus:outline-none`}
                    aria-haspopup="listbox"
                    aria-expanded="true"
                    aria-labelledby="listbox-label"
                    onClick={onToggle}
                    disabled={disabled}
                >
          <span className="truncate flex items-center text-black font-normal">
            <img
                alt={selectedValue.value}
                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
                className="inline mr-2 h-4 rounded-sm"
            />
              {selectedValue.title}
          </span>
                    <span
                        className={`absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none ${
                            disabled ? "hidden" : ""
                        }`}
                    >
            <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
            >
              <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
              />
            </svg>
          </span>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-80 rounded-md text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            tabIndex={-1}
                            role="listbox"
                            aria-labelledby="listbox-label"
                            aria-activedescendant="listbox-option-3"
                        >
                            <div className="sticky top-0 z-10 bg-white">
                                <li className="text-gray-900 cursor-default select-none relative py-2 px-3">
                                    <input
                                        type="search"
                                        name="search"
                                        autoComplete="off"
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Search a country"
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                </li>
                                <hr />
                            </div>

                            <div className="max-h-64 scrollbar scrollbar-track-gray-100 scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-600 scrollbar-thumb-rounded scrollbar-thin overflow-y-scroll">
                                {COUNTRIES.filter((c) =>
                                    c.title.toLowerCase().startsWith(query.toLowerCase())
                                ).length === 0 ? (
                                    <li className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9">
                                        No countries found
                                    </li>
                                ) : (
                                    COUNTRIES.filter((c) =>
                                        c.title.toLowerCase().startsWith(query.toLowerCase())
                                    ).map((value, index) => (
                                        <li
                                            key={`${id}-${index}`}
                                            className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 flex items-center hover:bg-gray-50 transition"
                                            id={`listbox-option-${index}`}
                                            role="option"
                                            onClick={() => {
                                                onChange(value.value);
                                                setQuery("");
                                                onToggle();
                                            }}
                                        >
                                            <img
                                                alt={value.value}
                                                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                                                className="inline mr-2 h-4 rounded-sm"
                                            />
                                            <span className="font-normal truncate">{value.title}</span>
                                            {value.value === selectedValue.value && (
                                                <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-8">
                          <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                          >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                          </svg>
                        </span>
                                            )}
                                        </li>
                                    ))
                                )}
                            </div>
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
