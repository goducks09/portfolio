import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { PrincipleCardWrapper, PrincipleNum } from './shared';

const RAW = `def write_code() -> dict:\n    """Clean. Readable. Maintainable."""\n    return {\n        "readable":     True,\n        "maintainable": True,\n        "next_dev":     "grateful"\n    }`;

const tblink = keyframes`
  0%, 100% { opacity: 0.75; }
  50% { opacity: 0; }
`;

const Prose = styled.div`
  transition: opacity 0.32s ease, transform 0.32s ease;
`;

const Terminal = styled.div`
  position: absolute;
  inset: 0;
  padding: 1.25rem 1.5rem;
  background: #0d1117;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 0.32s ease, transform 0.32s ease;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  text-align: left;
`;

const CodeCardWrapper = styled(PrincipleCardWrapper)`
  &:hover ${Prose} {
    opacity: 0;
    transform: translateY(-10px);
  }

  &:hover ${Terminal} {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const TerminalBar = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 0.65rem;
  margin-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  flex-shrink: 0;
`;

const Dot = styled.span`
  width: 9px; height: 9px; border-radius: 50%;
  background: ${props => props.$color};
`;

const TerminalFname = styled.span`
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  color: rgba(255,255,255,0.22);
  margin-left: 6px;
  letter-spacing: 0.04em;
`;

const TerminalPre = styled.pre`
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  line-height: 1.65;
  margin: 0;
  white-space: pre-wrap;
  flex: 1;
  overflow: hidden;
  color: rgba(201,169,110,0.85);

  .t-cm  { color: #4a5568; }
  .t-kw  { color: #d2a8ff; }
  .t-fn  { color: #e2c08d; }
  .t-st  { color: #a5d6ff; }
  .t-bo  { color: #79c0ff; }
  .t-pu  { color: #c9d1d9; }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 6px; height: 0.9em;
  background: var(--gold);
  opacity: 0.75;
  vertical-align: text-bottom;
  animation: ${tblink} 0.9s step-end infinite;
`;

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
      {state.typing && <Cursor />}
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

  useEffect(() => {
    return () => {
      if (pc1Timer.current) clearInterval(pc1Timer.current);
      if (pc1CompileTimer.current) clearTimeout(pc1CompileTimer.current);
    };
  }, []);

  return (
    <CodeCardWrapper
      role="presentation"
      onMouseEnter={startPc1Typing}
      onMouseLeave={stopPc1Typing}
    >
      <Prose>
        <PrincipleNum>01</PrincipleNum>
        <p>Write clean, maintainable code that the next developer can understand at a glance.</p>
      </Prose>
      <Terminal aria-hidden="true" style={(pc1State.typing || pc1State.highlighted) ? { opacity: pc1State.opacity } : {}}>
        <TerminalBar>
          <Dot $color="#ff5f57" />
          <Dot $color="#ffbd2e" />
          <Dot $color="#28ca41" />
          <TerminalFname>principle_01.py</TerminalFname>
        </TerminalBar>
        <TerminalPre>
          <TypewrittenCode state={pc1State} />
        </TerminalPre>
      </Terminal>
    </CodeCardWrapper>
  );
}
