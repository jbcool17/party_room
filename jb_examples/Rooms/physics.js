var scene, camera, renderer;


//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//Setup Scene and Effects
scene = new THREE.Scene();

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//CAMERA
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
camera.position.x = 2;
camera.position.y = 88;
camera.position.z = 600;

var onWindowResize = function(event) {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
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
spotLight.position.set(1, 500, 10);
spotLight.intensity = 0.2
spotLight.name = 'SpotLight';
scene.add( spotLight );


var pointLightOne = new THREE.PointLight(0xff0000);
pointLightOne.position.set(1, 1, 10);
scene.add( pointLightOne );

spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(1, 500, 3000);
scene.add( spotLight ); 


//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//OIMO WORLD
var world = new OIMO.World(1/120, 2, 8);

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//OBJECTS & OIMO
var geometry  = new THREE.BoxGeometry(8000,100,8000); 
var material  = new THREE.MeshPhongMaterial( { color: 0xffffff,
                          emissive: 0x072534,
                          shininess: 100,
                          side: THREE.DoubleSide,
                          shading: THREE.SmoothShading
                        });
var mesh  = new THREE.Mesh( geometry, material );
mesh.position.y = -geometry.parameters.height/2
mesh.rotation.x = .5;
scene.add(mesh);
  
var ground  = THREEx.Oimo.createBodyFromMesh(world, mesh, { move : false });
geometry  = new THREE.BoxGeometry(8000,1,8000); 
mesh = new THREE.Mesh( geometry, material );  
mesh.position.y = -30;
scene.add(mesh);
ground  = THREEx.Oimo.createBodyFromMesh(world, mesh, { move : false });

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//RAMP
var rampMesh = new THREE.Mesh( new THREE.BoxGeometry(8000,200,10), material);
rampMesh.position.y = -10
rampMesh.position.z = 400;
rampMesh.position.x = 500;
rampMesh.rotation.x = 1.3;
scene.add(rampMesh);
var rampBody = THREEx.Oimo.createBodyFromMesh(world, rampMesh, { move: false });

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//OBSTICLES
var createStop = function (total) {
  for (var i = 0; i < total; i++ ) {
    var plusMinus = Math.floor(Math.random()*2) == 1 ? 1 : -1;
    var box = new THREE.BoxGeometry(100,100,1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    var boxMesh = new THREE.Mesh( box, material);
    boxMesh.position.y = 0;
    boxMesh.position.x = plusMinus * Math.random() * 2000;
    boxMesh.position.z = Math.random() * 3000;
    boxMesh.rotation.y = -.3;
    scene.add(boxMesh);

    var boxBody  = THREEx.Oimo.createBodyFromMesh(world, boxMesh, { move: false });
  }
}
  
//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//SPHERES
var sphereBody
var bodies = [];
var spheres = [];

var createBall = function (total) {
  for (var i = 0; i < total; i++ ) {
    var plusMinus = Math.floor(Math.random()*2) == 1 ? 1 : -1;
    var material  = new THREE.MeshPhongMaterial( { color: 0xffffff,
                              emissive: 0x072534,
                              shininess: 100,
                              side: THREE.DoubleSide,
                              shading: THREE.SmoothShading, wireframe:true
                            });
    sphereGeometry = new THREE.SphereGeometry( 15 );
    mesh = new THREE.Mesh( sphereGeometry, material);
    mesh.position.y = 2000;
    mesh.position.x = plusMinus * Math.random() * 2000;
    mesh.position.z = -2000;
    scene.add(mesh);

    spheres.push(mesh);

    sphereBody  = THREEx.Oimo.createBodyFromMesh(world, mesh);
    bodies.push(sphereBody);    
  }
}

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//RENDER
var render = function() {

    requestAnimationFrame(render);
    
    //WORLD Updaters
    for (var i = 0; i < bodies.length; i++ ) {
      THREEx.Oimo.updateObject3dWithBody(spheres[i], bodies[i]);
      var plusMinus = Math.floor(Math.random()*2) == 1 ? 1 : -1;
      if( spheres[i].position.y < -50 ){
          spheres[i].position.x = plusMinus * Math.random() * 2000;
          spheres[i].position.y = 2000;
          spheres[i].position.z = -2000;
          bodies[i].resetPosition(spheres[i].position.x, spheres[i].position.y, spheres[i].position.z);  
        }

    }
    
    world.step()
    controls.update();
    renderer.render(scene, camera); 
};

$(document).ready(function() {
  render();
  
  window.addEventListener('resize', onWindowResize, false);

  $('#balls').text(spheres.length);
  
  //UI Controls
  $('#drop').on('click', function() {
      var totalBalls = parseInt($('#total').val());
      createBall(totalBalls);
      $('#balls').text(spheres.length);

  });
});
