"use client";

import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

function Firework() {
  return <Fireworks autorun={{ speed: 3, duration: 3000 }} />;
}

export default Firework;
