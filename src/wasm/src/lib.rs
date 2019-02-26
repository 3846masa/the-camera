extern crate color_quant;
extern crate console_error_panic_hook;
extern crate gif;
extern crate wasm_bindgen;

use color_quant::NeuQuant;
use console_error_panic_hook::set_once as set_panic_hook;
use gif::{Encoder, Frame, Repeat, SetParameter};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn initialize() {
  set_panic_hook();
}

struct FrameData {
  buffer: Vec<u8>,
}

#[wasm_bindgen]
pub struct GifEncoder {
  width: u16,
  height: u16,
  frames: Vec<FrameData>,
}

#[wasm_bindgen]
impl GifEncoder {
  #[wasm_bindgen(constructor)]
  pub fn new(width: u16, height: u16) -> GifEncoder {
    set_panic_hook();
    GifEncoder {
      width,
      height,
      frames: Vec::new(),
    }
  }

  #[wasm_bindgen(js_name = addFrame)]
  pub fn add_frame(&mut self, buffer: Vec<u8>) {
    let data = FrameData { buffer: buffer };
    self.frames.push(data);
  }

  pub fn render(&self, fps: Option<u16>) -> Vec<u8> {
    let mut output = Vec::new();
    self._render(&mut output, fps.unwrap_or(2));
    output
  }

  fn _quantize(&self, step: usize) -> (Vec<u8>, NeuQuant) {
    let image_size = self.width as usize * self.height as usize;
    let mut colors: Vec<u8> =
      Vec::with_capacity(image_size * 4 * self.frames.len() / step);

    for data in &self.frames {
      let pixel_iter = data.buffer.chunks_exact(4).step_by(step);
      for pixel in pixel_iter {
        colors.extend(pixel);
      }
    }

    let quant = NeuQuant::new(10, 256, &colors);
    let color_map = quant.color_map_rgb();

    (color_map, quant)
  }

  fn _render(&self, output: &mut Vec<u8>, fps: u16) {
    let (color_map, quant) = self._quantize(10);
    let mut encoder =
      Encoder::new(output, self.width, self.height, &color_map).unwrap();
    encoder.set(Repeat::Infinite).unwrap();

    for data in &self.frames {
      let pixel_iter = data.buffer.chunks_exact(4);
      let indexes: Vec<u8> = pixel_iter
        .map(|pixel| quant.index_of(pixel) as u8)
        .collect();

      let mut frame =
        Frame::from_indexed_pixels(self.width, self.height, &indexes, None);
      frame.delay = 100 / fps;
      encoder.write_frame(&frame).unwrap();
    }
  }
}
