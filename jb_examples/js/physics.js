var scene, camera, renderer;
var cubeGeometry, cube, material;
var sphereGeometry, sphere;
var objects = [];
var lastTime;
var onRenderFcts = [];

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//Setup Scene and Effects
scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(0x000000, 0.001);
//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//CAMERA
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 2;
camera.position.y = 88;
camera.position.z = 150;
// camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 3000 );
// camera.position.z = 15;
//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//Setup renderer
renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls( camera, renderer.domElement );
//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//LIGHTS
var light = new THREE.AmbientLight(0x111111); // soft white light
scene.add(light);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(1, 20, 10);
spotLight.castShadow = true;
spotLight.shadowCameraNear = 8;
spotLight.shadowCameraFar = 30;
spotLight.shadowMapWidth = 1024;
spotLight.shadowMapHeight = 1024;
spotLight.angle = 1;
spotLight.exponent = 5;
spotLight.shadowDarkness = 1;
spotLight.name = 'SpotLight';

var pointLightOne = new THREE.PointLight(0xff0000);
pointLightOne.position.set(1, 1, 10);

scene.add( light, spotLight, pointLightOne);



//////////////////////////////////////////////////////////////////////////////////
  //    oimo world              //
  //////////////////////////////////////////////////////////////////////////////////
  var world = new OIMO.World(1/120, 2, 8)
  setInterval(function(){
    world.step()
  }, 1000/60);
  //////////////////////////////////////////////////////////////////////////////////
  //    Ground                //
  //////////////////////////////////////////////////////////////////////////////////
  
  var geometry  = new THREE.BoxGeometry(100,100,400); 
  var material  = new THREE.MeshPhongMaterial( { color: 0xffffff,
                            emissive: 0x072534,
                            shininess: 100,
                            side: THREE.DoubleSide,
                            shading: THREE.SmoothShading
                          });
  var mesh  = new THREE.Mesh( geometry, material );
  mesh.position.y = -geometry.parameters.height/2
  mesh.rotation.x = .1;
  scene.add(mesh)
  
  var ground  = THREEx.Oimo.createBodyFromMesh(world, mesh, {
    move : false
  })


material = new THREE.MeshBasicMaterial( {color: 0x00ff00, wireframe: true });
sphereGeometry = new THREE.SphereGeometry( 1 );
mesh = new THREE.Mesh( sphereGeometry, material);
mesh.position.y = 20;
scene.add(mesh);

var sphereBody  = THREEx.Oimo.createBodyFromMesh(world, mesh)
  

//
//RENDER
//

var render = function() {

    requestAnimationFrame(render);
    
    THREEx.Oimo.updateObject3dWithBody(mesh, sphereBody);
    controls.update();
    
    renderer.render(scene, camera);
    
};

$(document).ready(function() {
  render();
});
render();