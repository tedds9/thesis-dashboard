import { useState, useEffect } from 'react';
import ChecklistView from './features/ChecklistView';
import { DASHBOARD_BRANDING } from '../data/researchData';
import '../configToken.css'; 
import './MainHub.css'; 

export default function MainHub() {
  const [activeFeature, setActiveFeature] = useState('checklist');
  
  // ⚡ Scroll Tracking States
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // 🔍 Fluid Text Slider Multiplier Scale (1.0 is standard neutral fallback)
  const [textScale, setTextScale] = useState(1.0);

  const features = [
    { id: 'checklist', label: '📋 Compliance Checklist', component: <ChecklistView /> }
  ];

  const currentFeature = features.find(f => f.id === activeFeature);

  // 🔄 Fluid Scroll Management Listener Hook
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div className="hub-wrapper" style={{ '--text-zoom-multiplier': textScale }}>
      
      {/* HUD HEADER PANEL */}
      <header className={`hub-navigation-bar ${!isVisible ? 'hub-hidden' : ''}`}>
        <div className="hub-brand-group">
          <div className="hub-brand">
            {DASHBOARD_BRANDING.schoolName} 
            <span className="hub-researcher-tag">By {DASHBOARD_BRANDING.researcherName}</span>
            <span className="hub-version-tag">| {DASHBOARD_BRANDING.presentationMode}</span>
          </div>
          
          {/* 🎚️ DYNAMIC SLIDER CONSOLE CONTROLS */}
          <div className="text-slider-container">
            <span className="slider-label">🔎 Text Size: {Math.round(textScale * 100)}%</span>
            <input 
              type="range" 
              min="0.75" 
              max="1.25" 
              step="0.05"
              value={textScale} 
              onChange={(e) => setTextScale(parseFloat(e.target.value))}
              className="hub-zoom-slider"
            />
          </div>
        </div>

        <div className="hub-tabs">
          {features.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFeature(f.id)}
              className={`hub-tab-btn ${activeFeature === f.id ? 'hub-active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      {/* VIEWPORT HEADER LABELS */}
      <div className="hub-viewport-header">
        <h1>{DASHBOARD_BRANDING.dashboardTitle}</h1>
        <p>{DASHBOARD_BRANDING.subTitle}</p>
      </div>

      {/* SANDBOX SCREEN INJECTION */}
      <main className="hub-viewport-area">
        {currentFeature ? currentFeature.component : <div className="error">View Error</div>}
      </main>
    </div>
  );
}
