import * as Comlink from 'https://unpkg.com/comlinkjs@^3.2.0?module';

const wasmImport = import('/wasm/pkg/wasm.js');

const exposed = {
  /** @type {import('/wasm/pkg/wasm.js').GifEncoder} */
  GifEncoder: null,
  async initialize() {
    const wasm = await wasmImport;
    wasm.initialize();
    exposed.GifEncoder = wasm.GifEncoder;
  },
};

Comlink.expose(exposed, self);
