import React from 'react';

interface InputBoxProps {
  label: string;
  placeholder?: string;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'password' | 'number' | 'email' | 'date' | 'tel' | 'url' | 'search' | 'color' | 'range';
}

const InputBox: React.FC<InputBoxProps> = ({
  label,
  placeholder = '',
  id = 'input-box',
  value,
  onChange,
  type = 'text',
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  return (
    <div className="inputBoxContainer">
      <label htmlFor={id} className="inputBoxLabel">{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="inputBoxStyle"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default InputBox;
