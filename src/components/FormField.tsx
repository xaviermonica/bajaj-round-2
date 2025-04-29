import React from 'react';
import { FormField as FormFieldType } from '../types';

interface FormFieldProps {
  field: FormFieldType;
  value: string | boolean | string[];
  onChange: (fieldId: string, value: string | boolean | string[]) => void;
  error?: string;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, error }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const targetValue = e.target.type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : e.target.value;
    
    onChange(field.fieldId, targetValue);
  };

  const handleMultiChange = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    const newValues = currentValues.includes(optionValue)
      ? currentValues.filter(v => v !== optionValue)
      : [...currentValues, optionValue];
    
    onChange(field.fieldId, newValues);
  };

  switch (field.type) {
    case 'text':
    case 'tel':
    case 'email':
    case 'date':
      return (
        <div className="form-field">
          <label htmlFor={field.fieldId}>{field.label}{field.required && <span className="required">*</span>}</label>
          <input
            type={field.type}
            id={field.fieldId}
            data-testid={field.dataTestId}
            value={value as string}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            maxLength={field.maxLength}
            minLength={field.minLength}
          />
          {error && <div className="error-message">{error}</div>}
        </div>
      );
    
    case 'textarea':
      return (
        <div className="form-field">
          <label htmlFor={field.fieldId}>{field.label}{field.required && <span className="required">*</span>}</label>
          <textarea
            id={field.fieldId}
            data-testid={field.dataTestId}
            value={value as string}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            maxLength={field.maxLength}
            minLength={field.minLength}
          />
          {error && <div className="error-message">{error}</div>}
        </div>
      );
    
    case 'dropdown':
      return (
        <div className="form-field">
          <label htmlFor={field.fieldId}>{field.label}{field.required && <span className="required">*</span>}</label>
          <select
            id={field.fieldId}
            data-testid={field.dataTestId}
            value={value as string}
            onChange={handleChange}
            required={field.required}
          >
            <option value="">Select an option</option>
            {field.options?.map(option => (
              <option 
                key={option.value} 
                value={option.value}
                data-testid={option.dataTestId}
              >
                {option.label}
              </option>
            ))}
          </select>
          {error && <div className="error-message">{error}</div>}
        </div>
      );
    
    case 'radio':
      return (
        <div className="form-field">
          <fieldset>
            <legend>{field.label}{field.required && <span className="required">*</span>}</legend>
            {field.options?.map(option => (
              <div key={option.value} className="radio-option">
                <input
                  type="radio"
                  id={`${field.fieldId}-${option.value}`}
                  name={field.fieldId}
                  data-testid={option.dataTestId}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  required={field.required}
                />
                <label htmlFor={`${field.fieldId}-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </fieldset>
          {error && <div className="error-message">{error}</div>}
        </div>
      );
    
    case 'checkbox':
      if (field.options && field.options.length > 0) {
        // Multiple checkboxes (array of values)
        return (
          <div className="form-field">
            <fieldset>
              <legend>{field.label}{field.required && <span className="required">*</span>}</legend>
              {field.options.map(option => (
                <div key={option.value} className="checkbox-option">
                  <input
                    type="checkbox"
                    id={`${field.fieldId}-${option.value}`}
                    data-testid={option.dataTestId}
                    value={option.value}
                    checked={Array.isArray(value) && value.includes(option.value)}
                    onChange={() => handleMultiChange(option.value)}
                  />
                  <label htmlFor={`${field.fieldId}-${option.value}`}>{option.label}</label>
                </div>
              ))}
            </fieldset>
            {error && <div className="error-message">{error}</div>}
          </div>
        );
      } else {
        // Single checkbox (boolean value)
        return (
          <div className="form-field checkbox-field">
            <input
              type="checkbox"
              id={field.fieldId}
              data-testid={field.dataTestId}
              checked={Boolean(value)}
              onChange={handleChange}
              required={field.required}
            />
            <label htmlFor={field.fieldId}>{field.label}{field.required && <span className="required">*</span>}</label>
            {error && <div className="error-message">{error}</div>}
          </div>
        );
      }
    
    default:
      return null;
  }
};

export default FormField;