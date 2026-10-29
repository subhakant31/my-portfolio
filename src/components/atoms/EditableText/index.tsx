import { createElement, useEffect, useRef } from "react";
import { useEditMode, editKey } from "@/context/EditModeContext";
import styles from "./EditableText.module.scss";

interface EditableTextProps {
  /** DatoCMS record id this text belongs to. */
  recordId?: string;
  /** GraphQL __typename of the record (e.g. "HerobannerRecord"). */
  typename?: string;
  /** DatoCMS field api_key in snake_case (e.g. "title"). */
  apiKey?: string;
  /** The current value from the CMS. */
  value?: string | null;
  /** Element to render as (default span). */
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}

/**
 * Renders plain text. When edit mode is active and the admin is authenticated
 * AND we have the metadata needed to write back (recordId + typename + apiKey),
 * the text becomes inline-editable and changes are reported to EditModeContext.
 *
 * v1 scope: PLAIN TEXT ONLY. Do not use for rich-text/HTML fields.
 */
export const EditableText = ({
  recordId,
  typename,
  apiKey,
  value,
  as = "span",
  className,
}: EditableTextProps) => {
  const { authenticated, editing, registerEdit, pending } = useEditMode();
  const ref = useRef<HTMLElement>(null);

  const canEdit =
    authenticated && editing && Boolean(recordId && typename && apiKey);

  // The current displayed value: a pending edit overrides the CMS value.
  const pendingValue =
    recordId && apiKey ? pending[editKey(recordId, apiKey)]?.value : undefined;
  const displayValue = pendingValue ?? value ?? "";

  // Keep the contentEditable DOM in sync when we enter edit mode, without
  // clobbering the caret while the user is typing (we only set it on toggle).
  useEffect(() => {
    if (canEdit && ref.current && ref.current.innerText !== displayValue) {
      ref.current.innerText = displayValue;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canEdit]);

  const handleInput = () => {
    if (!recordId || !typename || !apiKey || !ref.current) return;
    registerEdit({
      recordId,
      typename,
      apiKey,
      value: ref.current.innerText,
    });
  };

  // Using React.createElement for the dynamic tag avoids a "union type too
  // complex" error that JSX produces when spreading many props over a tag
  // typed as the full set of intrinsic elements.
  if (!canEdit) {
    return createElement(as, { className }, displayValue);
  }

  return createElement(as, {
    ref,
    className: `${className ?? ""} ${styles.editable}`,
    contentEditable: true,
    suppressContentEditableWarning: true,
    spellCheck: false,
    onInput: handleInput,
    "data-field": apiKey,
  });
};
