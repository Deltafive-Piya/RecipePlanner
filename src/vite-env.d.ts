/// <reference types="vite/client" />

// Allow importing CSS files (Vite injects them)
declare module '*.css' {
    const content: string;
    export default content;
}