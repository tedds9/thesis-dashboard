import JumpLinksGrid from './JumpLinksGrid';
import ChecklistCards from './ChecklistCards';
import './ChecklistView.css';

export default function ChecklistView() {
  return (
    <div className="feature-sandbox">
      <JumpLinksGrid />
      <ChecklistCards />
    </div>
  );
}
