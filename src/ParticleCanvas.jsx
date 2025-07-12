import ParticlesCanvas from "./particle-canvas";
import { useEffect, useRef } from "react";
import "./index.css";

export default function ParticleCanvas({ children }) {
  const canvas = useRef(null);
  useEffect(() => {
    if (canvas.current) {
      const particleCanvas = new ParticlesCanvas(canvas.current);
      particleCanvas.start();
    }
  }, []);
  return (
    <div>
      <canvas
        ref={canvas}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      ></canvas>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}
