'use client';

import './mobileMenuToggle.css';

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: (open: boolean) => void;
}

export function MobileMenuToggle({ isOpen, onToggle }: MobileMenuToggleProps) {
  return (
    <div className="menu-toggle">
      <input
        type="checkbox"
        id="hamburger"
        className="hamburger-checkbox"
        checked={isOpen}
        onChange={(e) => onToggle(e.target.checked)}
      />
      <label htmlFor="hamburger" className="hamburger-label">
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </label>
    </div>
  );
}

