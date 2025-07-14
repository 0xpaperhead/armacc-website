// jest.polyfills.js
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for fetch in Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill fetch for Node.js environment if not available
if (typeof globalThis.fetch === 'undefined') {
  const { default: fetch, Headers, Request, Response } = require('node-fetch');
  globalThis.fetch = fetch;
  globalThis.Headers = Headers;
  globalThis.Request = Request;
  globalThis.Response = Response;
} 