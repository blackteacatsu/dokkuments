import React, {useEffect, useRef} from 'react';

export default function P5Background() {
  const hostRef = useRef(null);
  const p5Ref = useRef(null);

  useEffect(() => {
    let cleanup = () => {};
    (async () => {
      const p5 = (await import('p5')).default;

      const sketch = (p) => {
        let particles = [];

        class Particle {
          constructor() {
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p.createVector(0, 0);
            this.acc = p.createVector(0, 0);
            this.maxSpeed = 3;
            this.prevPos = this.pos.copy();
          }
          update() {
            this.acc = p.createVector(
              p.noise(this.pos.x * 0.01, this.pos.y * 0.01),
              p.noise(this.pos.y * 0.01, this.pos.x * 0.01)
            );
            this.acc.sub(p.createVector(0.5, 0.5));
            this.acc.mult(0.1);
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.edges();
          }
          edges() {
            if (this.pos.x > p.width)  { this.pos.x = 0; this.updatePrev(); }
            if (this.pos.x < 0)        { this.pos.x = p.width; this.updatePrev(); }
            if (this.pos.y > p.height) { this.pos.y = 0; this.updatePrev(); }
            if (this.pos.y < 0)        { this.pos.y = p.height; this.updatePrev(); }
          }
          updatePrev() {
            this.prevPos.x = this.pos.x;
            this.prevPos.y = this.pos.y;
          }
          show() {
            // White stroke with alpha for the particle trails
            p.stroke(255, 200);
            p.strokeWeight(5);
            p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
            this.updatePrev();
          }
        }

        p.setup = () => {
          const c = p.createCanvas(p.windowWidth, p.windowHeight);
          c.parent(hostRef.current);
          for (let i = 0; i < 500; i++) particles.push(new Particle());
        };

        p.draw = () => {
          // Background with 1.47 alpha for trailing effect
          p.background(30, 80, 180, 4);
          particles.forEach((pt) => { pt.update(); pt.show(); });
        };

        p.windowResized = () => {
          p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
      };

      p5Ref.current = new p5(sketch);
      cleanup = () => p5Ref.current?.remove();
    })();

    return () => cleanup();
  }, []);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,       // behind content
        pointerEvents: 'none',
      }}
    />
  );
}
