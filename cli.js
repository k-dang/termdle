#!/usr/bin/env node

import('./dist/index.js').catch(err => {
  console.error('Failed to load termdle:', err.message);
  process.exit(1);
});
