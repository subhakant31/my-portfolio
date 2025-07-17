import { ContactFormProps } from "@/types/contactFormProps";
import "./ContactForm.scss";
import { useState } from "react";
export default function ContactForm(props: ContactFormProps) {
  const [formData, setFormData] = useState(() => {
    const initialState: Record<string, string> = {};

    props.formFields.forEach((field) => {
      initialState[field.name] = "";
    });

    return initialState;
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData, "form data");

  };
  return (
    <div className="form-container">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="form-heading">{props.formTitle}</h1>
        {props.formFields.map((field) => {
          return (
            <input
              type={field.type}
              placeholder={field.placeHolderText}
              name={field.name}
              onChange={handleChange}
              className="input-field"
              key={field.name}
            />
          );
        })}
        <div className="submit-location-container">
          <button type="submit" className="submit-btn">
            {props.submitBtnText}
          </button>
          <h3 className="location">{props.location}</h3>
        </div>
      </form>
    </div>
  );
}
