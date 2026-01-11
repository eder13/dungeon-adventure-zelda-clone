const esbuild = require('esbuild');
async function watch() {
    const ctx = await esbuild.context({
        platform: 'node',
        entryPoints: ['./src/core/server.ts'],
        minify: false,
        outfile: './dist/server.js',
        bundle: true,
        loader: { '.ts': 'ts' },
        external: ['@prisma/client', '.prisma/client'],
    });
    await ctx.watch();
    console.log('Watching...');
}

watch();
