import { createContext, useContext } from 'react';

// Lets a section editor tell the shell to re-fetch sidebar draft/published
// badges after it saves, publishes, or discards.
export interface AdminStatusContextValue {
  refresh: () => void;
}

export const AdminStatusContext = createContext<AdminStatusContextValue>({
  refresh: () => {},
});

export const useAdminStatus = () => useContext(AdminStatusContext);
