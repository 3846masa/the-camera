import * as Comlink from 'comlinkjs';

const wasmImport = import('~/wasm/pkg');

const exposed = {
  /** @type {import('~/wasm/pkg').GifEncoder} */
  GifEncoder: null,
  async initialize() {
    const wasm = await wasmImport;
    wasm.initialize();
    exposed.GifEncoder = wasm.GifEncoder;
  },
};

Comlink.expose(exposed, self);
