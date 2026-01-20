import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),

    ],

});