import React, {useEffect, useRef} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import P5Background from '../components/P5Background';
import Marquee from '../components/Marquee';
import CodeBlock from '../components/CodeBlock';

function ShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl');
    if (!gl) return;

    const fit = () => {
      const dpr = window.devicePixelRatio || 1;
      const {clientWidth, clientHeight} = canvas;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };

    const vert = `
      attribute vec2 aPos;
      void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
    `;

    const frag = `
      precision mediump float;
      uniform vec2  uRes;
      uniform float uTime;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float noise(in vec2 p){
        vec2 i = floor(p), f = fract(p);
        float a = hash(i), b = hash(i + vec2(1.0,0.0));
        float c = hash(i + vec2(0.0,1.0)), d = hash(i + vec2(1.0,1.0));
        vec2 u = f * f * (3.0 - 2.0*f);
        return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / uRes.xy;
        uv -= 0.5;
        uv.x *= uRes.x / uRes.y;

        float t = uTime * 0.15;
        vec2 wuv = uv + 0.05 * vec2(
          noise(uv * 3.0 + t),
          noise(uv * 3.0 - t)
        );

        vec2 g = abs(fract(wuv*12.0) - 0.5);
        float grid = 1.0 - smoothstep(0.46, 0.48, max(g.x, g.y));

        float r = length(uv);
        float vign = 1.0 - smoothstep(0.6, 0.95, r);
        float glow = 0.2 + 0.8*exp(-6.0*r*r);

        vec3 base = mix(vec3(0.05,0.06,0.10), vec3(0.10,0.12,0.18), glow);
        vec3 accent = vec3(0.20,0.55,1.0);
        vec3 col = base + 0.12*grid*accent + 0.25*vign*accent*0.25;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(program);
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    const verts = new Float32Array([-1,-1, 3,-1, -1,3]); // fullscreen triangle
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    const loc = gl.getAttribLocation(program, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, 'uRes');
    const uTime = gl.getUniformLocation(program, 'uTime');

    let raf = 0;
    const render = (ts) => {
      gl.uniform2f(uRes, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.uniform1f(uTime, ts/1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };

    fit();
    const onResize = () => fit();
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.shader} aria-hidden="true" />;
}

export default function Home() {
  const quickStartText = 'Request your tiles today';

  return (
    <Layout
      title="Amazon HydroViewer"
      description="Advanced hydrometeorology tools for the Amazon basin"
    >
      <header className={styles.hero}>
        <P5Background />
        <div className={styles.heroInner}>
          <h1 className={styles.title}>
            <span>Amazon</span>
            <span className={styles.gradient}>HydroViewer</span>
          </h1>
          <p className={styles.subtitle}>
            Advanced hydrometeorology monitoring and analysis tools for the Amazon basin.
            Data visualization, forecasting, and decision support systems.
          </p>
          <div className={styles.ctaRow}>
            <Link
              className="button button--primary button--lg"
              to="https://hydroclimate.shinyapps.io/amazonhydroviewer/"
            >
              Launch Tool
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/tutorial-getting%20started/First%20step"
            >
              Documentation
            </Link>
          </div>
        </div>
      </header>
      <Marquee variant="text" speed={0.5} />

      <main className={styles.main}>
        <section className={styles.features}>
          <div className={styles.card}>
            <h3>Data-Driven</h3>
            <p>Retrospective data constructed from an extensive data catalogue across the Amazon basin over the past 2 decades.</p>
          </div>
          <div className={styles.card}>
            <h3>Analytical</h3>
            <p>Advanced forecasting models and statistical analysis tools for informed decision-making.</p>
          </div>
          <div className={styles.card}>
            <h3>Accessible</h3>
            <p>Open-source platform designed for researchers, policymakers, and communities.</p>
          </div>
        </section>
        <Marquee variant="logos" speed={0.7} />

        <section className={styles.code}>
          <h2 className={styles.quickStartTitle}>
            <span style={{'--title-ch': `${quickStartText.length}ch`, '--title-steps': quickStartText.length}}>
              {quickStartText}
            </span>
          </h2>
          <CodeBlock
            tabs={[
              {
                label: 'JavaScript',
                commands: [
                  {
                    comment: '// HydroViewer TileLayer request (JavaScript)',
                    code: 'L.tileLayer("https://amazonhydroviewer.onrender.com/tiles/Rainf_tavg/0/0/{z}/{x}/{y}.png",'
                  },
                  {
                    code: '  {opacity: 0.85, tms: true, minNativeZoom: 4, maxNativeZoom: 9}).addTo(map)'
                  }
                ]
              },
              {
                label: 'IPyLeaflet',
                commands: [
                  {
                    comment: '# Using ipyleaflet package',
                    code: 'from ipyleaflet import Map, basemaps, basemap_to_tiles'
                  },
                  {
                    code: 'm = Map(center=(-7, -66), zoom=5)'
                  },
                  {
                    code: 'tile_url = "https://amazonhydroviewer.onrender.com/tiles/Rainf_tavg/0/0/{z}/{x}/{y}.png"'
                  },
                  {
                    code: 'ldas=Tilelayer(url=tile_url)'
                  },
                  {
                    code: "m.add(ldas)"
                  },
                ]
              },
            ]}
            repoLink="https://github.com/blackteacatsu/AmazonHydroViewer"
          />
        </section>
      </main>
    </Layout>
  );
}
