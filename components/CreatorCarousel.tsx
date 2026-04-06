"use client";

import { useEffect, useState } from "react";
import CreatorCard from "./CreatorCard";
import { creators } from "@/app/lib/data";

export default function CreatorCarousel() {
  const [index, setIndex] = useState(0);

  const visibleCards = 4; // how many cards visible
  const total = creators.length;

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev + visibleCards >= total ? 0 : prev + visibleCards
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [total]);

  // NEXT
  const next = () => {
    setIndex((prev) =>
      prev + visibleCards >= total ? 0 : prev + visibleCards
    );
  };

  // PREV
  const prev = () => {
    setIndex((prev) =>
      prev - visibleCards < 0
        ? Math.max(total - visibleCards, 0)
        : prev - visibleCards
    );
  };

  return (
    <div className="relative">

      {/* LEFT BUTTON */}
      <button
        onClick={prev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
      >
        ◀
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={next}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
      >
        ▶
      </button>

      {/* CAROUSEL */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${index * (100 / visibleCards)}%)`,
          }}
        >
          {creators.map((creator) => (
            <div
              key={creator.id}
              className="min-w-[25%] px-3"
            >
              <CreatorCard creator={creator} />
            </div>
          ))}
        </div>
      </div>

      {/* DOTS */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({
          length: Math.ceil(total / visibleCards),
        }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i * visibleCards)}
            className={`w-3 h-3 rounded-full ${
              index / visibleCards === i
                ? "bg-secondary"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}