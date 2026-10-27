// utilities/validateFormData.ts
import { FormFieldProps, ValidationMessages } from "@/types/contactFormProps";

// Default validation message templates. {field} is replaced with the field name.
const DEFAULT_MESSAGES = {
  required: "{field} is required",
  lettersOnly: "{field} must contain only letters",
  phone: "{field} must be a valid 10-digit number",
  email: "{field} must be a valid email",
};

const fill = (template: string, fieldName: string) =>
  template.replace(/\{field\}/g, fieldName);

export default function validateFormData(
  formData: Record<string, string>,
  formFields: FormFieldProps[],
  messages?: ValidationMessages
): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const templates = {
    required: messages?.requiredMessage || DEFAULT_MESSAGES.required,
    lettersOnly: messages?.lettersOnlyMessage || DEFAULT_MESSAGES.lettersOnly,
    phone: messages?.phoneMessage || DEFAULT_MESSAGES.phone,
    email: messages?.emailMessage || DEFAULT_MESSAGES.email,
  };

  formFields.forEach((field) => {
    const value = formData[field.name]?.trim() || "";

    // Check required
    if (field.isRequired && !value) {
      errors[field.name] = fill(templates.required, field.name);
      return; // Skip further checks for this field
    }

    // Skip validation if empty & not required
    if (!value) return;

    // Type-specific validations
    switch (field.validation) {
      case "text":
        if (!/^[a-zA-Z\s]+$/.test(value)) {
          errors[field.name] = fill(templates.lettersOnly, field.name);
        }
        break;

      case "phoneNumber":
        if (!/^[0-9]{10}$/.test(value)) {
          errors[field.name] = fill(templates.phone, field.name);
        }
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors[field.name] = fill(templates.email, field.name);
        }
        break;

      default:
        // No specific validation rule
        break;
    }
  });

  return { isValid: Object.keys(errors).length === 0, errors };
}
