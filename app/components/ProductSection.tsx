"use client";
import { useState } from "react";

function ProductSection({ title, info }: { title: string; info: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b pb-4 mb-4">
      <div className="flex text-xl items-center justify-between mb-2">
        <header className="font-semibold">{title}</header>
        <button
          className="text-2xl transition-transform duration-500 ease-in-out"
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? "−" : "+"}
        </button>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          expanded ? "max-h-96" : "max-h-0"
        }`}
      >
        <article>
          <p className="text-pretty">{info}</p>
        </article>
      </div>
    </div>
  );
}

export default ProductSection;
