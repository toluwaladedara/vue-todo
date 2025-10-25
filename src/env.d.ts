// src/env.d.ts

/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // DefineComponent is used to get proper type inference for Vue components
    const component: DefineComponent<{}, {}, any>
    export default component
  }