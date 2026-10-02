"use client";

import React from "react";
import { gsap } from "gsap";

export interface TextScatterProps {
  text?: string;
  className?: string;
  as?: React.ElementType;
  velocity?: number;
  rotation?: number;
  scale?: number;
  returnAfter?: number;
  duration?: number;
}

const TextScatter: React.FC<TextScatterProps> = ({
  text = "Bounce Back.",
  className = "",
  as: Tag = "h1",
  velocity = 200,
  rotation = 90,
  scale = 1,
  returnAfter = 1,
  duration = 2,
}) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const dx = centerX - mouseX;
    const dy = centerY - mouseY;

    const angle = Math.atan2(dy, dx);

    const randomFactor = 0.8 + Math.random() * 0.4;
    const force = velocity * randomFactor;

    const moveX = Math.cos(angle) * force;
    const moveY = Math.sin(angle) * force;

    const rotate = (Math.random() - 0.5) * rotation * 2;

    gsap.to(target, {
      x: moveX,
      y: moveY,
      rotation: rotate,
      scale: scale,
      duration: duration,
      ease: "power4.out",
      overwrite: "auto",
      onComplete: () => {
        gsap.to(target, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: duration,
          delay: returnAfter,
          ease: "elastic.out(1, 0.3)",
          overwrite: "auto",
        });
      },
    });
  };

  const words = text.split(" ");

  return React.createElement(
    Tag,
    { className: `inline-block relative select-none ${className}` },
    words.map((word, wIdx) => (
      <span key={wIdx} className="inline-block whitespace-nowrap">
        {word.split("").map((char, cIdx) => (
          <span
            key={cIdx}
            className="inline-block relative cursor-default"
            onMouseEnter={handleMouseEnter}
            style={{ willChange: "transform" }}
          >
            {char}
          </span>
        ))}
        {wIdx < words.length - 1 && (
          <span
            className="inline-block relative cursor-default"
            onMouseEnter={handleMouseEnter}
            style={{ willChange: "transform" }}
          >
            {"\u00A0"}
          </span>
        )}
      </span>
    )),
  );
};

export default TextScatter;
