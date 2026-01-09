'use client';

import { useState } from 'react';
import { Logo } from './Logo';
import { SearchBar } from './SearchBar';
import { HeaderActions } from './HeaderActions';
import { MobileMenuToggle } from './MobileMenuToggle';
import { NavigationMenu } from './NavigationMenu';
import { QuickLinks } from './QuickLinks';
import './header.css';
import './topBar.css';
import './linksLine.css';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCurrentActive, setIsCurrentActive] = useState(true);

  const handleMenuToggle = (open: boolean) => {
    setIsMenuOpen(open);
    // Prevent body scroll when menu is open
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  return (
    <header className="header_top smart-scroll">
      <div className="top_bar">
        <div className="container">
          <div className="top_bar_content">
            <Logo />
            <SearchBar 
              isCurrentActive={isCurrentActive}
              onCurrentClick={() => setIsCurrentActive(true)}
              onArchivedClick={() => setIsCurrentActive(false)}
            />
            <HeaderActions />
            <MobileMenuToggle isOpen={isMenuOpen} onToggle={handleMenuToggle} />
          </div>
        </div>
      </div>

      <div className="links_line">
        <div className="container">
          <div className="links_line_content">
            <NavigationMenu />
            <QuickLinks />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMenuOpen ? 'active' : ''}`} onClick={() => handleMenuToggle(false)}>
        <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu-header">
            <Logo />
            <button 
              className="mobile-menu-close"
              onClick={() => handleMenuToggle(false)}
              aria-label="Close menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>
          <div className="mobile-menu-content">
            <NavigationMenu />
            <QuickLinks />
          </div>
        </div>
      </div>
    </header>
  );
}
