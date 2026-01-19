import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        {
            name: 'html-transform',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url && !req.url.includes('.') && req.url !== '/') {
                        const htmlPage = resolve(__dirname, `pages${req.url}.html`);
                        if (fs.existsSync(htmlPage)) {
                            req.url = `/pages${req.url}.html`;
                        }
                    }
                    next();
                });
            },
        },
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'pages/about.html'),
                blog: resolve(__dirname, 'pages/blog.html'),
                'blog-article': resolve(__dirname, 'pages/blog-article.html'),
                contacts: resolve(__dirname, 'pages/contacts.html'),
                delivery: resolve(__dirname, 'pages/delevery.html'),
                product: resolve(__dirname, 'pages/product.html'),
                services: resolve(__dirname, 'pages/services.html'),
                'stone-catalog': resolve(__dirname, 'pages/stone-catalog.html'),
            },
        },
    },
});