import React from 'react';

// Light-theme form field primitives shared by every section editor.

const inputClasses =
  'w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 ' +
  'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition';

interface FieldWrapProps {
  label?: string;
  hint?: string;
  children: React.ReactNode;
}

export const FieldWrap: React.FC<FieldWrapProps> = ({ label, hint, children }) => (
  <div className="space-y-1">
    {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
    {children}
    {hint && <p className="text-xs text-gray-400">{hint}</p>}
  </div>
);

interface TextFieldProps {
  label?: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'url' | 'email';
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  hint,
  value,
  onChange,
  placeholder,
  type = 'text',
}) => (
  <FieldWrap label={label} hint={hint}>
    <input
      type={type}
      className={inputClasses}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  </FieldWrap>
);

interface NumberFieldProps {
  label?: string;
  hint?: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export const NumberField: React.FC<NumberFieldProps> = ({
  label,
  hint,
  value,
  onChange,
  placeholder,
}) => (
  <FieldWrap label={label} hint={hint}>
    <input
      type="number"
      className={inputClasses}
      value={Number.isFinite(value) ? value : 0}
      placeholder={placeholder}
      onChange={(e) => onChange(Number(e.target.value))}
    />
  </FieldWrap>
);

interface TextAreaProps {
  label?: string;
  hint?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  hint,
  value,
  onChange,
  placeholder,
  rows = 4,
}) => (
  <FieldWrap label={label} hint={hint}>
    <textarea
      className={inputClasses}
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
    />
  </FieldWrap>
);

export const UrlField: React.FC<TextFieldProps> = (props) => (
  <TextField {...props} type="url" />
);
