import React from 'react';
import { FormSection as FormSectionType, FormValues, ValidationErrors } from '../types';
import FormField from './FormField';

interface FormSectionProps {
  section: FormSectionType;
  values: FormValues;
  errors: ValidationErrors;
  onChange: (fieldId: string, value: string | boolean | string[]) => void;
  isLastSection: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isFirstSection: boolean;
}

const FormSection: React.FC<FormSectionProps> = ({
  section,
  values,
  errors,
  onChange,
  isLastSection,
  isFirstSection,
  onNext,
  onPrev,
  onSubmit
}) => {
  return (
    <div className="form-section">
      <h3>{section.title}</h3>
      <p>{section.description}</p>
      
      <div className="section-fields">
        {section.fields.map(field => (
          <FormField
            key={field.fieldId}
            field={field}
            value={values[field.fieldId] || (field.type === 'checkbox' ? false : '')}
            onChange={onChange}
            error={errors[field.fieldId]}
          />
        ))}
      </div>
      
      <div className="section-navigation">
        {!isFirstSection && <button type="button" onClick={onPrev}>Previous</button>}
        {isLastSection ? (
          <button type="button" onClick={onSubmit}>Submit</button>
        ) : (
          <button type="button" onClick={onNext}>Next</button>
        )}
      </div>
    </div>
  );
};

export default FormSection;