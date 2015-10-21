var container;
var camera, scene, renderer;
var mesh, geometry, material;
var start_time = Date.now();
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

container = document.createElement( 'div' );
document.body.appendChild( container );

// Bg gradient
var canvas = document.createElement( 'canvas' );
canvas.width = 32;
canvas.height = window.innerHeight;
var context = canvas.getContext( '2d' );
var gradient = context.createLinearGradient( 0, 0, 0, canvas.height );
gradient.addColorStop(0, "#1e4877");
gradient.addColorStop(0.5, "#4584b4");
context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);
container.style.background = 'url(' + canvas.toDataURL('image/png') + ')';
container.style.backgroundSize = '32px 100%';

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//CAMERA
camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 3000 );
camera.position.z = 6000;

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//SCENE
scene = new THREE.Scene();

geometry = new THREE.Geometry();

var texture = THREE.ImageUtils.loadTexture( 'disc.png', null, animate );
texture.magFilter = THREE.LinearMipMapLinearFilter;
texture.minFilter = THREE.LinearMipMapLinearFilter;

var fog = new THREE.Fog( 0x00aaff, - 100, 3000 );

material = new THREE.ShaderMaterial( {

  uniforms: {

    "map": { type: "t", value: texture },
    "fogColor" : { type: "c", value: fog.color },
    "fogNear" : { type: "f", value: fog.near },
    "fogFar" : { type: "f", value: fog.far },

  },
  vertexShader: document.getElementById( 'vs' ).textContent,
  fragmentShader: document.getElementById( 'fs' ).textContent,
  depthWrite: false,
  depthTest: false,
  transparent: true

} );

var plane = new THREE.Mesh( new THREE.PlaneGeometry( 0.5, 0.5, 1.5, 10.5 ) );

for ( var i = 0; i < 18000; i++ ) {

  plane.position.x = Math.random() * 1000 - 500;
  plane.position.y = - Math.random() * Math.random() * 400;
  plane.position.z = i;
  plane.rotation.z = Math.random() * Math.PI;
  plane.scale.x = plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

  THREE.GeometryUtils.merge( geometry, plane );

}

mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

mesh = new THREE.Mesh( geometry, material );
mesh.position.z = - 8000;
scene.add( mesh );

renderer = new THREE.WebGLRenderer( { antialias: false } );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0x000000, 1); //0x4584b4
container.appendChild( renderer.domElement );

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize( event ) {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}
  
var speed = 0.1;
  function animate() {

    requestAnimationFrame( animate );

    position = ( ( Date.now() - start_time ) * (speed * 10) ) % 8000;

    camera.position.y = -50;
    camera.position.z = - position + 8000;

    renderer.render( scene, camera );

  }

  $(document).ready(function() {

    $('#velocity_value').text(speed);

    $('#velocity').on('change mouseclick', function() {
      speed = parseInt($('#velocity').val()) * 0.1;
      $('#velocity_value').text(speed);
    });
  });