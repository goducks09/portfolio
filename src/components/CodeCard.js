import React, { useState, useRef, useCallback, useEffect } from 'react';

const RAW = `def write_code() -> dict:\n    """Clean. Readable. Maintainable."""\n    return {\n        "readable":     True,\n        "maintainable": True,\n        "next_dev":     "grateful"\n    }`;

const TypewrittenCode = ({ state }) => {
  if (state.highlighted) {
    return (
      <>
        <span className="t-kw">def</span> <span className="t-fn">write_code</span><span className="t-pu">() -&gt; </span><span className="t-kw">dict</span>:{"\n"}
        {"    "}<span className="t-st">"""Clean. Readable. Maintainable."""</span>{"\n"}
        {"    "}<span className="t-kw">return</span> <span className="t-pu">{"{"}</span>{"\n"}
        {"        "}<span className="t-st">"readable"</span>:     <span className="t-bo">True</span>,{"\n"}
        {"        "}<span className="t-st">"maintainable"</span>: <span className="t-bo">True</span>,{"\n"}
        {"        "}<span className="t-st">"next_dev"</span>:     <span className="t-st">"grateful"</span>{"\n"}
        {"    "}<span className="t-pu">{"}"}</span>
      </>
    );
  }

  return (
    <>
      {state.text}
      {state.typing && <span className="t-cursor" />}
    </>
  );
};

export default function CodeCard() {
  const [pc1State, setPc1State] = useState({
    typing: false,
    text: '',
    highlighted: false,
    opacity: 1
  });
  const pc1Timer = useRef(null);
  const pc1CompileTimer = useRef(null);

  const startPc1Typing = useCallback(() => {
    if (pc1Timer.current) clearInterval(pc1Timer.current);
    if (pc1CompileTimer.current) clearTimeout(pc1CompileTimer.current);

    setPc1State({ typing: true, text: '', highlighted: false, opacity: 1 });
    let idx = 0;

    pc1Timer.current = setInterval(() => {
      if (idx < RAW.length) {
        const char = RAW[idx];
        setPc1State(prev => ({ ...prev, text: prev.text + char }));
        idx++;
      } else {
        clearInterval(pc1Timer.current);
        pc1CompileTimer.current = setTimeout(() => {
          setPc1State(prev => ({ ...prev, opacity: 0.2 }));
          setTimeout(() => {
            setPc1State(prev => ({ ...prev, highlighted: true, opacity: 1 }));
          }, 130);
        }, 360);
      }
    }, 18);
  }, []);

  const stopPc1Typing = useCallback(() => {
    if (pc1Timer.current) clearInterval(pc1Timer.current);
    if (pc1CompileTimer.current) clearTimeout(pc1CompileTimer.current);
    setPc1State({ typing: false, text: '', highlighted: false, opacity: 1 });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pc1Timer.current) clearInterval(pc1Timer.current);
      if (pc1CompileTimer.current) clearTimeout(pc1CompileTimer.current);
    };
  }, []);

  return (
    <div
      className="principle-card"
      id="pc1"
      role="presentation"
      onMouseEnter={startPc1Typing}
      onMouseLeave={stopPc1Typing}
    >
      <div className="pc1-prose">
        <div className="principle-num">01</div>
        <p>Write clean, maintainable code that the next developer can understand at a glance.</p>
      </div>
      <div className="pc1-terminal" aria-hidden="true" style={(pc1State.typing || pc1State.highlighted) ? { opacity: pc1State.opacity } : {}}>
        <div className="terminal-bar">
          <span className="t-dot t-dot-r"></span>
          <span className="t-dot t-dot-y"></span>
          <span className="t-dot t-dot-g"></span>
          <span className="terminal-fname">principle_01.py</span>
        </div>
        <pre className="terminal-pre">
          <TypewrittenCode state={pc1State} />
        </pre>
      </div>
    </div>
  );
}
