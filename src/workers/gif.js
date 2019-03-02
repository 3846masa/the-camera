import * as Comlink from 'https://unpkg.com/comlinkjs@^3.2.0?module';

import '/wasm/pkg/wasm.js';

const exposed = {
  GifEncoder: null,
  async initialize() {
    await self.wasm_bindgen('/wasm/pkg/wasm_bg.wasm');
    self.wasm_bindgen.initialize();
    exposed.GifEncoder = self.wasm_bindgen.GifEncoder;
  },
};

Comlink.expose(exposed, self);
