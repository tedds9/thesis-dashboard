import { useState } from 'react';
import { researchData } from '../../data/researchData';
import ResearchCardItem from './ResearchCardItem';
import './ChecklistCards.css';

export default function ChecklistCards() {
  const categories = ['All Blocks', ...new Set(researchData.map(item => item.category))];
  const [activeCategory, setActiveCategory] = useState('All Blocks');

  const filteredData = activeCategory === 'All Blocks' 
    ? researchData 
    : researchData.filter(item => item.category === activeCategory);

  return (
    <div className="cards-module-wrapper">
      {/* CHAPTER FILTER TABS */}
      <nav className="category-ribbon">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`ribbon-tab ${activeCategory === cat ? 'tab-active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </nav>

      {/* DYNAMIC LIST CORES */}
      <div className="simple-list">
        {filteredData.map((item) => (
          <ResearchCardItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
