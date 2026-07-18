// VideoShowcaseSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from "lottie-react"; // npm install lottie-react
import api from "../api/axios";

gsap.registerPlugin(ScrollTrigger);


/* ═══════════════════════════════════════════════════════════════════════════
   LOTTIE DRIP ANIMATION — embedded inline, no external file needed
═══════════════════════════════════════════════════════════════════════════ */
const DRIP_ANIMATION = { "v": "5.12.1", "fr": 30, "ip": 0, "op": 76, "w": 315, "h": 317, "nm": "!!bttn_hover", "ddd": 0, "assets": [], "layers": [{ "ddd": 0, "ind": 2, "ty": 4, "nm": "Shape Layer 4", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [152.75, 163.25, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [0, 0, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.838, "y": 0.882 }, "o": { "x": 0.333, "y": 0 }, "t": 0, "s": [{ "i": [[11, -0.75], [9, -4], [-12.609, -0.287], [-7.188, 2.312]], "o": [[-11, 0.75], [4.5, -2.375], [8.25, 0.188], [1.919, -0.617]], "v": [[77.75, 23.25], [45.25, 30.375], [76.875, 30.188], [101.938, 28.938]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.619, "y": 0.502 }, "t": 29, "s": [{ "i": [[11, -0.75], [9, -4], [-14.125, 2.312], [-12.812, 4.062]], "o": [[-11, 0.75], [22.875, 4.875], [12.503, -2.047], [1.921, -0.609]], "v": [[77.75, 23.25], [45.25, 30.375], [74.375, 50.688], [102.812, 27.312]], "c": true }] }, { "t": 44, "s": [{ "i": [[11, -0.75], [9, -4], [-12.17, 3.313], [-11.938, 4.062]], "o": [[-11, 0.75], [14.625, 0.25], [11.25, -3.062], [3.101, -1.055]], "v": [[77.75, 23.25], [45.25, 30.875], [75.625, 48.812], [102.688, 26.812]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.3215686275, 0.1921568627, 0.1294117647, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 137, "st": 0, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 3, "ty": 4, "nm": "Shape Layer 3", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [136.404, 202.688, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [38.654, 39.688, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.68, "y": 0.495 }, "o": { "x": 0.373, "y": 0 }, "t": 16, "s": [{ "i": [[13.625, 0.25], [0.898, -3.253], [-9.49, -0.463], [-5.899, -0.329], [-3.102, -0.039], [-7.938, -0.375], [-2, 0]], "o": [[-13.625, -0.25], [-1, 3.625], [11.781, 0.575], [4.5, 0.251], [4.937, 0.062], [4.755, 0.225], [2, 0]], "v": [[20.125, 26.5], [2.125, 27.875], [20.032, 29.487], [37.625, 29.874], [48.813, 29.75], [66.25, 30.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.3, "y": 0.474 }, "t": 31, "s": [{ "i": [[13.625, 0.25], [0.091, -3.374], [-9.49, -0.463], [-5.868, -0.691], [-1.92, -2.437], [-5.098, 8.855], [-2, 0]], "o": [[-13.625, -0.25], [-0.163, 6.041], [11.781, 0.575], [4.25, 0.5], [3.25, 4.125], [2.375, -4.125], [2, 0]], "v": [[20.125, 26.5], [2.125, 28.625], [20.094, 35.05], [38, 33.374], [46.375, 40.875], [66.125, 38.375], [72.5, 27.25]], "c": true }] }, { "i": { "x": 0.612, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 46, "s": [{ "i": [[13.625, 0.25], [0.151, -3.372], [-9.49, -0.463], [-5.437, -2.312], [0.698, -3.023], [3.25, 19.25], [-2, 0]], "o": [[-13.625, -0.25], [7.375, 0.5], [11.781, 0.575], [3.239, 1.378], [-3, 13], [-2.463, -14.586], [2, 0]], "v": [[20.125, 26.5], [1.125, 34.75], [20.969, 42.8], [43.75, 40.875], [47.5, 54.75], [63, 54], [72.5, 27.25]], "c": true }] }, { "t": 59, "s": [{ "i": [[13.625, 0.25], [-3.37, 0.193], [-9.49, -0.463], [-5.437, -2.312], [0.211, -3.095], [1.341, 18.583], [-2, 0]], "o": [[-13.625, -0.25], [8.75, -0.5], [11.781, 0.575], [3.239, 1.378], [-0.75, 11], [-0.875, -12.125], [2, 0]], "v": [[20.125, 26.5], [1.5, 32.375], [21.344, 40.925], [43, 38.75], [45.5, 52], [64.125, 50.125], [72.5, 27.25]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.3215686275, 0.1921568627, 0.1294117647, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 153, "st": 16, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 4, "ty": 4, "nm": "Shape Layer 2", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [183, 234.377, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.667, "y": 0.32 }, "o": { "x": 0.333, "y": 0 }, "t": 7, "s": [{ "i": [[0, 0.316], [6.837, 0.024], [-0.25, -0.601], [-3.691, -0.402], [-7.5, 0.016], [-4.866, 0.411]], "o": [[-1.5, -0.395], [-7.929, -0.028], [3.25, 0.506], [3.846, 0.419], [5.771, -0.012], [5.115, -0.432]], "v": [[-44.375, 31.881], [-69.125, 31.739], [-95.375, 31.976], [-85.721, 33.336], [-70.5, 33.984], [-54.509, 33.201]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0.68 }, "t": 20.154, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [-3.691, -3.179], [-7.5, 0.125], [-4.866, 3.25]], "o": [[-1.5, -3.125], [-7.929, -0.221], [3.25, 4], [3.846, 3.312], [5.771, -0.096], [5.115, -3.416]], "v": [[-44.125, 32.125], [-68.875, 31], [-95.125, 32.875], [-85.471, 43.625], [-70.25, 48.75], [-54.259, 42.562]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 34.77, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.125, -8.875], [-12.875, -0.25], [-0.25, 8.125]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.127, 9.003], [12.133, 0.236], [0.388, -12.625]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 52.125], [-70.5, 75.75], [-65.875, 51.625]], "c": true }] }, { "t": 56, "s": [{ "i": [[0, 2.5], [6.837, 0.19], [-0.25, -4.75], [0.375, -7.25], [-12.5, -0.25], [0.164, 4.872]], "o": [[-1.375, -6.75], [-7.929, -0.221], [10.75, 6.25], [-0.375, 7.25], [12.5, 0.25], [-0.375, -11.125]], "v": [[-50.375, 34], [-68.875, 31], [-89.875, 33], [-74.375, 50.625], [-70.5, 69.75], [-65.875, 50.125]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.3215686275, 0.1921568627, 0.1294117647, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 144, "st": 7, "ct": 1, "bm": 0 }, { "ddd": 0, "ind": 5, "ty": 4, "nm": "Shape Layer 1", "sr": 1, "ks": { "o": { "a": 0, "k": 100, "ix": 11 }, "r": { "a": 0, "k": 0, "ix": 10 }, "p": { "a": 0, "k": [84, 235.877, 0], "ix": 2, "l": 2 }, "a": { "a": 0, "k": [-69.5, 74.627, 0], "ix": 1, "l": 2 }, "s": { "a": 0, "k": [100, 100, 100], "ix": 6, "l": 2 } }, "ao": 0, "shapes": [{ "ty": "gr", "it": [{ "ind": 0, "ty": "sh", "ix": 1, "ks": { "a": 1, "k": [{ "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.333, "y": 0 }, "t": 15, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.75, 27.526], [-96.375, 28.651], [-80.875, 31.617], [-60.25, 32.604], [-40.5, 31.028]], "c": true }] }, { "i": { "x": 0.833, "y": 0.833 }, "o": { "x": 0.167, "y": 0.167 }, "t": 20.2, "s": [{ "i": [[-6.75, 1.388], [18, -0.5], [-3.278, -0.492], [-9, -0.179], [-3.5, 0.587]], "o": [[-12.25, -1.776], [8.375, 3.849], [4, 0.601], [7.346, 0.146], [3.5, -0.587]], "v": [[-23.875, 30.776], [-96.375, 28.651], [-81, 34.117], [-60.125, 35.729], [-40.5, 33.778]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.167, "y": 0.167 }, "t": 34.5, "s": [{ "i": [[-6.75, 6.25], [18, -2.25], [-3.278, -2.217], [-9, -0.805], [-3.5, 2.645]], "o": [[-12.25, -8], [8.883, 8.702], [4, 2.706], [7.346, 0.657], [3.5, -2.645]], "v": [[-23.75, 29], [-96.75, 27.25], [-80.875, 44.044], [-60, 51.305], [-40.375, 42.52]], "c": true }] }, { "i": { "x": 0.667, "y": 1 }, "o": { "x": 0.333, "y": 0 }, "t": 54, "s": [{ "i": [[-7.5, -0.25], [18.75, -4.5], [-0.375, -17.419], [-13.5, 0.195], [0.073, 10.144]], "o": [[-12.25, -8], [8.75, 12.25], [0.181, 8.402], [14.375, -0.208], [-0.125, -17.27]], "v": [[-49.125, 34.625], [-94.75, 28.25], [-72.375, 60.544], [-67.625, 88.805], [-62.625, 60.27]], "c": true }] }, { "t": 74, "s": [{ "i": [[-8.625, -2], [18.75, -4.5], [-0.25, -14.669], [-15.5, 0.195], [0.51, 10.132]], "o": [[-12.25, -8], [8.883, 8.702], [0.143, 8.402], [15.5, -0.195], [-0.75, -14.895]], "v": [[-49.125, 35], [-93.25, 29.625], [-74, 59.169], [-67.5, 83.805], [-60.5, 58.395]], "c": true }] }] }, "nm": "Path 1", "mn": "ADBE Vector Shape - Group", "hd": false }, { "ty": "st", "c": { "a": 0, "k": [1, 1, 1, 1], "ix": 3 }, "o": { "a": 0, "k": 100, "ix": 4 }, "w": { "a": 0, "k": 0, "ix": 5 }, "lc": 1, "lj": 1, "ml": 4, "bm": 0, "nm": "Stroke 1", "mn": "ADBE Vector Graphic - Stroke", "hd": false }, { "ty": "fl", "c": { "a": 0, "k": [0.3215686275, 0.1921568627, 0.1294117647, 1], "ix": 4 }, "o": { "a": 0, "k": 100, "ix": 5 }, "r": 1, "bm": 0, "nm": "Fill 1", "mn": "ADBE Vector Graphic - Fill", "hd": false }, { "ty": "tr", "p": { "a": 0, "k": [0, 0], "ix": 2 }, "a": { "a": 0, "k": [0, 0], "ix": 1 }, "s": { "a": 0, "k": [100, 100], "ix": 3 }, "r": { "a": 0, "k": 0, "ix": 6 }, "o": { "a": 0, "k": 100, "ix": 7 }, "sk": { "a": 0, "k": 0, "ix": 4 }, "sa": { "a": 0, "k": 0, "ix": 5 }, "nm": "Transform" }], "nm": "Shape 1", "np": 3, "cix": 2, "bm": 0, "ix": 1, "mn": "ADBE Vector Group", "hd": false }], "ip": 0, "op": 161, "st": 24, "ct": 1, "bm": 0 }], "markers": [], "props": {} };


/* ─────────────────────────────────────────────────────────────────────────────
   iOS / Android DETECTION HELPERS
───────────────────────────────────────────────────────────────────────────── */
const detectIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

const detectAndroid = () => /Android/i.test(navigator.userAgent);

const detectMobile = () => detectIOS() || detectAndroid() ||
  /webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

/* ─────────────────────────────────────────────────────────────────────────────
   FAN LAYOUT — tuned per breakpoint
───────────────────────────────────────────────────────────────────────────── */
const FAN_PRESETS = {
  desktop: [
    { x: -32, y: -8, rotate: -20, scale: 0.92, zIndex: 4 },
    { x: -21, y: -11, rotate: -12, scale: 0.96, zIndex: 5 },
    { x: -10, y: -13, rotate: -5, scale: 1.02, zIndex: 6 },
    { x: 0, y: -15, rotate: 0, scale: 1.08, zIndex: 7 },
    { x: 10, y: -13, rotate: 5, scale: 1.02, zIndex: 6 },
    { x: 21, y: -11, rotate: 12, scale: 0.96, zIndex: 5 },
    { x: 32, y: -8, rotate: 20, scale: 0.92, zIndex: 4 },
  ],
  laptop: [
    { x: -30, y: -7, rotate: -19, scale: 0.90, zIndex: 4 },
    { x: -20, y: -10, rotate: -11, scale: 0.95, zIndex: 5 },
    { x: -9, y: -12, rotate: -4, scale: 1.00, zIndex: 6 },
    { x: 0, y: -14, rotate: 0, scale: 1.05, zIndex: 7 },
    { x: 9, y: -12, rotate: 4, scale: 1.00, zIndex: 6 },
    { x: 20, y: -10, rotate: 11, scale: 0.95, zIndex: 5 },
    { x: 30, y: -7, rotate: 19, scale: 0.90, zIndex: 4 },
  ],
  /* Tablet: tighter spread so cards don't overflow edges */
  tablet: [
    { x: -24, y: -3, rotate: -16, scale: 0.82, zIndex: 4 },
    { x: -16, y: -6, rotate: -9, scale: 0.88, zIndex: 5 },
    { x: -7, y: -8, rotate: -3, scale: 0.94, zIndex: 6 },
    { x: 0, y: -10, rotate: 0, scale: 0.99, zIndex: 7 },
    { x: 7, y: -8, rotate: 3, scale: 0.94, zIndex: 6 },
    { x: 16, y: -6, rotate: 9, scale: 0.88, zIndex: 5 },
    { x: 24, y: -3, rotate: 16, scale: 0.82, zIndex: 4 },
  ],
  /* Mobile: single stacked card, slight rotation offsets */
  mobile: [
    { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
    { x: 0, y: 0, rotate: 4, scale: 1.0, zIndex: 5 },
    { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
    { x: 0, y: 0, rotate: 6, scale: 1.0, zIndex: 7 },
    { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
    { x: 0, y: 0, rotate: 7, scale: 1.0, zIndex: 9 },
    { x: 0, y: 0, rotate: 0, scale: 1.0, zIndex: 10 },
  ],
  mobileSmall: [
    { x: 0, y: 0, rotate: -6, scale: 1.0, zIndex: 4 },
    { x: 0, y: 0, rotate: 4, scale: 1.0, zIndex: 5 },
    { x: 0, y: 0, rotate: -8, scale: 1.0, zIndex: 6 },
    { x: 0, y: 0, rotate: 6, scale: 1.0, zIndex: 7 },
    { x: 0, y: 0, rotate: -4, scale: 1.0, zIndex: 8 },
    { x: 0, y: 0, rotate: 7, scale: 1.0, zIndex: 9 },
    { x: 0, y: 0, rotate: 0, scale: 1.0, zIndex: 10 },
  ],
};

// isMob: includes tablet — all touch-primary screens skip hover
const isMob = (s) =>
  s === "mobile" || s === "mobileSmall" || s === "tablet" || s === "laptop";

/* ═══════════════════════════════════════════════════════════════════════════ */
export default function VideoShowcaseSection() {

  /* ── Section 1 refs ── */
  const roundSectionRef = useRef(null);
  const roundCircleRef = useRef(null);
  const roundElementRef = useRef(null);
  const roundOverlayRef = useRef(null);
  const roundButtonRef = useRef(null);
  const roundWrapRef = useRef(null);

  /* ── Section 3 refs ── */
  const socialSectionRef = useRef(null);
  const socialWrapperRef = useRef(null);
  const socialStickyRef = useRef(null);
  const cardRefs = useRef([]);
  const videoRefs = useRef([]);

  /* ── Lottie ref ── */
  const lottieRef = useRef(null);

  /* ── State ── */
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenSize, setScreenSize] = useState("desktop");
  const [modal, setModal] = useState(null);
  const [iosDevice, setIosDevice] = useState(false);
  const [androidDev, setAndroidDev] = useState(false);
  const [isTouchDev, setIsTouchDev] = useState(false);

  /* ── Detect device on mount ── */
  useEffect(() => {
    const ios = detectIOS();
    const android = detectAndroid();
    setIosDevice(ios);
    setAndroidDev(android);
    setIsTouchDev(detectMobile());
  }, []);

  /* ── Screen-size detection (fine-grained) ── */
  useEffect(() => {
    const detect = () => {
      const w = window.innerWidth;
      if (w >= 1366) setScreenSize("desktop");
      else if (w >= 1025) setScreenSize("laptop");
      else if (w >= 768) setScreenSize("tablet");
      else if (w >= 480) setScreenSize("mobile");
      else setScreenSize("mobileSmall");
    };
    detect();
    window.addEventListener("resize", detect);
    return () => window.removeEventListener("resize", detect);
  }, []);

  /* ── Fetch videos ── */
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/api/videos");
        setVideos(res.data || []);
      } catch { console.error("Failed to load videos"); }
      finally { setLoading(false); }
    })();
  }, []);

  /* ── Hover handlers for drip button (desktop only) ── */
  const handleButtonEnter = () => {
    if (!lottieRef.current || isTouchDev) return;
    lottieRef.current.setSpeed(3);
    lottieRef.current.goToAndPlay(0, true);
  };
  const handleButtonLeave = () => {
    if (!lottieRef.current || isTouchDev) return;
    lottieRef.current.stop();
  };

  /* ── GSAP ── */
  useEffect(() => {
    if (!videos.length) return;

    const mobile = isMob(screenSize);
    const presets = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
    const videoCount = Math.min(videos.length, presets.length);
    const dispVids = videos.slice(0, videoCount);

    const ctx = gsap.context(() => {

      /* ── S1 – Expanding circle ── */
      if (mobile) {
        ScrollTrigger.create({
          trigger: roundWrapRef.current,
          start: "top top", end: "bottom bottom",
          pin: roundCircleRef.current, pinSpacing: false,
        });
        gsap.set(roundElementRef.current, {
          width: "100vw", height: "100vh",
          borderRadius: "0%", scale: 1, opacity: 1,
        });
        gsap.set(roundOverlayRef.current, { opacity: 0.5 });
        gsap.set(roundButtonRef.current, { opacity: 1, scale: 1 });
      } else {
        const sizes = {
          laptop: { s: "12vw", e: "150vw" },
          desktop: { s: "10vw", e: "150vw" },
        }[screenSize] || { s: "10vw", e: "150vw" };

        ScrollTrigger.create({
          trigger: roundWrapRef.current,
          start: "top top", end: "bottom bottom",
          pin: roundCircleRef.current, pinSpacing: false, scrub: 0.5,
        });
        gsap.fromTo(roundElementRef.current,
          { width: sizes.s, height: sizes.s, borderRadius: "50%", scale: 1, opacity: 1 },
          {
            width: sizes.e, height: sizes.e, borderRadius: "50%", scale: 1.2, opacity: 0.9,
            ease: "none",
            scrollTrigger: {
              trigger: roundWrapRef.current,
              start: "top top", end: "bottom bottom",
              scrub: 0.8, invalidateOnRefresh: true,
            },
          }
        );
        gsap.fromTo(roundOverlayRef.current, { opacity: 0.3 },
          {
            opacity: 0.8, ease: "none",
            scrollTrigger: {
              trigger: roundWrapRef.current,
              start: "top top", end: "bottom bottom", scrub: 0.8,
            },
          }
        );
        gsap.fromTo(roundButtonRef.current, { opacity: 1, scale: 1 },
          {
            opacity: 0, scale: 1.5, ease: "none",
            scrollTrigger: {
              trigger: roundWrapRef.current,
              start: "top top", end: "center center", scrub: 0.8,
            },
          }
        );
      }

      /* ── S3 – Fan cards ── */
      if (!socialSectionRef.current || !cardRefs.current.length) return;

      ScrollTrigger.create({
        trigger: socialWrapperRef.current,
        start: "top top", end: "bottom bottom",
        pin: socialStickyRef.current, pinSpacing: false,
      });

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.set(card, {
          xPercent: -50, yPercent: -50,
          x: 0, y: "85vh",
          rotation: 0, scale: 0.35, opacity: 0,
          zIndex: i + 1,
        });
      });

      const slotW = 1 / videoCount;
      const animDur = slotW * 0.7;
      const s3Tl = gsap.timeline();

      dispVids.forEach((_, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const pos = presets[i % presets.length];
        const tStart = i * slotW;

        s3Tl.to(card, {
          xPercent: -50, yPercent: -50,
          x: `${pos.x}vw`, y: `${pos.y}vh`,
          rotation: pos.rotate, scale: pos.scale, opacity: 1,
          ease: "power3.out", duration: animDur,
          onComplete: () => {
            /* iOS / Android: force play when card animates in */
            if (iosDevice || androidDev) {
              const vid = videoRefs.current[i];
              if (vid) { vid.muted = true; vid.play().catch(() => { }); }
            }
          },
        }, tStart);
      });

      ScrollTrigger.create({
        trigger: socialWrapperRef.current,
        start: "top top", end: "bottom bottom",
        scrub: 1, animation: s3Tl,
      });

      /* Backup trigger for iOS/Android — fires when section enters viewport */
      if (iosDevice || androidDev) {
        ScrollTrigger.create({
          trigger: socialWrapperRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            videoRefs.current.forEach((vid) => {
              if (vid) { vid.muted = true; vid.play().catch(() => { }); }
            });
          },
        });
      }

      /* Parallax text */
      const textLines = socialSectionRef.current.querySelectorAll(".sf-bg-line");
      textLines.forEach((line, i) => {
        gsap.fromTo(line,
          { xPercent: i % 2 === 0 ? -10 : 10 },
          {
            xPercent: i % 2 === 0 ? 10 : -10, ease: "none",
            scrollTrigger: {
              trigger: socialSectionRef.current,
              start: "top bottom", end: "bottom top", scrub: 2,
            },
          }
        );
      });
    });

    ScrollTrigger.refresh();
    const onResize = () => setTimeout(() => ScrollTrigger.refresh(), 100);
    window.addEventListener("resize", onResize);
    return () => { ctx.revert(); window.removeEventListener("resize", onResize); };

  }, [videos, screenSize, iosDevice, androidDev]);

  /* ── Derived ── */
  const mobile = isMob(screenSize);
  const presets = FAN_PRESETS[screenSize] || FAN_PRESETS.desktop;
  const videoCount = Math.min(videos.length, presets.length);
  const dispVids = videos.slice(0, videoCount);

  if (loading) return null;

  /* ═══════════════════════════════════════════════════════════════════════ */
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Antonio:wght@400;700;900&display=swap');

        /* ── Reset ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ════════════════════════════════════════════════════════════
           SECTION 1 – Round expanding circle video
        ════════════════════════════════════════════════════════════ */
        .s1 {
          position: relative;
          background: #523122;
          overflow: hidden;
          width: 100%;
          z-index: 10;
        }

        /* Scroll-driver height — shorter on touch screens */
        .s1-wrap {
          position: relative;
          width: 100%;
          height: 200vh;
        }
        @media (max-width: 1024px) { .s1-wrap { height: 130vh; } }
        @media (max-width: 767px)  { .s1-wrap { height: 120vh; } }
        @media (max-width: 479px)  { .s1-wrap { height: 110vh; } }

        /* Sticky viewport */
        .s1-sticky {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100vh;
          /* Safe-area insets (iPhone notch / Dynamic Island) */
          padding-top: env(safe-area-inset-top);
          padding-bottom: env(safe-area-inset-bottom);
        }

        /* Expanding circle */
        .s1-circle {
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          will-change: width, height, scale;
          transition: box-shadow .3s;
          box-shadow: 0 0 40px rgba(0,0,0,0.45);
          /* Desktop initial size */
          width: clamp(80px, 10vw, 180px);
          height: clamp(80px, 10vw, 180px);
        }

        /* Mobile / tablet: full-screen rectangle */
        @media (max-width: 1024px) {
          .s1-circle {
            width: 100vw !important;
            height: 100vh !important;
            border-radius: 0 !important;
          }
        }

        .s1-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          z-index: 2;
          pointer-events: none;
        }

        .s1-vid-wrap {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 1;
        }
        .s1-vid-wrap video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Play button */
        .s1-play-link {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          cursor: pointer;
          text-decoration: none;
          /* Larger tap target on mobile */
          -webkit-tap-highlight-color: transparent;
        }
        .s1-play-btn {
          border-radius: 50%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          cursor: pointer;
          will-change: opacity, scale;
          /* Responsive sizing with safe floor/ceiling */
          width:  clamp(72px, 12vw, 180px);
          height: clamp(72px, 12vw, 180px);
          touch-action: manipulation;
        }
        /* Slightly larger on small phones */
        @media (max-width: 479px) {
          .s1-play-btn { width: 88px; height: 88px; }
        }

        .s1-play-bg {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(0,0,0,0.65);
          z-index: 1;
          transition: background .3s;
        }
        .s1-play-btn:hover .s1-play-bg,
        .s1-play-btn:active .s1-play-bg { background: rgba(0,0,0,0.85); }

        .s1-play-icon {
          z-index: 3;
          color: #fff;
          font-size: clamp(16px, 3vw, 42px);
        }
        .s1-play-icon::after { content: "▶"; }

        /* Rotating text ring */
        .s1-svg-ring {
          width: 100%;
          height: 100%;
          position: absolute;
          z-index: 2;
          animation: s1spin 18s linear infinite;
        }
        @keyframes s1spin { to { transform: rotate(360deg); } }
        .s1-svg-ring text {
          font-family: 'Antonio', sans-serif;
          font-weight: 700;
          fill: rgba(255,255,255,0.9);
          letter-spacing: .15em;
          font-size: clamp(10px, 1.1vw, 14px);
        }
        @media (max-width: 767px) { .s1-svg-ring text { font-size: 18px; } }
        @media (max-width: 479px) { .s1-svg-ring text { font-size: 15px; } }


        /* ════════════════════════════════════════════════════════════
           SECTION 3 – Social fan cards
        ════════════════════════════════════════════════════════════ */
        .s3-outer {
          background: #222123;
          position: relative;
          z-index: 20;
          overflow: visible;
        }

        /* Scroll driver */
        .s3-driver {
          background: #ffd500;
          width: 100%;
          height: var(--s3-driver-height, 500vh);
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: visible;
        }
        /* Progressive height reduction on smaller viewports */
        @media (max-width: 1024px) { .s3-driver { --s3-driver-height: 400vh; } }
        @media (max-width: 767px)  { .s3-driver { --s3-driver-height: 280vh; } }
        @media (max-width: 479px)  { .s3-driver { --s3-driver-height: 220vh; } }
        @media (max-width: 359px)  { .s3-driver { --s3-driver-height: 200vh; } }

        /* Sticky viewport */
        .s3-sticky {
          position: sticky;
          top: 0;
          width: 100%;
          height: 100vh;
          z-index: 4;
          overflow: hidden;
          /* Safe area: notch / home indicator */
          padding-bottom: env(safe-area-inset-bottom);
        }

        /* ── Fan cards ── */
        .s3-card {
          position: absolute;
          top: 70%;
          left: 50%;
          border: 0.30vw solid #ffd500;
          border-radius: 2vw;
          overflow: hidden;
          width: clamp(140px, 18vw, 280px);
          aspect-ratio: 9/16;
          cursor: pointer;
          will-change: transform, opacity;
          box-shadow: 0 20px 40px rgba(0,0,0,0.52);
          background: #111;
          /* GPU layer */
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          /* Touch feedback */
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .s3-card:active { opacity: 0.85; }

        .s3-card video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          display: block;
        }

        /* ── Breakpoint-specific card sizing ── */

        /* Large desktop (1366+): default above */

        /* Laptop (1025–1365) */
        @media (max-width: 1365px) and (min-width: 1025px) {
          .s3-card { width: clamp(140px, 17vw, 260px); }
        }

        /* Tablet landscape (1024px, including iPad Pro) */
        @media (max-width: 1024px) and (min-width: 821px) {
          .s3-card {
            top: 55%;
            width: 43vw;
            border-width: 3px;
            border-radius: 14px;
          }
        }



/* Nest Hub exact pixel override */
@media (width: 1024px) and (height: 600px) {
  .s3-card { top: 65%; width: 19vw; min-width: 76px; }
  .sf-bg-line { font-size: 10.5vw; }
}

        /* Tablet portrait (768–820) */
        @media (max-width: 820px) and (min-width: 768px) {
          .s3-card {
            top: 55%;
            width: 49vw;
            height: 80vw;
            border-width: 4px;
            border-radius: 16px;
          }
        }

        /* Large mobile / phablet (541–767) */
        @media (max-width: 767px) and (min-width: 541px) {
          .s3-card {
            top: 44%;
            width: 62vw;
            height: 110vw;
            border-width: 3px;
            border-radius: 14px;
          }
        }

        /* Mobile (480–540) */
        @media (max-width: 540px) and (min-width: 480px) {
          .s3-card {
            top: 54%;
            width: 50vw;
            // height: 100vw;
            border-width: 3px;
            border-radius: 14px;
          }
        }

        /* Small mobile (360–479) */
        @media (max-width: 479px) and (min-width: 360px) {
          .s3-card {
            top: 46%;
            width: 50vw;
            // height: 100vw;
            border-width: 3px;
            border-radius: 14px;
          }
        }

        /* Very small phones (<360px, e.g. older iPhones / Galaxy A) */
        @media (max-width: 359px) {
          .s3-card {
            top: 46%;
            width: 74vw;
            height: 132vw;
            border-width: 2px;
            border-radius: 12px;
          }
        }


        /* ════════════════════════════════════════════════════════════
           Explore All — Lottie drip button
        ════════════════════════════════════════════════════════════ */
        .s3-cta-wrap {
          position: absolute;
          bottom: 5.5vh;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          /* Ensure above all cards */
          pointer-events: auto;
        }
        /* Give extra breathing room on very small phones */
        @media (max-width: 479px) { .s3-cta-wrap { bottom: 4vh; } }

        .liquid-button-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
        }

        /* Drip Lottie layer — desktop/laptop only */
        .lottie-animation-2 {
  z-index: 1;
  perspective-origin: 50% 0;
  transform-origin: 50% 0;
  width: 12.5vw;
  height: 13.5vw;
  position: absolute;
  top: -5.9vw;
  right: 0;
  bottom: 0;
  left: -3.1vw;
  pointer-events: none;
}

/* Large screens */
@media (min-width: 1600px) {
  .lottie-animation-2 {
    width: 11vw;
    height: 12vw;
    top: -5vw;
    left: -2.5vw;
  }
}

/* Extra large screens */
@media (min-width: 1920px) {
  .lottie-animation-2 {
    width: 10vw;
    height: 10.7vw;
    top: -4.5vw;
    left: -2.5vw;
  }
}

/* Ultra wide screens up to 2238px */
@media (min-width: 2238px) {
  .lottie-animation-2 {
    width: 9vw;
    height: 10vw;
    top: -4.2vw;
    left: -2.5vw;
  }
}
       
        @media (max-width: 1024px) { .lottie-animation-2 { display: none; } }

        /* Pill button */
        .liquid-button {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #000;
          
          border-radius: 100vw;
          padding: .75em 3em;
          text-decoration: none;
          cursor: pointer;
          transition: background .3s;
          white-space: nowrap;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .liquid-button:hover,
        .liquid-button:active { background: #000; }

        .lottie-animation-2 path,
        .lottie-animation-2 svg {
          fill: #000 !important;
          stroke: #000 !important;
        }
        

        /* Responsive padding */
        @media (max-width: 991px)  { .liquid-button { padding: .7em 2.4em; } }
        @media (max-width: 767px)  { .liquid-button { padding: .65em 2em; } }
        @media (max-width: 479px)  { .liquid-button { padding: .6em 1.75em; } }

        .button-text {
          position: relative;
          z-index: 2;
          letter-spacing: -.01vw;
          font-family: Antonio, sans-serif;
          font-size: clamp(.8rem, 1.1vw, 1.15rem);
          font-weight: 700;
          text-transform: uppercase;
          color: #ffd500;
          white-space: nowrap;
        }
          .button-text::hover,
          .button-text::active { color: #0A0A0A; }
        /* Explicit floor for mobile */
        @media (max-width: 767px)  { .button-text { font-size: clamp(.78rem, 3.5vw, .95rem); } }
        @media (max-width: 479px)  { .button-text { font-size: .8rem; } }


        /* ════════════════════════════════════════════════════════════
           Parallax background text
        ════════════════════════════════════════════════════════════ */
        .s3-bg-wrap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding-top: 5vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
          overflow: hidden;
          z-index: 2;
        }
        .sf-bg-line {
          font-family: 'Antonio', sans-serif;
          font-size: 13.5vw;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -.4vw;
          text-transform: uppercase;
          color: #222123;
          will-change: transform;
          user-select: none;
        }
        .sf-bg-line.orange { color: #523121; }
        .sf-bg-line.right  { text-align: right; width: 100%; }

        /* Scale text down a touch on very small screens */
        @media (max-width: 479px) {
          .sf-bg-line { font-size: 15vw; letter-spacing: -.3vw; }
        }


        /* ════════════════════════════════════════════════════════════
           MODAL
        ════════════════════════════════════════════════════════════ */
        .vmodal-bg {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.97);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          /* Respect safe areas (notch / home bar) */
          padding: max(env(safe-area-inset-top), clamp(10px,3vw,30px))
                   max(env(safe-area-inset-right), clamp(10px,3vw,30px))
                   max(env(safe-area-inset-bottom), clamp(10px,3vw,30px))
                   max(env(safe-area-inset-left), clamp(10px,3vw,30px));
          animation: vmFadeIn .25s ease;
          /* Prevent scroll bounce on iOS */
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
        @keyframes vmFadeIn { from { opacity: 0 } to { opacity: 1 } }

        .vmodal-box {
          position: relative;
          width: 100%;
          /* On portrait mobile fill more height */
          max-width: min(480px, 92vw);
          aspect-ratio: 9/16;
          animation: vmSlide .28s ease;
        }
        /* Landscape on phone: shrink to fit */
        @media (max-height: 500px) and (orientation: landscape) {
          .vmodal-box {
            max-width: unset;
            height: 90vh;
            width: auto;
            aspect-ratio: 9/16;
          }
        }
        @keyframes vmSlide {
          from { transform: translateY(22px); opacity: 0 }
          to   { transform: translateY(0);    opacity: 1 }
        }

        .vmodal-box video {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 12px;
          /* Prevent fullscreen takeover on iOS */
          -webkit-playsinline: true;
        }

        .vmodal-close {
          position: absolute;
          top: -46px;
          right: 0;
          background: #fff;
          color: #523122;
          border: none;
          border-radius: 50%;
          font-size: 22px;
          cursor: pointer;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all .25s;
          box-shadow: 0 2px 12px rgba(0,0,0,0.25);
          /* Easier tap on mobile */
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
        /* Slightly larger on small phones */
        @media (max-width: 479px) {
          .vmodal-close {
            width: 44px;
            height: 44px;
            font-size: 24px;
            top: -50px;
          }
        }
        .vmodal-close:hover,
        .vmodal-close:active {
          background: #523122;
          color: #fff;
          transform: scale(1.12);
        }


        /* ════════════════════════════════════════════════════════════
           Accessibility & performance
        ════════════════════════════════════════════════════════════ */
        @media (prefers-reduced-motion: reduce) {
          .s1-svg-ring { animation: none !important; }
          .s3-card, .s1-circle { transition: none !important; animation: none !important; }
        }

        /* Remove hover effects on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .s3-card:hover,
          .liquid-button:hover { transform: none; box-shadow: none; }
        }

        /* High-DPI / Retina: sharper borders */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .s3-card { border-width: 0.5px; }
          @media (max-width: 767px) { .s3-card { border-width: 1.5px; } }
        }
      `}</style>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 – Round expanding circle video
      ════════════════════════════════════════════════════════════════ */}
      <div className="s1" ref={roundSectionRef}>
        <div className="s1-wrap" ref={roundWrapRef}>
          <div className="s1-sticky" ref={roundCircleRef}>
            <a
              href="#"
              className="s1-play-link"
              onClick={(e) => {
                e.preventDefault();
                setModal({ src: "Videos/Video2.mp4" });
              }}
              aria-label="Play full video"
            >
              <div className="s1-play-btn" ref={roundButtonRef}>
                <div className="s1-play-bg" />
                <svg className="s1-svg-ring" viewBox="0 0 200 200">
                  <defs>
                    <path id="rp"
                      d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0"
                      fill="none" />
                  </defs>
                  <text>
                    <textPath href="#rp" startOffset="50%" textAnchor="middle">
                      PLAY VIDEO • PLAY VIDEO • PLAY VIDEO •
                    </textPath>
                  </text>
                </svg>
                <span className="s1-play-icon" aria-hidden="true" />
              </div>
            </a>

            <div className="s1-circle" ref={roundElementRef}>
              <div className="s1-overlay" ref={roundOverlayRef} />
              <div className="s1-vid-wrap">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="images/product1.png"
                  /* Android: preload for smoother playback */
                  preload={androidDev ? "auto" : "metadata"}
                >
                  <source src="Videos/Video2.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 – Social feedback + API videos combined
      ════════════════════════════════════════════════════════════════ */}
      <div className="s3-outer" ref={socialSectionRef}>
        <div className="s3-driver" ref={socialWrapperRef}>
          <div className="s3-sticky" ref={socialStickyRef}>

            {/* Parallax background text */}
            <div className="s3-bg-wrap">
              <span className="sf-bg-line">What's</span>
              <span className="sf-bg-line orange">everyone</span>
              <span className="sf-bg-line right">talking</span>
            </div>

            {/* API video fan cards */}
            {dispVids.map((v, i) => (
              <div
                key={v._id}
                ref={(el) => (cardRefs.current[i] = el)}
                className="s3-card"
                onClick={() => setModal({ src: v.videoUrl })}
                /* Hover-to-play only on non-touch screens */
                onMouseEnter={() => !mobile && videoRefs.current[i]?.play()}
                onMouseLeave={() => !mobile && videoRefs.current[i]?.pause()}
              >
                <video
                  ref={(el) => (videoRefs.current[i] = el)}
                  src={v.videoUrl}
                  muted
                  playsInline
                  preload="metadata"
                  /* iOS & Android: autoplay + loop since no hover events */
                  autoPlay={iosDevice || androidDev}
                  loop={iosDevice || androidDev}
                />
              </div>
            ))}

            {/* Explore All — Lottie drip button */}
            <div className="s3-cta-wrap">
              <div
                className="liquid-button-wrapper"
                onMouseEnter={handleButtonEnter}
                onMouseLeave={handleButtonLeave}
              >
                <a href="/product" className="liquid-button">
                  <div className="button-text">
                    {/* Lottie drip — hidden on touch screens via CSS */}
                    <div className="lottie-animation-2">
                      <Lottie
                        lottieRef={lottieRef}
                        animationData={DRIP_ANIMATION}
                        loop={false}
                        autoplay={false}
                        speed={5}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    explore all</div>
                </a>
              </div>
            </div>

          </div>{/* /sticky */}
        </div>{/* /driver */}
      </div>

      {/* ════════════════════════════════════════════════════════════════
          MODAL
      ════════════════════════════════════════════════════════════════ */}
      {modal && (
        <div
          className="vmodal-bg"
          onClick={() => setModal(null)}
          /* Prevent rubber-band scroll on iOS behind modal */
          onTouchMove={(e) => e.preventDefault()}
        >
          <div className="vmodal-box" onClick={(e) => e.stopPropagation()}>
            <button
              className="vmodal-close"
              onClick={() => setModal(null)}
              aria-label="Close video"
            >
              ×
            </button>
            <video
              src={modal.src}
              controls
              autoPlay
              playsInline
              /*
                iOS: muted required for autoPlay; user can unmute via controls
                Android: no muted needed — plays audio by default
              */
              muted={iosDevice}
            />
          </div>
        </div>
      )}
    </>
  );
}