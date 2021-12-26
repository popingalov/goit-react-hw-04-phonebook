import { useState, useEffect } from 'react';
export default function ContactsHook(name) {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(name)) ?? [];
  });
  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(state));
  });
  return [state, setState];
}
