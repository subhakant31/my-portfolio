import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/**
 * A single pending edit, keyed by the DatoCMS record id + field api_key.
 * `typename` (GraphQL __typename, e.g. "HerobannerRecord") lets the publish
 * route resolve the model when writing back.
 */
export interface PendingEdit {
  recordId: string;
  typename: string;
  apiKey: string; // snake_case DatoCMS field api_key
  value: string;
}

interface EditModeContextType {
  /** Whether the admin is authenticated (server-verified). */
  authenticated: boolean;
  /** Whether inline editing is currently active. */
  editing: boolean;
  /** Whether the login modal is open. */
  loginOpen: boolean;
  /** Pending (unsaved) edits keyed by `recordId:apiKey`. */
  pending: Record<string, PendingEdit>;
  /** True if there are unsaved edits. */
  dirty: boolean;
  setLoginOpen: (open: boolean) => void;
  setAuthenticated: (value: boolean) => void;
  startEditing: () => void;
  stopEditing: () => void;
  registerEdit: (edit: PendingEdit) => void;
  clearPending: () => void;
  refreshAuth: () => Promise<void>;
}

const noop = () => {};

const EditModeContext = createContext<EditModeContextType>({
  authenticated: false,
  editing: false,
  loginOpen: false,
  pending: {},
  dirty: false,
  setLoginOpen: noop,
  setAuthenticated: noop,
  startEditing: noop,
  stopEditing: noop,
  registerEdit: noop,
  clearPending: noop,
  refreshAuth: async () => {},
});

export const editKey = (recordId: string, apiKey: string) =>
  `${recordId}:${apiKey}`;

export const EditModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [pending, setPending] = useState<Record<string, PendingEdit>>({});

  const refreshAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/me");
      const data = await res.json();
      setAuthenticated(Boolean(data?.authenticated));
    } catch {
      setAuthenticated(false);
    }
  }, []);

  // On mount, if the URL carries ?edit=1, check whether a session already
  // exists and open the login modal otherwise.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("edit") === "1") {
      refreshAuth().then(() => setLoginOpen(true));
    }
  }, [refreshAuth]);

  const registerEdit = useCallback((edit: PendingEdit) => {
    setPending((prev) => ({ ...prev, [editKey(edit.recordId, edit.apiKey)]: edit }));
  }, []);

  const clearPending = useCallback(() => setPending({}), []);

  const startEditing = useCallback(() => setEditing(true), []);
  const stopEditing = useCallback(() => {
    setEditing(false);
    setPending({});
  }, []);

  const value = useMemo<EditModeContextType>(
    () => ({
      authenticated,
      editing,
      loginOpen,
      pending,
      dirty: Object.keys(pending).length > 0,
      setLoginOpen,
      setAuthenticated,
      startEditing,
      stopEditing,
      registerEdit,
      clearPending,
      refreshAuth,
    }),
    [
      authenticated,
      editing,
      loginOpen,
      pending,
      startEditing,
      stopEditing,
      registerEdit,
      clearPending,
      refreshAuth,
    ]
  );

  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => useContext(EditModeContext);
