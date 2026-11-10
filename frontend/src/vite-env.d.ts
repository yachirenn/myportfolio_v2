/// <reference types="vite/client" />

declare module '*.glb';
declare module '*.png';

declare module 'meshline' {
  export const MeshLineGeometry: unknown;
  export const MeshLineMaterial: unknown;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: unknown;
      meshLineMaterial: unknown;
    }
  }
}