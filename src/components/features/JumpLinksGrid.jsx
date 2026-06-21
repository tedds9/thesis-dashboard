import { researchData } from '../../data/researchData';
import './JumpLinksGrid.css';

export default function JumpLinksGrid() {
  const scrollToCard = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="quick-jump-panel">
      <span className="jump-box-label">⚡ Direct Section Jump Links:</span>
      <div className="jump-buttons-wrapper">
        {researchData.map((item) => (
          <button 
            key={item.id} 
            onClick={() => scrollToCard(item.id)}
            className="jump-anchor-btn"
          >
            Paragraph {item.letter}
          </button>
        ))}
      </div>
    </div>
  );
}


