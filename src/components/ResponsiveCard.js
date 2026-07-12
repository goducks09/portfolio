import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { PrincipleCardWrapper, PrincipleNum } from './shared';

const Label = styled.div`
  visibility: hidden;
  font-family: 'DM Mono', monospace;
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  color: var(--gold);
  opacity: 0;
  margin-top: 1.5rem;
  transition: opacity 0.3s ease, visibility 0.3s ease, color 0.4s ease;
  text-align: left;
  text-transform: uppercase;
`;

const Inner = styled.div`
  transition: max-width 0.75s cubic-bezier(0.16, 1, 0.3, 1),
              border-right 0.75s ease;
  max-width: 100%;
  overflow: hidden;
  text-align: left;

  p {
    transition: font-size 0.55s ease, line-height 0.55s ease;
  }
`;

const ResponsiveCardWrapper = styled(PrincipleCardWrapper)`
  &:hover ${Label} {
    visibility: visible;
    opacity: 1;
  }

  &[data-state="tablet"] ${Inner} {
    max-width: 74%; 
    border-right: 2px solid rgba(201,169,110,0.12); 
  }

  &[data-state="mobile"] ${Inner} {
    max-width: 52%; 
    border-right: 2px solid rgba(126,231,135,0.18); 
    
    p {
      font-size: 0.88rem; 
      line-height: 1.45; 
    }
  }

  &[data-state="mobile"] ${Label} {
    color: #7ee787; 
  }
`;

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

  useEffect(() => {
    return () => {
      if (pc2Timer.current) clearInterval(pc2Timer.current);
    };
  }, []);

  return (
    <ResponsiveCardWrapper
      data-state={pc2State}
      role="presentation"
      onMouseEnter={startPc2Morph}
      onMouseLeave={stopPc2Morph}
    >
      <PrincipleNum>02</PrincipleNum>
      <Inner>
        <p>Responsive design that is cross-browser compatible.</p>
      </Inner>
      <Label>{pc2State}</Label>
    </ResponsiveCardWrapper>
  );
}
