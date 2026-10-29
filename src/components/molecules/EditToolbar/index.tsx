import { useState } from "react";
import { useEditMode } from "@/context/EditModeContext";
import styles from "./EditToolbar.module.scss";

/**
 * Renders the edit-mode UI: a login modal (when ?edit=1 opens it or the user
 * isn't authenticated yet) and, once authenticated, a floating toolbar with
 * Publish / Exit controls and a dirty-state indicator.
 *
 * All real authorization happens server-side; this is only the UI shell.
 */
export const EditToolbar = () => {
  const {
    authenticated,
    editing,
    loginOpen,
    pending,
    dirty,
    setLoginOpen,
    setAuthenticated,
    startEditing,
    stopEditing,
    clearPending,
  } = useEditMode();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const pendingCount = Object.keys(pending).length;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Login failed.");
        return;
      }
      setAuthenticated(true);
      setLoginOpen(false);
      setPassword("");
      startEditing();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handlePublish = async () => {
    if (!dirty) return;
    setBusy(true);
    setStatus(null);
    setError(null);
    try {
      const res = await fetch("/api/admin/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ edits: Object.values(pending) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Publish failed.");
        return;
      }
      setStatus("Published! Changes are live.");
      clearPending();
    } catch {
      setError("Network error while publishing.");
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    stopEditing();
  };

  // --- Login modal ---
  if (loginOpen && !authenticated) {
    return (
      <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Edit mode login">
        <form className={styles.loginCard} onSubmit={handleLogin}>
          <h3 className={styles.loginTitle}>Edit mode</h3>
          <p className={styles.loginHint}>Sign in to edit this page.</p>
          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.loginActions}>
            <button type="button" className={styles.secondaryBtn} onClick={() => setLoginOpen(false)}>
              Cancel
            </button>
            <button type="submit" className={styles.primaryBtn} disabled={busy}>
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- Floating toolbar (authenticated) ---
  if (authenticated) {
    return (
      <div className={styles.toolbar}>
        <span className={styles.badge}>
          {editing ? "Editing" : "Edit mode"}
          {dirty && <span className={styles.dot} title={`${pendingCount} unsaved change(s)`} />}
        </span>

        {!editing && (
          <button className={styles.primaryBtn} onClick={startEditing}>
            Start editing
          </button>
        )}

        {editing && (
          <>
            <button
              className={styles.primaryBtn}
              onClick={handlePublish}
              disabled={!dirty || busy}
            >
              {busy ? "Publishing…" : dirty ? `Publish (${pendingCount})` : "Nothing to publish"}
            </button>
            <button className={styles.secondaryBtn} onClick={stopEditing} disabled={busy}>
              Discard
            </button>
          </>
        )}

        <button className={styles.ghostBtn} onClick={handleLogout} disabled={busy}>
          Exit
        </button>

        {status && <span className={styles.status}>{status}</span>}
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }

  return null;
};
