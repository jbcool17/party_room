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
camera.position.x = 214;
camera.position.y = 88;
camera.position.z = 50;
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
spotLight.position.set(1, 300, 10);
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
  
  var geometry  = new THREE.BoxGeometry(400,100,400); 
  var material  = new THREE.MeshPhongMaterial( { color: 0xffffff,
                            emissive: 0x072534,
                            shininess: 100,
                            side: THREE.DoubleSide,
                            shading: THREE.SmoothShading
                          });
  var mesh  = new THREE.Mesh( geometry, material );
  mesh.position.y = -geometry.parameters.height/2
  mesh.position.z = 50;
  mesh.rotation.x = .1;
  scene.add(mesh);
  var ground  = THREEx.Oimo.createBodyFromMesh(world, mesh, { move : false });

  var box = new THREE.BoxGeometry(15,100,1);
  var boxMesh = new THREE.Mesh( box, material);
  boxMesh.position.y = 2;
  boxMesh.position.z = 15;
  boxMesh.rotation.y = -.3;
  scene.add(boxMesh);

var boxBody  = THREEx.Oimo.createBodyFromMesh(world, boxMesh, { move: false });

var boxMesh = new THREE.Mesh( new THREE.BoxGeometry(45,100,1), material);
  boxMesh.position.y = 2
  boxMesh.position.z = 100;
  boxMesh.position.x = 10;
  boxMesh.rotation.y = .2;
  scene.add(boxMesh);

var boxBody  = THREEx.Oimo.createBodyFromMesh(world, boxMesh, { move: false });
  
  
var sphereBody
var bodies = [];
var spheres = [];
for (var i = 0; i < 10; i++ ) {
  var material  = new THREE.MeshPhongMaterial( { color: 0x00ff00,
                            emissive: 0x072534,
                            shininess: 100,
                            side: THREE.DoubleSide,
                            shading: THREE.SmoothShading
                          });
  sphereGeometry = new THREE.SphereGeometry( 1 );
  mesh = new THREE.Mesh( sphereGeometry, material);
  mesh.position.y = Math.random() * 200;
  scene.add(mesh);

  spheres.push(mesh);

  sphereBody  = THREEx.Oimo.createBodyFromMesh(world, mesh);
  bodies.push(sphereBody);
  
}

//
//RENDER
//

var render = function() {

    requestAnimationFrame(render);
    
    //WORLD Updaters
    for (var i = 0; i < bodies.length; i++ ) {
      THREEx.Oimo.updateObject3dWithBody(spheres[i], bodies[i]);
      if( spheres[i].position.y < -20 ){
          spheres[i].position.x = (Math.random()-0.5)*20
          spheres[i].position.y = 100 + (Math.random()-0.5)*15
          spheres[i].position.z = (Math.random()-0.5)*20
          bodies[i].resetPosition(spheres[i].position.x, spheres[i].position.y, spheres[i].position.z);  
        }

    }
    
    
    controls.update();
    
    renderer.render(scene, camera);
    
};

$(document).ready(function() {
  render();

  $('#velocity').on('change mousemove', function() {
   ;

  });
});
