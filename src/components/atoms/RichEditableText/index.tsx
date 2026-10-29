import { useEffect, useRef, useState } from "react";
import { useEditMode, editKey } from "@/context/EditModeContext";
import { RichText } from "@/components/atoms/RichText";
import styles from "./RichEditableText.module.scss";

interface RichEditableTextProps {
  recordId?: string;
  typename?: string;
  apiKey?: string;
  /** The current HTML value from the CMS. */
  html?: string;
  className?: string;
}

/**
 * Inline rich-text editor for HTML "bodycopy"-style fields. When edit mode is
 * active (authenticated + editing + has record metadata), it renders a
 * contentEditable region with a small floating format bar and reports the
 * edited innerHTML to EditModeContext. Otherwise it renders the normal
 * animated <RichText>.
 *
 * The submitted HTML is sanitized server-side on publish — never trust it here.
 */
export const RichEditableText = ({
  recordId,
  typename,
  apiKey,
  html,
  className,
}: RichEditableTextProps) => {
  const { authenticated, editing, registerEdit, pending } = useEditMode();
  const ref = useRef<HTMLDivElement>(null);
  const [showBar, setShowBar] = useState(false);

  const canEdit =
    authenticated && editing && Boolean(recordId && typename && apiKey);

  const pendingValue =
    recordId && apiKey ? pending[editKey(recordId, apiKey)]?.value : undefined;
  const displayHtml = pendingValue ?? html ?? "";

  // Seed the contentEditable DOM once when entering edit mode.
  useEffect(() => {
    if (canEdit && ref.current && ref.current.innerHTML !== displayHtml) {
      ref.current.innerHTML = displayHtml;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canEdit]);

  const capture = () => {
    if (!recordId || !typename || !apiKey || !ref.current) return;
    registerEdit({
      recordId,
      typename,
      apiKey,
      value: ref.current.innerHTML,
    });
  };

  const exec = (command: string, value?: string) => {
    // document.execCommand is deprecated but remains the simplest reliable way
    // to do lightweight inline HTML editing across browsers.
    document.execCommand(command, false, value);
    ref.current?.focus();
    capture();
  };

  const addLink = () => {
    const url = window.prompt("Link URL:");
    if (url) exec("createLink", url);
  };

  if (!canEdit) {
    return <RichText html={displayHtml} className={className} />;
  }

  return (
    <div className={styles.wrapper}>
      {showBar && (
        <div className={styles.formatBar} onMouseDown={(e) => e.preventDefault()}>
          <button type="button" onClick={() => exec("bold")} title="Bold"><b>B</b></button>
          <button type="button" onClick={() => exec("italic")} title="Italic"><i>I</i></button>
          <button type="button" onClick={() => exec("underline")} title="Underline"><u>U</u></button>
          <button type="button" onClick={() => exec("insertUnorderedList")} title="Bulleted list">• List</button>
          <button type="button" onClick={() => exec("insertOrderedList")} title="Numbered list">1. List</button>
          <button type="button" onClick={addLink} title="Add link">Link</button>
          <button type="button" onClick={() => exec("removeFormat")} title="Clear formatting">Clear</button>
        </div>
      )}
      <div
        ref={ref}
        className={`${className ?? ""} ${styles.editable}`}
        contentEditable
        suppressContentEditableWarning
        onInput={capture}
        onFocus={() => setShowBar(true)}
        onBlur={() => setTimeout(() => setShowBar(false), 150)}
        data-field={apiKey}
      />
    </div>
  );
};
