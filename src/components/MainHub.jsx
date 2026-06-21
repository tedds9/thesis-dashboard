import { useState } from 'react';
import ChecklistView from './features/ChecklistView';
import { DASHBOARD_BRANDING } from '../data/researchData';
import './MainHub.css'; 

export default function MainHub() {
  const [activeFeature, setActiveFeature] = useState('checklist');

  const features = [
    { id: 'checklist', label: '📋 Compliance Checklist', component: <ChecklistView /> }
  ];

  const currentFeature = features.find(f => f.id === activeFeature);

  return (
    <div className="hub-wrapper">
      {/* HUD HEADER PANEL */}
      <header className="hub-navigation-bar">
        <div className="hub-brand">
          {DASHBOARD_BRANDING.schoolName} <span className="hub-version-tag">| {DASHBOARD_BRANDING.presentationMode}</span>
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
