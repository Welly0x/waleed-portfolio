import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ControlPointDef {
  base: [number, number, number];
  amp: [number, number, number];
  speed: [number, number, number];
  phase: [number, number, number];
}

interface RibbonDef {
  id: string;
  segments: number;
  radialSegments: number;
  maxWidth: number;
  maxThickness: number;
  twistSpeed: number;
  twistFreq: number;
  twistPhase: number;
  contourOffsets: number[];
  controlPoints: ControlPointDef[];
  materialIndex: number;
  edgeOpacity: number;
  contourOpacity: number;
  taperPower?: number;
  undulationSpeed?: number;
  undulationFreq?: number;
  undulationAmp?: number;
}

interface IndependentContourDef {
  id: string;
  segments: number;
  opacity: number;
  color: number;
  controlPoints: ControlPointDef[];
}

/**
 * Creates a procedural monochromatic studio environment map with sharp specular
 * silver highlights and dark graphite gradients for realistic liquid-chrome reflections.
 */
function createStudioEnvMap(renderer: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep charcoal-black background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 512);
  bgGrad.addColorStop(0, '#060708');
  bgGrad.addColorStop(0.25, '#0b0d10');
  bgGrad.addColorStop(0.5, '#121519');
  bgGrad.addColorStop(0.75, '#0b0d10');
  bgGrad.addColorStop(1, '#060708');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1024, 512);

  // Intense overhead studio softbox for gleaming liquid-chrome highlights
  const softboxTop = ctx.createRadialGradient(512, 110, 5, 512, 110, 260);
  softboxTop.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  softboxTop.addColorStop(0.2, 'rgba(240, 245, 252, 0.75)');
  softboxTop.addColorStop(0.5, 'rgba(195, 202, 212, 0.35)');
  softboxTop.addColorStop(1, 'rgba(11, 13, 16, 0)');
  ctx.fillStyle = softboxTop;
  ctx.fillRect(0, 0, 1024, 340);

  // Upper horizontal razor-sharp silver reflection streak
  const upperStrip = ctx.createLinearGradient(0, 130, 0, 175);
  upperStrip.addColorStop(0, 'rgba(255, 255, 255, 0)');
  upperStrip.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
  upperStrip.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = upperStrip;
  ctx.fillRect(0, 130, 1024, 45);

  // Mid-screen reflection strip for secondary chrome curves
  const midStrip = ctx.createLinearGradient(0, 240, 0, 280);
  midStrip.addColorStop(0, 'rgba(242, 246, 252, 0)');
  midStrip.addColorStop(0.5, 'rgba(242, 246, 252, 0.6)');
  midStrip.addColorStop(1, 'rgba(242, 246, 252, 0)');
  ctx.fillStyle = midStrip;
  ctx.fillRect(0, 240, 1024, 40);

  // Lateral rim lights (cool liquid mercury luster)
  const rimRight = ctx.createLinearGradient(820, 0, 980, 0);
  rimRight.addColorStop(0, 'rgba(205, 212, 222, 0)');
  rimRight.addColorStop(0.5, 'rgba(245, 248, 255, 0.8)');
  rimRight.addColorStop(1, 'rgba(205, 212, 222, 0)');
  ctx.fillStyle = rimRight;
  ctx.fillRect(820, 30, 160, 450);

  const rimLeft = ctx.createLinearGradient(40, 0, 180, 0);
  rimLeft.addColorStop(0, 'rgba(180, 188, 198, 0)');
  rimLeft.addColorStop(0.5, 'rgba(230, 236, 245, 0.65)');
  rimLeft.addColorStop(1, 'rgba(180, 188, 198, 0)');
  ctx.fillStyle = rimLeft;
  ctx.fillRect(40, 30, 140, 450);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;

  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  pmremGenerator.compileEquirectangularShader();
  const renderTarget = pmremGenerator.fromEquirectangular(texture);

  texture.dispose();
  pmremGenerator.dispose();

  return renderTarget;
}

export const FluidRibbonBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect user's reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.background = null;

    // 2. Perspective Camera Setup
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 18);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Procedural Studio HDRI Environment Map
    const envRenderTarget = createStudioEnvMap(renderer);
    const envMap = envRenderTarget.texture;
    scene.environment = envMap;

    // 5. Cinematic Lighting
    // Key Light: Specular gleam across chrome surfaces
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(7, 13, 11);
    scene.add(keyLight);

    // Rim Light: Polished liquid silver edge glints
    const rimLight = new THREE.DirectionalLight(0xf2f6fa, 2.2);
    rimLight.position.set(-9, 10, -5);
    scene.add(rimLight);

    // Fill Light: Soft silver illumination
    const fillLight = new THREE.DirectionalLight(0xcfd5de, 1.1);
    fillLight.position.set(-11, 2, 9);
    scene.add(fillLight);

    // Subtle graphite bounce from below
    const bounceLight = new THREE.DirectionalLight(0x767c87, 0.75);
    bounceLight.position.set(5, -11, 7);
    scene.add(bounceLight);

    // Ambient light: deep charcoal base
    const ambientLight = new THREE.AmbientLight(0x13161a, 0.9);
    scene.add(ambientLight);

    // 6. Monochromatic Multi-Layer Materials
    // Tier 1: Polished Liquid Chrome (High gloss specular)
    const polishedChromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf0f3f8,
      metalness: 0.98,
      roughness: 0.10,
      clearcoat: 0.98,
      clearcoatRoughness: 0.06,
      reflectivity: 0.98,
      envMapIntensity: 2.2,
      side: THREE.DoubleSide,
    });

    // Tier 2: Satin Silver Steel (Mid-tone richness)
    const satinSteelMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xd8dde5,
      metalness: 0.94,
      roughness: 0.15,
      clearcoat: 0.90,
      clearcoatRoughness: 0.09,
      reflectivity: 0.92,
      envMapIntensity: 1.8,
      side: THREE.DoubleSide,
    });

    // Tier 3: Atmospheric Soft Graphite (Subtle background depth)
    const deepGraphiteMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xa4abb8,
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.78,
      clearcoatRoughness: 0.14,
      reflectivity: 0.82,
      envMapIntensity: 1.35,
      transparent: true,
      opacity: 0.80,
      side: THREE.DoubleSide,
    });

    const materials = [polishedChromeMaterial, satinSteelMaterial, deepGraphiteMaterial];

    // 7. Liquid Chrome Metallic Ribbons (Sculptural, floating, tapered forms matching reference)
    const ribbonConfigs: RibbonDef[] = [
      // Ribbon 1: Upper Sky Horizon Arc (Upper region & behind navigation)
      // Flows gracefully across the top of the hero section, framing the header.
      {
        id: 'upper-sky-arc',
        segments: 110,
        radialSegments: 12,
        maxWidth: 0.44,
        maxThickness: 0.054,
        twistSpeed: 0.11,
        twistFreq: 1.25,
        twistPhase: 0.35,
        contourOffsets: [-0.40, 0.40],
        materialIndex: 0, // Polished Chrome
        edgeOpacity: 0.92,
        contourOpacity: 0.55,
        taperPower: 0.85,
        undulationSpeed: 0.11,
        undulationFreq: 2.1,
        undulationAmp: 0.26,
        controlPoints: [
          {
            base: [-14.5, 5.2, -1.2],
            amp: [0.35, 0.3, 0.3],
            speed: [0.10, 0.12, 0.09],
            phase: [0.8, 1.4, 2.3],
          },
          {
            base: [-8.0, 6.2, 0.2],
            amp: [0.4, 0.35, 0.3],
            speed: [0.12, 0.11, 0.13],
            phase: [2.1, 0.6, 1.7],
          },
          {
            base: [-0.5, 5.4, 0.9],
            amp: [0.35, 0.35, 0.35],
            speed: [0.14, 0.13, 0.11],
            phase: [0.5, 2.2, 0.9],
          },
          {
            base: [7.2, 6.4, 1.4], // Crests gracefully above portrait frame
            amp: [0.4, 0.35, 0.3],
            speed: [0.13, 0.14, 0.12],
            phase: [1.9, 2.8, 0.4],
          },
          {
            base: [15.5, 4.8, -0.6],
            amp: [0.35, 0.3, 0.3],
            speed: [0.11, 0.10, 0.13],
            phase: [2.8, 1.1, 2.0],
          },
          {
            base: [19.2, 3.2, -2.0], // Needle taper into right margin
            amp: [0.25, 0.25, 0.25],
            speed: [0.09, 0.10, 0.09],
            phase: [1.2, 3.0, 1.5],
          },
        ],
      },

      // Ribbon 2: Right Portrait Frame Helix (Framing the portrait with liquid chrome)
      {
        id: 'right-portrait-helix',
        segments: 95,
        radialSegments: 12,
        maxWidth: 0.40,
        maxThickness: 0.050,
        twistSpeed: 0.12,
        twistFreq: 1.4,
        twistPhase: Math.PI * 0.55,
        contourOffsets: [-0.36, 0.36],
        materialIndex: 0, // Polished Chrome
        edgeOpacity: 0.90,
        contourOpacity: 0.52,
        taperPower: 0.88,
        undulationSpeed: 0.12,
        undulationFreq: 2.2,
        undulationAmp: 0.24,
        controlPoints: [
          {
            base: [6.8, 4.2, 1.6],
            amp: [0.3, 0.3, 0.3],
            speed: [0.11, 0.13, 0.10],
            phase: [0.9, 1.8, 2.7],
          },
          {
            base: [11.8, 2.5, 0.8],
            amp: [0.35, 0.35, 0.3],
            speed: [0.13, 0.11, 0.14],
            phase: [2.4, 0.5, 1.9],
          },
          {
            base: [14.6, -0.4, 0.2],
            amp: [0.35, 0.35, 0.35],
            speed: [0.12, 0.14, 0.11],
            phase: [0.7, 2.3, 0.6],
          },
          {
            base: [12.2, -3.2, -0.8],
            amp: [0.3, 0.3, 0.3],
            speed: [0.10, 0.12, 0.12],
            phase: [3.1, 1.6, 2.4],
          },
          {
            base: [15.8, -4.8, -1.8], // Tapers down gracefully
            amp: [0.25, 0.25, 0.25],
            speed: [0.09, 0.09, 0.10],
            phase: [1.5, 2.9, 0.8],
          },
        ],
      },

      // Ribbon 3: Mid-Left Sinuous Thread (Upper-left flank accent)
      {
        id: 'mid-left-thread',
        segments: 85,
        radialSegments: 12,
        maxWidth: 0.30,
        maxThickness: 0.038,
        twistSpeed: 0.10,
        twistFreq: 1.2,
        twistPhase: Math.PI * 0.8,
        contourOffsets: [-0.32, 0.32],
        materialIndex: 1, // Satin Steel
        edgeOpacity: 0.82,
        contourOpacity: 0.46,
        taperPower: 0.90,
        undulationSpeed: 0.10,
        undulationFreq: 2.0,
        undulationAmp: 0.20,
        controlPoints: [
          {
            base: [-18.5, 2.8, -1.6],
            amp: [0.3, 0.3, 0.25],
            speed: [0.09, 0.11, 0.10],
            phase: [1.4, 2.2, 0.7],
          },
          {
            base: [-13.2, 3.8, -0.4],
            amp: [0.35, 0.35, 0.3],
            speed: [0.12, 0.10, 0.12],
            phase: [2.5, 0.8, 1.9],
          },
          {
            base: [-8.4, 2.9, 0.5],
            amp: [0.35, 0.3, 0.35],
            speed: [0.14, 0.13, 0.11],
            phase: [0.6, 2.0, 3.1],
          },
          {
            base: [-3.8, 3.9, -0.6], // Softly tapers into negative space
            amp: [0.25, 0.25, 0.25],
            speed: [0.10, 0.12, 0.09],
            phase: [2.8, 1.3, 0.5],
          },
        ],
      },

      // Ribbon 4: Central Corridor Whisper (Floating between text & portrait)
      {
        id: 'central-whisper',
        segments: 80,
        radialSegments: 12,
        maxWidth: 0.28,
        maxThickness: 0.035,
        twistSpeed: 0.12,
        twistFreq: 1.5,
        twistPhase: Math.PI * 1.1,
        contourOffsets: [-0.30, 0.30],
        materialIndex: 0, // Polished Chrome
        edgeOpacity: 0.84,
        contourOpacity: 0.48,
        taperPower: 0.85,
        undulationSpeed: 0.13,
        undulationFreq: 2.4,
        undulationAmp: 0.26,
        controlPoints: [
          {
            base: [-2.8, -1.2, -0.8],
            amp: [0.25, 0.25, 0.25],
            speed: [0.11, 0.10, 0.12],
            phase: [0.7, 1.9, 2.8],
          },
          {
            base: [-0.6, 0.5, 0.6],
            amp: [0.3, 0.35, 0.25],
            speed: [0.13, 0.12, 0.11],
            phase: [2.0, 0.6, 1.5],
          },
          {
            base: [1.9, 1.9, 0.8],
            amp: [0.35, 0.3, 0.3],
            speed: [0.12, 0.14, 0.12],
            phase: [3.1, 2.1, 0.4],
          },
          {
            base: [3.9, 3.1, -0.4],
            amp: [0.25, 0.25, 0.25],
            speed: [0.10, 0.11, 0.09],
            phase: [0.9, 3.2, 2.2],
          },
        ],
      },

      // Ribbon 5: Lower Undulating Wave (Bottom hero horizon grounding)
      {
        id: 'lower-undulating-wave',
        segments: 105,
        radialSegments: 12,
        maxWidth: 0.42,
        maxThickness: 0.052,
        twistSpeed: 0.09,
        twistFreq: 1.1,
        twistPhase: Math.PI * 0.4,
        contourOffsets: [-0.38, 0.38],
        materialIndex: 1, // Satin Steel
        edgeOpacity: 0.86,
        contourOpacity: 0.50,
        taperPower: 0.88,
        undulationSpeed: 0.09,
        undulationFreq: 1.9,
        undulationAmp: 0.22,
        controlPoints: [
          {
            base: [-17.0, -5.2, -1.8],
            amp: [0.3, 0.3, 0.25],
            speed: [0.08, 0.10, 0.09],
            phase: [1.1, 2.3, 0.5],
          },
          {
            base: [-9.5, -4.2, -0.6],
            amp: [0.35, 0.35, 0.3],
            speed: [0.11, 0.09, 0.12],
            phase: [2.4, 0.7, 1.8],
          },
          {
            base: [-1.2, -5.4, 0.6],
            amp: [0.35, 0.3, 0.35],
            speed: [0.13, 0.12, 0.10],
            phase: [0.6, 1.8, 3.0],
          },
          {
            base: [7.5, -4.6, 1.0],
            amp: [0.35, 0.35, 0.3],
            speed: [0.12, 0.13, 0.11],
            phase: [2.7, 1.4, 0.7],
          },
          {
            base: [16.8, -5.8, -1.5],
            amp: [0.3, 0.25, 0.25],
            speed: [0.09, 0.11, 0.08],
            phase: [1.3, 3.1, 2.1],
          },
        ],
      },
    ];

    // 8. Standalone Delicate Contour Lines / Spline Filaments (Tracing pure silver vectors in space)
    const independentContours: IndependentContourDef[] = [
      // Contour 1: Upper Echo Streamline (Ethereal wire arcing just above the top ribbon)
      {
        id: 'upper-echo-streamline',
        segments: 90,
        opacity: 0.75,
        color: 0xffffff,
        controlPoints: [
          {
            base: [-16.0, 6.2, -1.5],
            amp: [0.3, 0.3, 0.2],
            speed: [0.10, 0.12, 0.09],
            phase: [1.0, 1.6, 2.5],
          },
          {
            base: [-8.5, 7.3, 0.0],
            amp: [0.35, 0.35, 0.25],
            speed: [0.12, 0.11, 0.12],
            phase: [2.3, 0.8, 1.9],
          },
          {
            base: [0.0, 6.6, 0.7],
            amp: [0.3, 0.3, 0.3],
            speed: [0.13, 0.13, 0.10],
            phase: [0.7, 2.4, 1.1],
          },
          {
            base: [8.5, 7.5, 1.2],
            amp: [0.35, 0.3, 0.25],
            speed: [0.12, 0.14, 0.11],
            phase: [2.1, 3.0, 0.6],
          },
          {
            base: [17.0, 5.8, -0.8],
            amp: [0.25, 0.25, 0.2],
            speed: [0.09, 0.10, 0.09],
            phase: [1.4, 1.2, 2.3],
          },
        ],
      },

      // Contour 2: Mid-Depth Topographical Wire (Weaving behind portrait & mid-space)
      {
        id: 'mid-depth-contour',
        segments: 85,
        opacity: 0.58,
        color: 0xdde2ea,
        controlPoints: [
          {
            base: [-13.5, 0.8, -2.5],
            amp: [0.25, 0.25, 0.2],
            speed: [0.08, 0.10, 0.08],
            phase: [0.5, 1.8, 2.6],
          },
          {
            base: [-5.0, -0.4, -2.0],
            amp: [0.3, 0.3, 0.25],
            speed: [0.10, 0.09, 0.11],
            phase: [1.8, 0.6, 1.7],
          },
          {
            base: [4.2, 0.3, -1.8],
            amp: [0.3, 0.3, 0.25],
            speed: [0.11, 0.11, 0.10],
            phase: [2.9, 2.2, 0.5],
          },
          {
            base: [13.0, -1.2, -2.2],
            amp: [0.25, 0.25, 0.2],
            speed: [0.09, 0.10, 0.08],
            phase: [0.7, 3.3, 1.6],
          },
        ],
      },

      // Contour 3: Lower-Right Echo Wire (Slender filament floating near bottom right)
      {
        id: 'lower-right-filament',
        segments: 80,
        opacity: 0.68,
        color: 0xf3f5f8,
        controlPoints: [
          {
            base: [5.0, -3.8, -0.5],
            amp: [0.25, 0.25, 0.2],
            speed: [0.09, 0.11, 0.10],
            phase: [0.6, 1.8, 2.9],
          },
          {
            base: [10.2, -5.0, 0.4],
            amp: [0.3, 0.35, 0.25],
            speed: [0.12, 0.10, 0.12],
            phase: [1.8, 0.6, 1.7],
          },
          {
            base: [15.4, -4.2, -1.0],
            amp: [0.25, 0.25, 0.2],
            speed: [0.13, 0.12, 0.10],
            phase: [3.1, 2.3, 0.5],
          },
          {
            base: [18.5, -5.5, -2.2],
            amp: [0.2, 0.2, 0.2],
            speed: [0.09, 0.10, 0.08],
            phase: [0.9, 3.2, 2.1],
          },
        ],
      },
    ];

    // 9. Ambient Micro-Sparkle Particles (Subtle floating silver dust in 3D void)
    const particleCount = 45;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: { vx: number; vy: number; vz: number; baseAlpha: number }[] = [];

    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 36;
      particlePositions[p * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 12 - 2;
      particleSpeeds.push({
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        vz: (Math.random() - 0.5) * 0.002,
        baseAlpha: 0.3 + Math.random() * 0.45,
      });
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf3f5f8,
      size: 0.08,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 10. Instantiate Ribbon Meshes & Contour Wireframes
    interface RibbonRuntime {
      config: RibbonDef;
      mesh: THREE.Mesh;
      geometry: THREE.BufferGeometry;
      positions: Float32Array;
      edgeLineLeft: THREE.Line;
      edgeLineRight: THREE.Line;
      contourLines: THREE.Line[];
      contourGeometries: THREE.BufferGeometry[];
      edgeMaterial: THREE.LineBasicMaterial;
      contourMaterial: THREE.LineBasicMaterial;
    }

    const ribbons: RibbonRuntime[] = ribbonConfigs.map((cfg) => {
      const vertCount = (cfg.segments + 1) * cfg.radialSegments;
      const positions = new Float32Array(vertCount * 3);
      const indices: number[] = [];

      for (let i = 0; i < cfg.segments; i++) {
        for (let j = 0; j < cfg.radialSegments; j++) {
          const a = i * cfg.radialSegments + j;
          const b = (i + 1) * cfg.radialSegments + j;
          const c = (i + 1) * cfg.radialSegments + ((j + 1) % cfg.radialSegments);
          const d = i * cfg.radialSegments + ((j + 1) % cfg.radialSegments);
          indices.push(a, b, d);
          indices.push(b, c, d);
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setIndex(indices);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const mat = materials[cfg.materialIndex];
      const mesh = new THREE.Mesh(geometry, mat);
      scene.add(mesh);

      // Edge specular lines
      const edgeMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: cfg.edgeOpacity,
        linewidth: 1.5,
      });

      const edgeLineLeftGeom = new THREE.BufferGeometry();
      edgeLineLeftGeom.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array((cfg.segments + 1) * 3), 3)
      );
      const edgeLineLeft = new THREE.Line(edgeLineLeftGeom, edgeMaterial);
      scene.add(edgeLineLeft);

      const edgeLineRightGeom = new THREE.BufferGeometry();
      edgeLineRightGeom.setAttribute(
        'position',
        new THREE.BufferAttribute(new Float32Array((cfg.segments + 1) * 3), 3)
      );
      const edgeLineRight = new THREE.Line(edgeLineRightGeom, edgeMaterial);
      scene.add(edgeLineRight);

      // Ribbon surface longitudinal contour lines
      const contourMaterial = new THREE.LineBasicMaterial({
        color: 0xf3f5f8,
        transparent: true,
        opacity: cfg.contourOpacity,
        linewidth: 1,
      });

      const contourLines: THREE.Line[] = [];
      const contourGeometries: THREE.BufferGeometry[] = [];

      cfg.contourOffsets.forEach(() => {
        const cGeom = new THREE.BufferGeometry();
        cGeom.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array((cfg.segments + 1) * 3), 3)
        );
        const cLine = new THREE.Line(cGeom, contourMaterial);
        scene.add(cLine);
        contourLines.push(cLine);
        contourGeometries.push(cGeom);
      });

      return {
        config: cfg,
        mesh,
        geometry,
        positions,
        edgeLineLeft,
        edgeLineRight,
        contourLines,
        contourGeometries,
        edgeMaterial,
        contourMaterial,
      };
    });

    // 11. Instantiate Independent Contour Lines
    interface ContourRuntime {
      config: IndependentContourDef;
      line: THREE.Line;
      geometry: THREE.BufferGeometry;
      positions: Float32Array;
      material: THREE.LineBasicMaterial;
    }

    const contourRuntimes: ContourRuntime[] = independentContours.map((cfg) => {
      const positions = new Float32Array((cfg.segments + 1) * 3);
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.LineBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: cfg.opacity,
        linewidth: 1.2,
      });

      const line = new THREE.Line(geometry, material);
      scene.add(line);

      return {
        config: cfg,
        line,
        geometry,
        positions,
        material,
      };
    });

    // 12. Interactive Mouse Parallax & Scroll
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // 13. Responsive Calibration
    const onResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      camera.aspect = newW / newH;

      if (newW < 768) {
        camera.fov = 50;
        camera.position.z = 20;
      } else {
        camera.fov = 45;
        camera.position.z = 18;
      }
      camera.updateProjectionMatrix();

      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    window.addEventListener('resize', onResize);
    onResize();

    // 14. Smooth Render Loop
    let animationFrameId: number;
    let elapsedTime = 0;
    const clock = new THREE.Clock();

    const tempNormal = new THREE.Vector3();
    const tempBinormal = new THREE.Vector3();
    const tempTangent = new THREE.Vector3();
    const tempVertex = new THREE.Vector3();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      elapsedTime += delta * 0.75; // Smooth, slow, fluid rate

      // Gentle parallax interpolation
      mouseX += (targetMouseX - mouseX) * 0.035;
      mouseY += (targetMouseY - mouseY) * 0.035;
      scrollY += (targetScrollY - scrollY) * 0.045;

      camera.position.x = mouseX * 0.9;
      camera.position.y = mouseY * 0.55 - scrollY * 0.0018;
      camera.lookAt(0, -scrollY * 0.0018, 0);

      // Key light specular movement
      keyLight.position.x = 7 + Math.sin(elapsedTime * 0.20) * 2.2;
      keyLight.position.y = 13 + Math.cos(elapsedTime * 0.16) * 1.5;

      // Update Particles
      const pPositions = particleGeometry.attributes.position.array as Float32Array;
      for (let p = 0; p < particleCount; p++) {
        pPositions[p * 3] += particleSpeeds[p].vx;
        pPositions[p * 3 + 1] += particleSpeeds[p].vy;
        pPositions[p * 3 + 2] += particleSpeeds[p].vz;

        // Wrap particles gracefully
        if (pPositions[p * 3] > 18) pPositions[p * 3] = -18;
        if (pPositions[p * 3] < -18) pPositions[p * 3] = 18;
        if (pPositions[p * 3 + 1] > 12) pPositions[p * 3 + 1] = -12;
        if (pPositions[p * 3 + 1] < -12) pPositions[p * 3 + 1] = 12;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Update Ribbons
      ribbons.forEach((ribbon) => {
        const { config, geometry, positions, edgeLineLeft, edgeLineRight, contourGeometries } = ribbon;

        // Animate Control Points
        const animatedPoints: THREE.Vector3[] = config.controlPoints.map((cp) => {
          const dx =
            Math.sin(elapsedTime * cp.speed[0] + cp.phase[0]) * cp.amp[0] +
            Math.cos(elapsedTime * cp.speed[0] * 0.6 + cp.phase[0] * 1.3) * (cp.amp[0] * 0.25);
          const dy =
            Math.cos(elapsedTime * cp.speed[1] + cp.phase[1]) * cp.amp[1] +
            Math.sin(elapsedTime * cp.speed[1] * 0.5 + cp.phase[1] * 1.1) * (cp.amp[1] * 0.2);
          const dz = Math.sin(elapsedTime * cp.speed[2] + cp.phase[2]) * cp.amp[2];

          return new THREE.Vector3(
            cp.base[0] + dx,
            cp.base[1] + dy,
            cp.base[2] + dz
          );
        });

        const curve = new THREE.CatmullRomCurve3(animatedPoints, false, 'centripetal', 0.5);
        const frames = curve.computeFrenetFrames(config.segments, false);

        const edgeLeftPos = edgeLineLeft.geometry.attributes.position.array as Float32Array;
        const edgeRightPos = edgeLineRight.geometry.attributes.position.array as Float32Array;
        const contourPosArrays = contourGeometries.map(
          (cg) => cg.attributes.position.array as Float32Array
        );

        const taperPower = config.taperPower ?? 0.85;
        const undulSpeed = config.undulationSpeed ?? 0.1;
        const undulFreq = config.undulationFreq ?? 2.0;
        const undulAmp = config.undulationAmp ?? 0.24;

        for (let i = 0; i <= config.segments; i++) {
          const u = i / config.segments;
          const curvePoint = curve.getPointAt(u);

          tempTangent.copy(frames.tangents[i]);
          tempNormal.copy(frames.normals[i]);
          tempBinormal.copy(frames.binormals[i]);

          const twistAngle =
            Math.sin(u * Math.PI * config.twistFreq + elapsedTime * config.twistSpeed + config.twistPhase) * 0.65;

          tempNormal.applyAxisAngle(tempTangent, twistAngle);
          tempBinormal.applyAxisAngle(tempTangent, twistAngle);

          // Smooth needle-tapering envelope
          const taperEnvelope = Math.pow(Math.sin(u * Math.PI), taperPower);
          const organicModulation = 1.0 + Math.sin(u * Math.PI * undulFreq + elapsedTime * undulSpeed) * undulAmp;
          const curWidth = config.maxWidth * taperEnvelope * organicModulation;
          const curThickness = config.maxThickness * taperEnvelope;

          for (let j = 0; j < config.radialSegments; j++) {
            const phi = (j / config.radialSegments) * Math.PI * 2;
            const xOffset = Math.cos(phi) * (curWidth * 0.5);
            const yOffset = Math.sin(phi) * (curThickness * 0.5);

            tempVertex
              .copy(curvePoint)
              .addScaledVector(tempNormal, xOffset)
              .addScaledVector(tempBinormal, yOffset);

            const vIdx = (i * config.radialSegments + j) * 3;
            positions[vIdx] = tempVertex.x;
            positions[vIdx + 1] = tempVertex.y;
            positions[vIdx + 2] = tempVertex.z;

            // Highlight crest edges
            if (j === 0) {
              const eIdx = i * 3;
              edgeLeftPos[eIdx] = tempVertex.x;
              edgeLeftPos[eIdx + 1] = tempVertex.y;
              edgeLeftPos[eIdx + 2] = tempVertex.z;
            } else if (j === Math.floor(config.radialSegments / 2)) {
              const eIdx = i * 3;
              edgeRightPos[eIdx] = tempVertex.x;
              edgeRightPos[eIdx + 1] = tempVertex.y;
              edgeRightPos[eIdx + 2] = tempVertex.z;
            }
          }

          // Longitudinal contour wires
          config.contourOffsets.forEach((relOffset, cIdx) => {
            const cPos = contourPosArrays[cIdx];
            const actualOffset = relOffset * (curWidth * 0.85);
            const cVertex = tempVertex
              .copy(curvePoint)
              .addScaledVector(tempNormal, actualOffset)
              .addScaledVector(tempBinormal, Math.sin(u * Math.PI * 3 + elapsedTime * 0.8) * (curThickness * 0.5));

            const idx3 = i * 3;
            cPos[idx3] = cVertex.x;
            cPos[idx3 + 1] = cVertex.y;
            cPos[idx3 + 2] = cVertex.z;
          });
        }

        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();

        edgeLineLeft.geometry.attributes.position.needsUpdate = true;
        edgeLineRight.geometry.attributes.position.needsUpdate = true;

        contourGeometries.forEach((cg) => {
          cg.attributes.position.needsUpdate = true;
        });
      });

      // Update Standalone Independent Contour Filaments
      contourRuntimes.forEach((cr) => {
        const { config, geometry, positions } = cr;

        const animatedPoints: THREE.Vector3[] = config.controlPoints.map((cp) => {
          const dx =
            Math.sin(elapsedTime * cp.speed[0] + cp.phase[0]) * cp.amp[0] +
            Math.cos(elapsedTime * cp.speed[0] * 0.7 + cp.phase[0] * 1.2) * (cp.amp[0] * 0.2);
          const dy =
            Math.cos(elapsedTime * cp.speed[1] + cp.phase[1]) * cp.amp[1] +
            Math.sin(elapsedTime * cp.speed[1] * 0.6 + cp.phase[1] * 1.0) * (cp.amp[1] * 0.18);
          const dz = Math.sin(elapsedTime * cp.speed[2] + cp.phase[2]) * cp.amp[2];

          return new THREE.Vector3(
            cp.base[0] + dx,
            cp.base[1] + dy,
            cp.base[2] + dz
          );
        });

        const curve = new THREE.CatmullRomCurve3(animatedPoints, false, 'centripetal', 0.5);

        for (let i = 0; i <= config.segments; i++) {
          const u = i / config.segments;
          const pt = curve.getPointAt(u);
          const idx3 = i * 3;
          positions[idx3] = pt.x;
          positions[idx3 + 1] = pt.y;
          positions[idx3 + 2] = pt.z;
        }

        geometry.attributes.position.needsUpdate = true;
      });

      renderer.render(scene, camera);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    if (prefersReducedMotion) {
      animate();
    } else {
      animationFrameId = requestAnimationFrame(animate);
    }

    // 15. Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      ribbons.forEach((ribbon) => {
        scene.remove(ribbon.mesh);
        scene.remove(ribbon.edgeLineLeft);
        scene.remove(ribbon.edgeLineRight);
        ribbon.contourLines.forEach((cl) => scene.remove(cl));

        ribbon.geometry.dispose();
        ribbon.edgeLineLeft.geometry.dispose();
        ribbon.edgeLineRight.geometry.dispose();
        ribbon.contourGeometries.forEach((cg) => cg.dispose());
        ribbon.edgeMaterial.dispose();
        ribbon.contourMaterial.dispose();
      });

      contourRuntimes.forEach((cr) => {
        scene.remove(cr.line);
        cr.geometry.dispose();
        cr.material.dispose();
      });

      scene.remove(particles);
      particleGeometry.dispose();
      particleMaterial.dispose();

      materials.forEach((m) => m.dispose());
      envMap.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 3D WebGL Liquid Chrome Canvas Mount */}
      <div
        ref={containerRef}
        className="w-full h-full block"
      />

      {/* Atmospheric deep charcoal-black vignette layer matching reference image */}
      <div
        className="absolute inset-0 bg-radial-[circle_at_50%_35%] from-transparent via-[#0B0D10]/40 to-[#08090B]/90 pointer-events-none"
      />

      {/* Velvety central negative space protection zone to guarantee flawless typography contrast */}
      <div
        className="absolute top-[38%] left-[28%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0A0C0E]/60 blur-[120px] pointer-events-none"
      />
    </div>
  );
};
