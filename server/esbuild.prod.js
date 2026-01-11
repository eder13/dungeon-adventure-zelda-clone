require('esbuild')
    .build({
        platform: 'node',
        entryPoints: ['./src/core/server.ts'],
        outfile: './dist/server.js',
        bundle: true,
        loader: { '.ts': 'ts' },
        minify: true,
        external: ['@prisma/client', '.prisma/client'],
    })
    .then(() => console.log('⚡ Done'))
    .catch(() => process.exit(1));
