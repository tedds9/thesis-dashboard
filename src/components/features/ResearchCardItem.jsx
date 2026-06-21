import { useState } from 'react';
import './ResearchCardItem.css';

export default function ResearchCardItem({ item }) {
  // Each individual card manages its own hidden detail toggles independently
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeepDiveOpen, setIsDeepDiveOpen] = useState(false);

  const handleCardToggle = () => {
    setIsExpanded(!isExpanded);
    setIsDeepDiveOpen(false); // Reset the internal explanation tray when closed
  };

  const toggleDeepDive = (e) => {
    e.stopPropagation(); // Stops the dropdown click from closing the whole card frame
    setIsDeepDiveOpen(!isDeepDiveOpen);
  };

  return (
    <div 
      id={item.id} 
      className={`simple-card ${isExpanded ? 'card-expanded-border' : 'card-clickable-preview'}`}
      onClick={handleCardToggle}
    >
      {/* Badge Indicator */}
      <div className={`card-badge ${isExpanded ? 'badge-active' : ''}`}>
        {item.letter}
      </div>
      
      <div className="card-content">
        <span className="category-tag">{item.category}</span>
        <h2>{item.title}</h2>
        
        {!isExpanded ? (
          <div className="click-prompt-hint">➡️ Click this paragraph section to inspect definitions & scripts</div>
        ) : (
          <div className="expanded-content-view animate-fadeIn">
            <div className="compliance-marker">✓ Grading Rubric Alignment Verified</div>

            {item.academicText && (
              <div className="academic-box">
                <span className="box-label">Your Drafted Manuscript Block:</span>
                <p>"{item.academicText}"</p>
              </div>
            )}

            {/* DYNAMIC DEEP DIVE ACCORDION PANEL */}
            {item.paragraphDeepDive && (
              <div className="deep-dive-container">
                <button 
                  onClick={toggleDeepDive}
                  className={`deep-dive-trigger-btn ${isDeepDiveOpen ? 'dive-active' : ''}`}
                >
                  {isDeepDiveOpen ? '💡 Hide Paragraph Deep Dive' : '💡 Reveal Full Paragraph Explanation'}
                </button>

                {isDeepDiveOpen && (
                  <div className="deep-dive-content-panel">
                    <div className="dive-section">
                      <span className="dive-section-label">🎯 What This Whole Paragraph Solves:</span>
                      <p className="dive-text">{item.paragraphDeepDive.corePurpose}</p>
                    </div>

                    <div className="dive-section">
                      <span className="dive-section-label">📚 Word-by-Word Structural Translation:</span>
                      <div className="jargon-glossary-list">
                        {item.paragraphDeepDive.structuralBreakdown.map((row, i) => (
                          <div key={i} className="glossary-row">
                            <span className="jargon-term">{row.jargon}</span>
                            <span className="glossary-arrow">→</span>
                            <span className="jargon-plain">{row.simple}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="dive-section">
                      <span className="dive-section-label">🚨 Proactive Panel Defenses (Expected Traps):</span>
                      <div className="trap-box-stack">
                        {item.paragraphDeepDive.panelTraps.map((trap, i) => (
                          <div key={i} className="trap-item">
                            <p className="trap-q"><strong>Panel Trap:</strong> "{trap.question}"</p>
                            <p className="trap-a"><strong>Your Counter:</strong> {trap.defense}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="explanation-box">
              <span className="box-label">What It Means Simply:</span>
              <p>{item.explanation}</p>
            </div>

            {item.defenseScript1 && (
              <div className="script-box primary-script">
                <span className="box-label">🗣️ Panel Defense Strategy (Approach 1):</span>
                <p>{item.defenseScript1}</p>
              </div>
            )}

            {item.defenseScript2 && (
              <div className="script-box secondary-script">
                <span className="box-label">🗣️ Panel Defense Strategy (Approach 2):</span>
                <p>{item.defenseScript2}</p>
              </div>
            )}
            
            {item.sources && item.sources.length > 0 && (
              <div className="link-container">
                <span className="box-label">Verified Literature Links:</span>
                <div className="links-flex-wrapper">
                  {item.sources.map((src, idx) => (
                    <a 
                      key={idx} 
                      href={src.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="simple-link-btn"
                      onClick={(e) => e.stopPropagation()} // Stops click from closing the parent card frame
                    >
                      <span>{src.label}</span>
                      <span className="link-arrow">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
