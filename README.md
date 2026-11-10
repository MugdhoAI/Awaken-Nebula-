# Awaken Nebula

An interactive 3D particle visualization featuring 15,000 particles with real time mouse driven rotation and color gradients.

Built using Three.js with WebGL rendering, procedural texture generation, and optimized BufferGeometry for smooth performance.

## How to run

Open `nebula.html` in a browser, or serve the folder and visit it:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/nebula.html

Three.js 0.160.0 is loaded from the unpkg CDN, so an internet connection is needed.

## Controls

| Input | Effect |
| --- | --- |
| Move mouse | Rotate the nebula and change speed |
| Drag on touch screen | Rotate the nebula |
| Space | Pause or resume the animation |
| + / - | Speed up or slow down the base rotation |

The overlay shows the particle count and live FPS. If your system prefers reduced motion, the automatic rotation and breathing effect stop, and only mouse or touch input rotates the scene.

## Features

- 15,000 particles with a cyan to magenta gradient, positioned in a 100 unit cube
- Procedural circular sprite texture, no image files needed
- Additive blending and fog for a glowing nebula look
- Eased mouse rotation with a gentle breathing scale effect
- Pixel ratio capped at 2 so high DPI screens do not overdraw
- Touch support for mobile

Technologies: Three.js, WebGL, JavaScript ES6, 3D Graphics
