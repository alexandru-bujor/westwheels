'use client';

import { ArrowRight, UserPlus } from 'lucide-react';
import './headerActions.css';

export function HeaderActions() {
  return (
    <div className="buttons-right" id="not-logged-buttons">
      <a
        href="/login"
        className="header-btn header-btn--login"
      >
        <ArrowRight className="header-btn-icon" />
        Log In
      </a>
      <a
        href="/signup"
        className="header-btn header-btn--signup"
      >
        <UserPlus className="header-btn-icon" />
        Sign Up
      </a>
    </div>
  );
}

