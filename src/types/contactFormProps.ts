export interface FormFieldProps {
  name: string;
  placeHolderText: string;
  fieldType: string;
  id: string;
  isRequired: boolean;
  validation: "text" | "phoneNumber" | "email" | null; // null for no validation
}

export interface ModalProps {
  successTitle: string;
  failureTitle: string;
  successDescription: string;
  failureDescription: string;
  closeText: string;
  resumeModalTitle?: string | null;
  emailCopiedToast?: string | null;
}

export interface ContactFormProps {
  to: string;
  subject: string;
  cc?: string;
  from: string;
}

export interface ValidationMessages {
  requiredMessage?: string | null;
  lettersOnlyMessage?: string | null;
  phoneMessage?: string | null;
  emailMessage?: string | null;
}

export interface ContactFormProps extends ValidationMessages {
  formTitle: string;
  submitBtnText: string;
  location: string;
  formFields: FormFieldProps[];
  id: string;
  contactForm: ContactFormProps;
  modalReference: ModalProps;
}
