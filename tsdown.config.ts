import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/cli/index.tsx'],
  platform: 'node',
  minify: true
});
