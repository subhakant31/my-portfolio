import { ContactFormProps } from "@/types/contactFormProps";
import { useState } from "react";
import { createPortal } from "react-dom";
import confetti from "canvas-confetti";
import styles from "./ContactForm.module.scss";
import validateFormData from "@/utilities/validateFormData";
import { MagneticButton } from "@/components/atoms/MagneticButton";
import { RippleButton } from "@/components/atoms/RippleButton";

export default function ContactForm(props: ContactFormProps) {
  const [formData, setFormData] = useState(() => {
    const initialState: Record<string, string> = {};
    props.formFields.forEach((field) => {
      initialState[field.name] = "";
    });
    return initialState;
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isFormSuccess, setIsFormSuccess] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ New state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors } = validateFormData(formData, props.formFields);

    if (!isValid) {
      console.error("Validation errors:", errors);
      setIsValid(false);
      return;
    }

    setIsSubmitting(true);
    setIsValid(true);

    try {
      const response = await fetch("/api/emailSubmitter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: props.contactForm.to,
          subject: props.contactForm.subject,
          cc: props.contactForm.cc,
          message: formData,
        }),
      });

      if (response.ok) {
        setIsFormSubmitted(true);
        setIsFormSuccess(true);
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#26e989", "#1fd47c", "#ffffff"],
        });
        setFormData(() =>
          props.formFields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
          }, {} as Record<string, string>)
        );
      } else {
        setIsFormSuccess(false);
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsFormSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.formHeading}>{props.formTitle}</h1>
        {props.formFields.map((field) => {
          const { errors } = validateFormData(formData, props.formFields);
          const hasError = !isValid && errors[field.name];
          return (
            <div key={field.id} className={styles.inputWrapper}>
              {field.fieldType === "textarea" ? (
                <textarea
                  placeholder={field.placeHolderText}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`${styles.inputField} ${styles.textareaField} ${
                    hasError ? styles.error : ""
                  }`}
                  required={field.isRequired}
                  rows={4}
                  aria-invalid={!!hasError}
                  aria-describedby={hasError ? `${field.name}-error` : undefined}
                />
              ) : (
                <input
                  type={field.fieldType}
                  placeholder={field.placeHolderText}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`${styles.inputField} ${
                    hasError ? styles.error : ""
                  }`}
                  minLength={field.validation === "phoneNumber" ? 10 : undefined}
                  maxLength={field.validation === "phoneNumber" ? 10 : undefined}
                  required={field.isRequired}
                  aria-invalid={!!hasError}
                  aria-describedby={hasError ? `${field.name}-error` : undefined}
                />
              )}
            </div>
          );
        })}
        {!isValid && (
          <>
            <ul className={styles.errorList}>
              {props.formFields.map((field) => {
                const error = validateFormData(formData, props.formFields)
                  .errors[field.name];
                return error ? (
                  <li
                    key={field.id}
                    onClick={() => {
                      const input = document.querySelector(
                        `input[name="${field.name}"]`
                      ) as HTMLInputElement;
                      if (input) input.focus();
                    }}
                  >
                    {error}
                  </li>
                ) : null;
              })}
            </ul>
          </>
        )}
        <div className={styles.submitLocationContainer}>
          <MagneticButton strength={0.25}>
            <RippleButton
              type='submit'
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={styles.loader}></span>
              ) : (
                props.submitBtnText
              )}
            </RippleButton>
          </MagneticButton>
          <h3 className={styles.location}>{props.location}</h3>
        </div>
      </form>

      {isFormSubmitted && (
        createPortal(
          <div className={styles.modalWrapper}>
            <div className={styles.modal}>
              <h1 className={styles.modalTitle}>
                {isFormSuccess
                  ? props.modalReference.successTitle
                  : props.modalReference.failureTitle}
              </h1>
              <p className={styles.modalMessage}>
                {isFormSuccess
                  ? props.modalReference.successDescription
                  : props.modalReference.failureDescription}
              </p>
              <button
                className={styles.closeModalBtn}
                onClick={() => setIsFormSubmitted(false)}
              >
                {props.modalReference.closeText}
              </button>
            </div>
          </div>,
          document.body
        )
      )}
    </div>
  );
}
