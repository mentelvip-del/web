import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';

const TestingCanvas = ({ 
  isActive, 
  crosshairStyle, 
  targetSize, 
  onScoreUpdate, 
  onStatsUpdate,
  testDuration = 60 
}) => {
  const canvasRef = useRef(null);
  const [crosshairPosition, setCrosshairPosition] = useState({ x: 0, y: 0 });
  const [targets, setTargets] = useState([]);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [shots, setShots] = useState(0);
  const [timeLeft, setTimeLeft] = useState(testDuration);
  const [isTestActive, setIsTestActive] = useState(false);
  const [hitMarkers, setHitMarkers] = useState([]);
  const [combo, setCombo] = useState(0);
  const [lastHitTime, setLastHitTime] = useState(0);

  const targetSizes = {
    small: 20,
    medium: 30,
    large: 40
  };

  const crosshairStyles = {
    default: { size: 20, color: '#FF0000' },
    dot: { size: 8, color: '#FF0000' },
    cross: { size: 24, color: '#FF0000' }
  };

  // Initialize canvas and crosshair position
  useEffect(() => {
    if (canvasRef?.current) {
      const canvas = canvasRef?.current;
      const rect = canvas?.getBoundingClientRect();
      setCrosshairPosition({
        x: rect?.width / 2,
        y: rect?.height / 2
      });
    }
  }, []);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isTestActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTestActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTestActive, timeLeft]);

  // Target spawning logic
  useEffect(() => {
    let interval;
    if (isTestActive && canvasRef?.current) {
      interval = setInterval(() => {
        spawnTarget();
      }, 1500 + Math.random() * 1000);
    }
    return () => clearInterval(interval);
  }, [isTestActive]);

  // Update parent components with stats
  useEffect(() => {
    const accuracy = shots > 0 ? (hits / shots * 100) : 0;
    onStatsUpdate({
      accuracy: accuracy?.toFixed(1),
      hits,
      shots,
      score,
      combo,
      timeLeft
    });
    onScoreUpdate(score);
  }, [hits, shots, score, combo, timeLeft, onStatsUpdate, onScoreUpdate]);

  const spawnTarget = useCallback(() => {
    if (!canvasRef?.current) return;
    
    const canvas = canvasRef?.current;
    const rect = canvas?.getBoundingClientRect();
    const size = targetSizes?.[targetSize] || targetSizes?.medium;
    
    const newTarget = {
      id: Date.now() + Math.random(),
      x: Math.random() * (rect?.width - size * 2) + size,
      y: Math.random() * (rect?.height - size * 2) + size,
      size,
      speed: 0.5 + Math.random() * 1.5,
      direction: Math.random() * Math.PI * 2,
      life: 3000 + Math.random() * 2000
    };

    setTargets(prev => [...prev, newTarget]);

    // Remove target after its lifetime
    setTimeout(() => {
      setTargets(prev => prev?.filter(t => t?.id !== newTarget?.id));
    }, newTarget?.life);
  }, [targetSize]);

  const handleMouseMove = useCallback((e) => {
    if (!isActive) return;
    
    const canvas = canvasRef?.current;
    if (!canvas) return;
    
    const rect = canvas?.getBoundingClientRect();
    setCrosshairPosition({
      x: e?.clientX - rect?.left,
      y: e?.clientY - rect?.top
    });
  }, [isActive]);

  const handleTouchMove = useCallback((e) => {
    if (!isActive) return;
    e?.preventDefault();
    
    const canvas = canvasRef?.current;
    if (!canvas) return;
    
    const rect = canvas?.getBoundingClientRect();
    const touch = e?.touches?.[0];
    setCrosshairPosition({
      x: touch?.clientX - rect?.left,
      y: touch?.clientY - rect?.top
    });
  }, [isActive]);

  const handleShoot = useCallback((e) => {
    if (!isTestActive) return;
    
    e?.preventDefault();
    setShots(prev => prev + 1);
    
    const canvas = canvasRef?.current;
    if (!canvas) return;
    
    const rect = canvas?.getBoundingClientRect();
    let shootX, shootY;
    
    if (e?.type === 'click') {
      shootX = e?.clientX - rect?.left;
      shootY = e?.clientY - rect?.top;
    } else if (e?.type === 'touchstart') {
      const touch = e?.touches?.[0];
      shootX = touch?.clientX - rect?.left;
      shootY = touch?.clientY - rect?.top;
    } else {
      shootX = crosshairPosition?.x;
      shootY = crosshairPosition?.y;
    }

    // Check for hits
    let hitTarget = null;
    targets?.forEach(target => {
      const distance = Math.sqrt(
        Math.pow(shootX - target?.x, 2) + Math.pow(shootY - target?.y, 2)
      );
      if (distance <= target?.size) {
        hitTarget = target;
      }
    });

    if (hitTarget) {
      setHits(prev => prev + 1);
      setTargets(prev => prev?.filter(t => t?.id !== hitTarget?.id));
      
      const currentTime = Date.now();
      const timeDiff = currentTime - lastHitTime;
      
      if (timeDiff < 1000) {
        setCombo(prev => prev + 1);
      } else {
        setCombo(1);
      }
      
      setLastHitTime(currentTime);
      
      const comboMultiplier = Math.min(combo + 1, 5);
      const baseScore = 10;
      const bonusScore = baseScore * comboMultiplier;
      setScore(prev => prev + bonusScore);

      // Add hit marker
      const marker = {
        id: Date.now(),
        x: shootX,
        y: shootY,
        score: bonusScore,
        isHit: true
      };
      setHitMarkers(prev => [...prev, marker]);
      
      setTimeout(() => {
        setHitMarkers(prev => prev?.filter(m => m?.id !== marker?.id));
      }, 1000);
    } else {
      // Reset combo on miss
      setCombo(0);
      
      // Add miss marker
      const marker = {
        id: Date.now(),
        x: shootX,
        y: shootY,
        isHit: false
      };
      setHitMarkers(prev => [...prev, marker]);
      
      setTimeout(() => {
        setHitMarkers(prev => prev?.filter(m => m?.id !== marker?.id));
      }, 500);
    }
  }, [isTestActive, crosshairPosition, targets, combo, lastHitTime]);

  const startTest = () => {
    setIsTestActive(true);
    setScore(0);
    setHits(0);
    setShots(0);
    setCombo(0);
    setTimeLeft(testDuration);
    setTargets([]);
    setHitMarkers([]);
  };

  const stopTest = () => {
    setIsTestActive(false);
    setTargets([]);
  };

  const renderCrosshair = () => {
    const style = crosshairStyles?.[crosshairStyle] || crosshairStyles?.default;
    
    if (crosshairStyle === 'dot') {
      return (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: crosshairPosition?.x - style?.size / 2,
            top: crosshairPosition?.y - style?.size / 2,
            width: style?.size,
            height: style?.size,
            backgroundColor: style?.color,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        />
      );
    }
    
    if (crosshairStyle === 'cross') {
      return (
        <div
          className="absolute pointer-events-none z-50"
          style={{
            left: crosshairPosition?.x,
            top: crosshairPosition?.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div
            className="absolute"
            style={{
              width: 2,
              height: style?.size,
              backgroundColor: style?.color,
              left: -1,
              top: -style?.size / 2
            }}
          />
          <div
            className="absolute"
            style={{
              width: style?.size,
              height: 2,
              backgroundColor: style?.color,
              left: -style?.size / 2,
              top: -1
            }}
          />
        </div>
      );
    }
    
    // Default crosshair
    return (
      <div
        className="absolute pointer-events-none z-50"
        style={{
          left: crosshairPosition?.x,
          top: crosshairPosition?.y,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <Icon name="Crosshair" size={style?.size} color={style?.color} />
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full cursor-none relative"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={handleShoot}
        onTouchStart={handleShoot}
        style={{ touchAction: 'none' }}
      >
        {/* Targets */}
        {targets?.map(target => (
          <div
            key={target?.id}
            className="absolute bg-primary rounded-full border-2 border-white gaming-shadow-primary"
            style={{
              left: target?.x - target?.size / 2,
              top: target?.y - target?.size / 2,
              width: target?.size,
              height: target?.size,
              animation: 'pulse 0.5s ease-in-out infinite alternate'
            }}
          />
        ))}

        {/* Hit Markers */}
        {hitMarkers?.map(marker => (
          <div
            key={marker?.id}
            className={`absolute pointer-events-none z-40 font-bold text-sm ${
              marker?.isHit ? 'text-success' : 'text-error'
            }`}
            style={{
              left: marker?.x,
              top: marker?.y,
              transform: 'translate(-50%, -50%)',
              animation: 'fadeOut 1s ease-out forwards'
            }}
          >
            {marker?.isHit ? `+${marker?.score}` : 'MISS'}
          </div>
        ))}

        {/* Crosshair */}
        {isActive && renderCrosshair()}
      </div>
      {/* Start/Stop Controls */}
      {!isTestActive && timeLeft === testDuration && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Sensitivity Tester
            </h3>
            <p className="text-muted-foreground mb-6">
              Click targets as they appear to test your aim
            </p>
            <button
              onClick={startTest}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold gaming-shadow-primary hover:bg-secondary gaming-transition"
            >
              Start Test
            </button>
          </div>
        </div>
      )}
      {/* Test Complete */}
      {!isTestActive && timeLeft === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="text-center bg-card p-8 rounded-lg gaming-shadow-primary max-w-md mx-4">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
              Test Complete!
            </h3>
            <div className="space-y-2 mb-6">
              <p className="text-foreground">
                <span className="text-muted-foreground">Score:</span> {score}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Accuracy:</span> {shots > 0 ? ((hits / shots) * 100)?.toFixed(1) : 0}%
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Hits:</span> {hits}/{shots}
              </p>
              <p className="text-foreground">
                <span className="text-muted-foreground">Best Combo:</span> {combo}
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={startTest}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold gaming-shadow-primary hover:bg-secondary gaming-transition"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  setTimeLeft(testDuration);
                  setScore(0);
                  setHits(0);
                  setShots(0);
                  setCombo(0);
                }}
                className="bg-muted text-foreground px-6 py-2 rounded-lg font-semibold hover:bg-muted/80 gaming-transition"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeOut {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default TestingCanvas;