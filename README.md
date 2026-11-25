# Brace Cutout Designer

Design cutouts on a flattened torso brace and preview the solid brace on the body scan in 3D.

**Open it:** https://zhoudingshanshan.github.io/brace-cutout-designer/

Works in any modern browser on a computer or tablet. On an iPad, open the link in Safari and choose
*Share → Add to Home Screen*: it then runs full screen and offline. Apple Pencil supported.

- Draw cutouts on the flattened brace (left) and see the solid brace on the body in 3D (right).
- Tools: lasso, point-by-point, select/edit; shell thickness; minimum web width; design-rule checks;
  SVG / JSON export. Designs are saved in your own browser only.

> **Research prototype, not a medical device.** The body model is simulated. Geometry results
> (stretch, open area, fit) are computed, not validated, and must not be used for clinical decisions.

Built with Visual Studio Code and Claude Code as part of a design research project.
3D rendering: [three.js](https://threejs.org) r160 (MIT licence, see `vendor/three/LICENSE`).

_Version 0.8, published 2026-11-25._
