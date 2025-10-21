"use client";

import { useEffect, useState } from "react";

interface TypewriterEffectProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  cursorClassName?: string;
  onComplete?: () => void;
}

export function TypewriterEffect({
  text,
  speed = 50,
  delay = 0,
  className = "",
  cursorClassName = "",
  onComplete
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, currentIndex === 0 ? delay : speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, delay, isComplete, onComplete]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && (
        <span
          className={`inline-block w-0.5 h-[1em] bg-current animate-pulse ${cursorClassName}`}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
