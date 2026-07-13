"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealTag = keyof JSX.IntrinsicElements;

export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: RevealTag;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-80px", threshold: 0.1 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${delay * 0.06}s, transform 0.55s ease ${delay * 0.06}s`,
      }}
    >
      {children}
    </Tag>
  );
}

export function RevealWords({
  text,
  className,
  wordClassName,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
}) {
  const words = text.split(" ");

  return (
    <span className={className} style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span
          key={i}
          className={wordClassName}
          style={{
            display: "inline-block",
            opacity: 0,
            transform: "translateY(24px)",
            animation: `reveal-up 0.55s ease forwards ${i * 45}ms`,
          }}
        >
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
