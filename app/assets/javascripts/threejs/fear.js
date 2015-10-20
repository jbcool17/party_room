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
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 15;
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

//++++++++++++++++++++++++++++++++++++++ 
//++++++++++++++++++++++++++++++++++++++ 
//++++++++++++++++++++++++++++++++++++++ 
var material  = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true });
var sphereHold = [];
var Z = 0;
for (var k = 0; k < 10; k++ ){
  var Y = 0;
  for (var i = 0; i < 10; i ++ ) {
    var X = 0;
    for (var j = 0; j < 10; j ++ ) {
      sphereGeometry = new THREE.SphereGeometry( 5 );
      mesh = new THREE.Mesh( sphereGeometry, material);
      mesh.position.x = X
      mesh.position.y = Y
      mesh.position.z = Z;
      scene.add(mesh);
      sphereHold.push(mesh);
      X +=20; 
    }
    Y += 20;
  }
  Z += 20
}

  

//
//RENDER
//

var render = function() {

    requestAnimationFrame(render);

    for (var i = 0; i < sphereHold.length; i++ ) {
      sphereHold[i].rotation.x += 0.01;
    }
    
    controls.update();
    
    renderer.render(scene, camera);
    
};

$(document).ready(function() {

  render();

});
