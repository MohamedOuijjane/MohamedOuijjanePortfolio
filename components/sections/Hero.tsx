"use client";

import { useState, useEffect } from "react";
import { ScrollCue } from "@/components/ScrollCue";

export function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = ["< Hello world />"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const currentFullText = phrases[i];

      setText(
        isDeleting
          ? currentFullText.substring(0, text.length - 1)
          : currentFullText.substring(0, text.length + 1),
      );

      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && text === currentFullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-center py-20 font-mono"
    >
      <div className="w-full max-w-[95vw] px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-[#0B0F14] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          <span className="inline-block min-h-[1.2em] whitespace-nowrap">
            {text}
            <span className="inline-block w-2 h-[0.8em] ml-2 bg-teal-700 animate-pulse align-middle" />
          </span>
        </h1>
      </div>
      <ScrollCue />
    </section>
  );
}
