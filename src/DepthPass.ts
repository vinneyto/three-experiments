import { MeshDepthMaterial, NoBlending, Color, Scene, Camera } from 'three';
import { Pass } from 'three/examples/jsm/postprocessing/Pass.js';

class DepthPass extends Pass {
  private scene: Scene;
  private camera: Camera;
  private depthMaterial: MeshDepthMaterial;
  private clearColor: Color;

  constructor(scene: Scene, camera: Camera) {
    super();
    this.scene = scene;
    this.camera = camera;
    this.depthMaterial = new MeshDepthMaterial();
    this.depthMaterial.blending = NoBlending;
    this.clearColor = new Color();
  }

  render(renderer: any, writeBuffer: any, readBuffer: any): void {
    const prevOverride = this.scene.overrideMaterial;
    const prevClearColor = renderer.getClearColor(this.clearColor);
    const prevClearAlpha = renderer.getClearAlpha();

    this.scene.overrideMaterial = this.depthMaterial;
    renderer.setClearColor(0xffffff, 1);
    renderer.setRenderTarget(this.renderToScreen ? null : writeBuffer);
    renderer.clear();
    renderer.render(this.scene, this.camera);

    this.scene.overrideMaterial = prevOverride;
    renderer.setClearColor(prevClearColor, prevClearAlpha);
  }
}

export { DepthPass };
