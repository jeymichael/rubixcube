# WebXR Rubik's Cube

A virtual reality Rubik's cube application built with Three.js and WebXR, supporting both VR controllers and hand tracking.

## Features

- Full WebXR support for VR headsets
- Dual input support:
  - VR Controller tracking with visual rays
  - Hand tracking with finger pointing
- Interactive feedback:
  - Visual highlighting of cube pieces
  - Audio feedback using Web Audio API
  - Special highlighting for corner pieces
- High-quality 3D rendering:
  - Antialiased graphics
  - Phong material shading
  - Directional and ambient lighting

## Technical Details

- Framework: Three.js
- VR Support: WebXR Device API
- Audio: Web Audio API (synthesized sounds)
- Input Methods:
  - XR Controller input
  - Hand tracking via XRHandModelFactory
  - Controller models via XRControllerModelFactory

## Audio Feedback

The application uses synthesized audio feedback:
- Intersection beep: 440Hz (A4 note) for general intersections
- Corner piece beep: 880Hz (A5 note) for corner piece interactions
- Rate-limited to prevent audio spam (150ms minimum interval)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open in a WebXR-compatible browser and connect your VR headset

## Controls

### VR Controllers
- Point at cube pieces to highlight them
- Receive audio feedback for intersections
- Special feedback for corner pieces

### Hand Tracking
- Use index finger to point at pieces
- Visual and audio feedback for intersections
- Enhanced feedback for corner pieces

## Requirements

- WebXR-compatible VR headset
- WebXR-compatible browser
- Audio-capable system
- VR controllers or hand tracking capability

## Development

Built with:
- Three.js for 3D rendering
- WebXR for VR capabilities
- Web Audio API for sound synthesis
- Modern JavaScript (ES6+)

## Browser Support

Tested on:
- Oculus Browser
- Chrome with WebXR
- Firefox with WebXR 