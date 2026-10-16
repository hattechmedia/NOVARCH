'use client';

import * as React from 'react';

export function useFormToken(): string {
  const [token, setToken] = React.useState('');

  React.useEffect(() => {
    let cancelled = false;
    fetch('/api/form-token')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled && typeof data?.token === 'string') setToken(data.token);
      })
      .catch(() => {
        if (!cancelled) setToken('');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return token;
}
