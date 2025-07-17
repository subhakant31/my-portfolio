export interface FormFieldProps {
  name: string;
  placeHolderText: string;
  type: string;
}

export interface ContactFormProps {
  formTitle: string;
  submitBtnText: string;
  location: string;
  formFields: FormFieldProps[];
}
