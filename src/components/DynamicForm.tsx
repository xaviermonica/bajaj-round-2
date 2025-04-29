import React, { useState } from 'react';
import { FormResponse, FormValues, ValidationErrors, FormField as FormFieldType } from '../types';
import FormSection from './FormSection';

interface DynamicFormProps {
  formData: FormResponse;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ formData }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [formValues, setFormValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<ValidationErrors>({});

  const { form } = formData;
  const currentSection = form.sections[currentSectionIndex];
  const isLastSection = currentSectionIndex === form.sections.length - 1;
  const isFirstSection = currentSectionIndex === 0;

  const validateField = (field: FormFieldType, value: any): string => {
    // Check if required but empty
    if (field.required) {
      if (field.type === 'checkbox' && Array.isArray(field.options) && field.options.length > 0) {
        if (!Array.isArray(value) || value.length === 0) {
          return field.validation?.message || 'This field is required';
        }
      } else if (!value && value !== false) {
        return field.validation?.message || 'This field is required';
      } else if (typeof value === 'string' && value.trim() === '') {
        return field.validation?.message || 'This field is required';
      }
    }

    // Check min length
    if (field.minLength && typeof value === 'string' && value.length < field.minLength) {
      return `Minimum ${field.minLength} characters required`;
    }

    // Check max length
    if (field.maxLength && typeof value === 'string' && value.length > field.maxLength) {
      return `Maximum ${field.maxLength} characters allowed`;
    }

    // Email validation
    if (field.type === 'email' && value && typeof value === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    }

    // Phone number validation for 'tel' type
    if (field.type === 'tel' && value && typeof value === 'string') {
      const phoneRegex = /^\d{10}$/; // Simple 10-digit validation
      if (!phoneRegex.test(value)) {
        return 'Please enter a valid 10-digit phone number';
      }
    }

    return '';
  };

  const validateSection = (sectionIndex: number): boolean => {
    const section = form.sections[sectionIndex];
    const newErrors: ValidationErrors = {};
    let isValid = true;

    section.fields.forEach(field => {
      const value = formValues[field.fieldId];
      const fieldError = validateField(field, value);
      
      if (fieldError) {
        newErrors[field.fieldId] = fieldError;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFieldChange = (fieldId: string, value: string | boolean | string[]) => {
    setFormValues(prev => ({
      ...prev,
      [fieldId]: value
    }));

    // Clear error when user types
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }));
    }
  };

  const handleNext = () => {
    if (validateSection(currentSectionIndex)) {
      setCurrentSectionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (validateSection(currentSectionIndex)) {
      console.log('Form submission data:', formValues);
      alert('Form submitted successfully! Check console for data.');
    }
  };

  return (
    <div className="dynamic-form">
      <h2>{form.formTitle}</h2>
      <div className="form-progress">
        {form.sections.map((section, index) => (
          <div 
            key={section.sectionId} 
            className={`progress-step ${index === currentSectionIndex ? 'active' : ''} ${index < currentSectionIndex ? 'completed' : ''}`}
          >
            {section.title}
          </div>
        ))}
      </div>
      
      <FormSection
        section={currentSection}
        values={formValues}
        errors={errors}
        onChange={handleFieldChange}
        isLastSection={isLastSection}
        isFirstSection={isFirstSection}
        onNext={handleNext}
        onPrev={handlePrev}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default DynamicForm;