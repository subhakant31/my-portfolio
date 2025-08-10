// utilities/validateFormData.ts
import { FormFieldProps } from "@/types/contactFormProps";
export default function validateFormData(
  formData: Record<string, string>,
  formFields: FormFieldProps[]
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  formFields.forEach((field) => {
    const value = formData[field.name]?.trim() || "";

    // Check required
    if (field.isRequired && !value) {
      errors[field.name] = `${field.name} is required`;
      return; // Skip further checks for this field
    }

    // Skip validation if empty & not required
    if (!value) return;

    // Type-specific validations
    switch (field.validation) {
      case "text":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errors[field.name] = `${field.name} must contain only letters`;
        }
        break;

      case "phoneNumber":
        if (!/^[0-9]{10}$/.test(value)) {
          errors[field.name] = `${field.name} must be a valid 10-digit number`;
        }
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[field.name] = `${field.name} must be a valid email`;
        }
        break;

      default:
        // No specific validation rule
        break;
    }
  });

  return { isValid: Object.keys(errors).length === 0, errors };
}
