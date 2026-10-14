import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';
import Sculpture from './Sculpture';
import SculptureFallback from './SculptureFallback';

class SceneErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('[HeroScene] 3D scene failed, rendering static fallback.', error);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

function hasWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

export default function HeroScene() {
  const reducedMotion = useReducedMotion() ?? false;
  const [lowPower, setLowPower] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 768px)').matches
  );
  const [webglSupported] = useState(hasWebGLSupport);
  const [inView, setInView] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setLowPower(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const frameloop = !inView ? 'never' : reducedMotion ? 'demand' : 'always';

  if (lowPower) return null;
  if (!webglSupported) return <SculptureFallback />;

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      <SceneErrorBoundary fallback={<SculptureFallback />}>
        <Canvas
          dpr={lowPower ? [1, 1] : [1, 1.75]}
          camera={{ position: [0, 0, 6.2], fov: 40 }}
          frameloop={frameloop}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
          }}
          style={{ background: 'transparent' }}
        >
          <Sculpture reducedMotion={reducedMotion} lowPower={lowPower} />
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}
