"use client";

import { useEffect, useState } from "react";
import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 60,
  particles: {
    number: { value: 50, density: { enable: true, width: 800, height: 800 } },
    color: { value: "#3b82f6" },
    opacity: {
      value: { min: 0.15, max: 0.35 },
    },
    shape: { type: "circle" },
    size: {
      value: { min: 1, max: 2.5 },
    },
    move: {
      enable: true,
      speed: 0.3,
      direction: "none",
      random: true,
      outModes: "out",
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: { onHover: { enable: false }, onClick: { enable: false } },
  },
  links: { enable: false },
  background: { color: "transparent" },
};

export default function HeroParticles() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-80">
      <Particles
        id="hero-particles"
        options={options}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
