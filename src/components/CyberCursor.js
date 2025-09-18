import React, { useEffect, useState, useRef } from 'react';
import './CyberCursor.css';

const CyberCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState([]);
  const cursorRef = useRef(null);
  const trailRef = useRef([]);

  useEffect(() => {
    let animationId;
    
    const updatePosition = (e) => {
      const newPos = { x: e.clientX, y: e.clientY };
      
      // Direct position update for better accuracy
      setPosition(newPos);
      
      // Update trail
      trailRef.current = [...trailRef.current, { 
        x: newPos.x, 
        y: newPos.y, 
        id: Date.now() + Math.random() 
      }].slice(-8);
      
      setTrail([...trailRef.current]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = target.matches('a, button, input, textarea, [role="button"], .clickable, .project-card, .cert-card, .nav-link');
      setIsHovering(isInteractive);
      
      // Set cursor text based on element
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    const handleMouseOut = () => {
      setIsHovering(false);
    };

    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      cancelAnimationFrame(animationId);
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <>
      {/* Enhanced Cursor Trail */}
      {trail.map((pos, index) => (
        <div
          key={pos.id}
          className="cursor-trail"
          style={{
            left: pos.x - 3,
            top: pos.y - 3,
            opacity: (index + 1) / trail.length * 0.6,
            transform: `scale(${(index + 1) / trail.length * 0.9})`,
            animationDelay: `${index * 0.02}s`
          }}
        />
      ))}
      
      {/* Main Enhanced Cursor */}
      <div
        ref={cursorRef}
        className={`cyber-cursor ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{
          left: position.x,
          top: position.y,
        }}
      >
        {/* Outer Rings */}
        <div className="cursor-outer">
          <div className="cursor-ring primary"></div>
          <div className="cursor-ring secondary"></div>
          <div className="cursor-ring tertiary"></div>
        </div>
        
        {/* Inner Core */}
        <div className="cursor-core">
          <div className="cursor-dot"></div>
          <div className="cursor-pulse"></div>
          <div className="cursor-glow"></div>
        </div>
        
        {/* Dynamic Scanning Lines */}
        <div className="cursor-scan-h"></div>
        <div className="cursor-scan-v"></div>
        <div className="cursor-scan-diagonal-1"></div>
        <div className="cursor-scan-diagonal-2"></div>
        
        {/* Enhanced Corner Brackets */}
        <div className="cursor-bracket top-left"></div>
        <div className="cursor-bracket top-right"></div>
        <div className="cursor-bracket bottom-left"></div>
        <div className="cursor-bracket bottom-right"></div>
        
        {/* Cursor Text removed per request */}
        
        {/* Particle Effects */}
        <div className="cursor-particles">
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`cursor-particle particle-${i + 1}`}></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CyberCursor;