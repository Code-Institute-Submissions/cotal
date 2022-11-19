import React from 'react';

export const Input = ({
  id,
  name,
  type,
  dataValue,
  value,
  autoComplete,
  display,
  width,
  borderRadius,
  padding,
  placeholder,
  onChange,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      data-name={dataValue}
      value={value ? value : ``}
      autoComplete={autoComplete}
      required
      className={`relative ${display ? display : ``} ${
        width ? width : `w-full`
      } appearance-none ${borderRadius} border border-slate-400 bg-slate-500 ${padding} text-white placeholder-white focus:z-10 focus:border-yellow-300 focus:outline-none focus:ring-yellow-300 sm:text-sm`}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
