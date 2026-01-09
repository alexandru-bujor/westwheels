'use client';

import { Button } from '../ui/button/Button';
import './heroSection.css';

export function HeroSection() {
  return (
    <div className="hero-section">
      {/* Background Image Effect */}
      <div 
        className="hero-background"
        style={{
          backgroundImage: 'url(https://topexpert.ro/wp-content/uploads/2016/02/vapor-1.jpg)',
        }}
      />
      
      {/* Overlay */}
      <div className="hero-overlay" />
      
      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">
          BUYING & SHIPPING<br />
          AMERICAN AUTOMOBILES
        </h1>
        <p className="hero-subtitle">
          With &quot;Home Delivery&quot; option available never been so fast and so easy
        </p>
        <div className="hero-buttons">
          <Button variant="primary" size="lg" className="hero-button hero-button-primary">
            Start bidding
          </Button>
          <Button variant="outline" size="lg" className="hero-button hero-button-outline">
            How it works
          </Button>
        </div>
      </div>
    </div>
  );
}

