import React, { useState, useRef, useCallback, useEffect } from 'react';

export default function ResponsiveCard() {
  const [pc2State, setPc2State] = useState('desktop');
  const pc2Timer = useRef(null);

  const startPc2Morph = useCallback(() => {
    setPc2State('desktop');
    const states = ['desktop', 'tablet', 'mobile'];
    let idx = 0;
    pc2Timer.current = setInterval(() => {
      idx = (idx + 1) % states.length;
      setPc2State(states[idx]);
    }, 1100);
  }, []);

  const stopPc2Morph = useCallback(() => {
    if (pc2Timer.current) clearInterval(pc2Timer.current);
    setPc2State('desktop');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pc2Timer.current) clearInterval(pc2Timer.current);
    };
  }, []);

  return (
    <div
      className={`principle-card ${pc2State === 'tablet' ? 'p2-tablet' : pc2State === 'mobile' ? 'p2-mobile' : ''}`}
      id="pc2"
      role="presentation"
      onMouseEnter={startPc2Morph}
      onMouseLeave={stopPc2Morph}
    >
      <div className="principle-num">02</div>
      <div className="pc2-label">{pc2State}</div>
      <div className="pc2-inner">
        <p>Responsive design that is cross-browser compatible.</p>
      </div>
    </div>
  );
}
