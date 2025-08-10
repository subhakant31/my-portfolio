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
}

export interface ContactFormProps {
  to: string;
  subject: string;
  cc?: string;
  from: string;
}

export interface ContactFormProps {
  formTitle: string;
  submitBtnText: string;
  location: string;
  formFields: FormFieldProps[];
  id: string;
  contactForm: ContactFormProps;
  modalReference: ModalProps;
}
