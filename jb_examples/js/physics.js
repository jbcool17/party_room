var world, mass, body, shape, timeStep=1/60,
   camera, scene, renderer, geometry, material, mesh;

// initThree();
// initCannon();
// animate();

function initCannon() {
    world = new CANNON.World();
    world.gravity.set(0,0,0);
    world.broadphase = new CANNON.NaiveBroadphase();
    world.solver.iterations = 10;
    shape = new CANNON.Box(new CANNON.Vec3(1,1,1));
    mass = 1;
    body = new CANNON.Body({
      mass: 1
    });
    body.addShape(shape);
    //body.angularVelocity.set(0,10,0);
    body.angularDamping = 0.5;
    world.addBody(body);
}
function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 100 );
    camera.position.z = 5;
    camera.position.y = 1;
    scene.add( camera );
    geometry = new THREE.BoxGeometry( 2, 2, 2 );
    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
}
function animate() {
    requestAnimationFrame( animate );
    updatePhysics();
    render();
}
function updatePhysics() {
    // Step the physics world
    world.step(timeStep);
    // Copy coordinates from Cannon.js to Three.js
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
}
function render() {
    renderer.render( scene, camera );
}

$(document).ready(function(){
  initThree();
  initCannon();
  animate();

  var velocity = 0;
  $('#velocity_value').text(velocity);

  $('body').on('click', function(){
    body.angularVelocity.set(0,velocity,0);

  });

  $('#velocity').on("change mousemove", function() {
    velocity = $('#velocity').val();
    $('#velocity_value').text(velocity);
});



});