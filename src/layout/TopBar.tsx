type TopBarProps = {
  activePiece: string;
  activeLabel: string;
  position: string;
  focus: string;
};

export function TopBar({ activePiece, activeLabel, position, focus }: TopBarProps) {
  return (
    <header className="topbar">
      <div className="topbar__left">
        <span className="topbar__name">JOEL VEGA</span>
      </div>

      <div className="topbar__right">
        <span className="topbar__meta">Position: {position}</span>
        <span className="topbar__meta">
          Active Piece: {activePiece} {activeLabel}
        </span>
        <span className="topbar__meta">Focus: {focus}</span>
      </div>
    </header>
  );
}