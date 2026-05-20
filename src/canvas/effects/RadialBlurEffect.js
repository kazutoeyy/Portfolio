/**
 * RadialBlurEffect.js — Custom radial motion blur
 *
 * Blurs pixels radially from screen center, simulating
 * zoom motion blur (like After Effects motion blur during dolly).
 * 8 samples per pixel for performance.
 *
 * Usage: driven by transitionProgress bell curve in PostProcessing.
 */

import { Uniform } from 'three'
import { Effect } from 'postprocessing'

const fragmentShader = /* glsl */ `
uniform float uStrength;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
  if (uStrength < 0.001) {
    outputColor = inputColor;
    return;
  }

  vec2 center = vec2(0.5);
  vec2 dir = uv - center;
  vec4 color = vec4(0.0);
  float totalWeight = 0.0;

  // 8 samples with triangle weighting
  for (int i = 0; i < 8; i++) {
    float t = float(i) / 7.0;
    float weight = 1.0 - abs(t - 0.5) * 2.0;
    vec2 sampleUV = uv - dir * uStrength * t;
    color += texture2D(inputBuffer, sampleUV) * weight;
    totalWeight += weight;
  }

  outputColor = color / totalWeight;
}
`

export default class RadialBlurEffect extends Effect {
  constructor({ strength = 0.0 } = {}) {
    super('RadialBlurEffect', fragmentShader, {
      uniforms: new Map([
        ['uStrength', new Uniform(strength)],
      ]),
    })
  }

  get strength() {
    return this.uniforms.get('uStrength').value
  }

  set strength(value) {
    this.uniforms.get('uStrength').value = value
  }
}
