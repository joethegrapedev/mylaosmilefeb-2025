import React from 'react';

type AlertKind = 'error' | 'success' | 'info';

const styles: Record<AlertKind, string> = {
  error: 'bg-red-50 border-red-200 text-red-800',
  success: 'bg-green-50 border-green-200 text-green-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
};

export const Alert: React.FC<{ kind: AlertKind; children: React.ReactNode }> = ({
  kind,
  children,
}) => <div className={`rounded-md border px-4 py-3 text-sm ${styles[kind]}`}>{children}</div>;
