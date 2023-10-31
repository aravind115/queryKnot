import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useState, useRef, useEffect } from 'react';

interface Option {
  id: string;
  label: string;
}

interface DropdownMenuProps {
  label?: string;
  options: Option[];
  onSelect: (option: Option) => void;
  value?:string;
}

const DropdownMenu = (props: DropdownMenuProps) => {
  const { label, options, onSelect,value } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropDownOuterDiv" ref={dropdownRef}>
      <div>
        <label htmlFor="dropdownButton" className="dropDownLabelStyle">{label}</label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="dropdownButtonStyle"
        >
          {value}
         <ChevronDownIcon className="w-5"/>
        </button>
      </div>

      {isOpen && (
        <div className="dropdownOptions">
          <div className="py-1 capitalize">
            {options.map((option) => (
              <div 
                key={option.id} 
                className="dropdownOptionsItems"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;