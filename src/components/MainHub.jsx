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

  // 🎨 Global Color Space Theme Toggles
  const [isLightMode, setIsLightMode] = useState(false);

  const features = [
    { id: 'checklist', label: '📋 Compliance Checklist', component: <ChecklistView /> }
  ];

  const currentFeature = features.find(f => f.id === activeFeature);

  // 🔄 Fluid Scroll Management Listener Hook with Intentional Up-Scroll Tolerance
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollY;
      const scrollTolerance = 15; // ⚡ FIXED: Minimum pixel threshold to verify intentional up-scroll direction

      // Absolute top state rule
      if (currentScrollY < 15) {
        setIsVisible(true);
        return;
      }

      // Scrolling Down -> Hide Navigation Panel Bar
      if (scrollDifference > 0 && currentScrollY > 60) {
        setIsVisible(false);
      } 
      // Scrolling Up -> Show Bar ONLY if user clears the deliberate gap limit threshold
      else if (scrollDifference < -scrollTolerance) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // ☀️ Synchronize Theme Token Toggles Directly to Document Root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isLightMode ? 'light' : 'dark');
  }, [isLightMode]);

  return (
    <div className="hub-wrapper" style={{ '--text-zoom-multiplier': textScale }}>
      
      {/* HUD HEADER PANEL */}
      <header className={`hub-navigation-bar ${!isVisible ? 'hub-hidden' : ''}`}>
        
        {/* BRANDING HUB LEFT NODE */}
        <div className="hub-brand-group">
          <div className="hub-brand">
            {DASHBOARD_BRANDING.schoolName} 
            <span className="hub-researcher-tag">By {DASHBOARD_BRANDING.researcherName}</span>
            <span className="hub-version-tag">| {DASHBOARD_BRANDING.presentationMode}</span>
          </div>
        </div>

        {/* 🎚️ CONTROL PANEL CONSOLE */}
        <div className="hub-console-controls">
          <button 
            className="hub-theme-toggle-btn"
            onClick={() => setIsLightMode(!isLightMode)}
            aria-label="Toggle Dashboard Color Mode Matrix"
          >
            {isLightMode ? '🌙 DARK' : '☀️ LIGHT'}
          </button>

          <div className="text-slider-container">
            <span className="slider-label">🔎 Text: {Math.round(textScale * 100)}%</span>
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

        {/* NAVIGATION TAB CONTROLLER */}
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
