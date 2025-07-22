import { ContactFormProps } from "@/types/contactFormProps";
import { useState } from "react";
import styles from "./ContactForm.module.scss";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData, "form data");
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.formHeading}>{props.formTitle}</h1>
        {props.formFields.map((field) => (
          <input
            key={field.id}
            type={field.type}
            placeholder={field.placeHolderText}
            name={field.name}
            onChange={handleChange}
            className={styles.inputField}
          />
        ))}
        <div className={styles.submitLocationContainer}>
          <button type='submit' className={styles.submitBtn}>
            {props.submitBtnText}
          </button>
          <h3 className={styles.location}>{props.location}</h3>
        </div>
      </form>
    </div>
  );
}
