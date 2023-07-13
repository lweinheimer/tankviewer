
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { DatahubService } from '../datahub.service';


@Component({
  selector: 'app-tank3d',
  templateUrl: './tank3d.component.html',
  styleUrls: ['./tank3d.component.css']
})
export class Tank3dComponent implements AfterViewInit {
  @ViewChild('canvas') private canvasRef!: ElementRef;

  //? Stage Properties
  private fieldOfView: number = 1;
  private nearClippingPane: number = 1;
  private farClippingPane: number = 1000;

  //? Scene properties
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private ambientLight!: THREE.AmbientLight;
  private light1!: THREE.PointLight;
  private light2!: THREE.PointLight;
  private light3!: THREE.PointLight;
  private light4!: THREE.PointLight;
  private tank: any;
  private ground: any;
  private liquid: any;
  private directionalLight!: THREE.DirectionalLight;

  //? Helper Properties (Private Properties);
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  private loaderGLTF = new GLTFLoader();
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  constructor(private datahub: DatahubService) {
    datahub.getData('TankID').subscribe(data => {
      const level = parseFloat(data[0].value);
      if (this.liquid) {
        this.liquid.scale.z = level / 100;
        this.liquid.position.z = -1.3 + level / 100;
      }
      });
  }

  ngAfterViewInit() {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }

  updateLevel(event: any) {
    if (this.liquid) {
      this.liquid.scale.z = event / 50;
      this.liquid.position.z = 0 - event / 50;
    }
  }

  private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(this.canvas.width, this.canvas.height);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enableRotate = false;
    this.controls.enableZoom = false;
    this.controls.enablePan = false;
    this.controls.update();
  };

  private createScene() {
    //? Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff)
    this.loaderGLTF.load('assets/water_tank.glb', (gltf: GLTF) => {
      this.tank = gltf.scene.children[0];
      var box = new THREE.Box3().setFromObject(this.tank);
      box.getCenter(this.tank.position); 
      this.tank.position.multiplyScalar(-1);
      this.tank.material.color.setHex(0xdddddee);
      this.scene.add(this.tank);
      this.ground = gltf.scene.children[0];
      var box = new THREE.Box3().setFromObject(this.ground);
      box.getCenter(this.ground.position); 
      this.ground.position.multiplyScalar(-1);
      this.ground.material.color.setHex(0x005500);
      this.scene.add(this.ground);
      this.liquid = gltf.scene.children[0];
      console.log(this.liquid);
      var box = new THREE.Box3().setFromObject(this.liquid);
      box.getCenter(this.liquid.position); 
      this.liquid.position.multiplyScalar(-1);
      this.liquid.material.color.setHex(0x000055);
      this.scene.add(this.liquid);
    });

   //? Camera
   let aspectRatio = this.getAspectRatio();
   this.camera = new THREE.PerspectiveCamera(
     this.fieldOfView,
     aspectRatio,
     this.nearClippingPane,
     this.farClippingPane
   )
   this.camera.position.x = 0;
   this.camera.position.y = -310;
   this.camera.position.z = 100;

   const lightColor = 0x555555;
   this.ambientLight = new THREE.AmbientLight(0x00000, 100);
   this.scene.add(this.ambientLight);
   this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
   this.directionalLight.position.set(0, 1, 0);
   this.directionalLight.castShadow = true

   this.scene.add(this.directionalLight);
   this.light1 = new THREE.PointLight(lightColor, 10);
   this.light1.position.set(0, 200, 400);
   this.scene.add(this.light1);
   this.light2 = new THREE.PointLight(lightColor, 10);
   this.light2.position.set(500, 100, 0);
   this.scene.add(this.light2);
   this.light3 = new THREE.PointLight(lightColor, 10);
   this.light3.position.set(0, -300, -500);
   this.scene.add(this.light3);
   this.light4 = new THREE.PointLight(lightColor, 10);
   this.light4.position.set(-500, 300, 500);
   this.scene.add(this.light4);
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop() {
    //? Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: Tank3dComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      requestAnimationFrame(render);
    }());
  }
}
