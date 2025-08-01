import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./src/cli/index.tsx'],
  platform: 'node',
  dts: {
    isolatedDeclarations: true,
  },
});
