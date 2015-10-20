var scene, camera, renderer;
var cubeGeometry, cube, material;
var sphereGeometry, sphere;
var objects = [];
var lastTime;

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//Setup Scene and Effects
scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.001);
//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//CAMERA
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
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


//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//LIGHTS
var light = new THREE.AmbientLight(0x1111); // soft white light
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

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//CONTROLS

controls = new THREE.FirstPersonControls( camera );
                controls.movementSpeed = 20;
                controls.lookSpeed = 0.1;
                controls.lookVertical = false;

lastTime = performance.now();
// var controls = new THREE.OrbitControls(camera, renderer.domElement);
// var controlsEnabled = false;

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//RESIZER
var onWindowResize = function(event) {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}


//////////////////////////////////////////////////////////////////////////////////
  //    oimo world              //
  //////////////////////////////////////////////////////////////////////////////////
  var world = new OIMO.World(1/120, 2, 8)
  setInterval(function(){
    world.step()
  }, 1000/60);




//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//OBJECTS
phongMaterial = new THREE.MeshPhongMaterial({
    color: 0x156289,
    emissive: 0x072534
});
material = new THREE.MeshBasicMaterial({
    name: 'green-wire',
    color: 0x00ff00,
    wireframe: true
});
var planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    emissive: 0x072534,
    shininess: 100,
    side: THREE.DoubleSide,
    shading: THREE.SmoothShading
});


var planeGeometry = new THREE.PlaneGeometry(100, 100, 1);
var ground = new THREE.Mesh(planeGeometry, planeMaterial);
ground.rotateX( - Math.PI / 2 );
ground.position.y = -2;
ground.scale.x = 100;
ground.scale.y = 100;
ground.castShadow = false;
ground.receiveShadow = true;
ground.name = 'Ground'

var wallOne = new THREE.Mesh(planeGeometry, planeMaterial);
wallOne.castShadow = false;
wallOne.receiveShadow = true;
wallOne.position.z = -100;
wallOne.scale.x = 100;
wallOne.scale.y = 50;
var wallTwo = new THREE.Mesh(planeGeometry, planeMaterial);
wallTwo.castShadow = false;
wallTwo.receiveShadow = true;
wallTwo.position.z = 100;
wallTwo.scale.x = 100;
wallTwo.scale.y = 50;
var wallThree = new THREE.Mesh(planeGeometry, planeMaterial);
wallThree.rotation.y = 1.57;
wallThree.scale.x = 100;
wallThree.scale.y = 50;
wallThree.position.x = -100;
var wallFour = new THREE.Mesh(planeGeometry, planeMaterial);
wallFour.rotation.y = 1.57;
wallFour.scale.x = 100;
wallFour.scale.y = 50;
wallFour.position.x = 100;
// scene.add( ground, wallOne, wallTwo, wallThree, wallFour );
scene.add(ground);


cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

var cubeHolder = []; //holds some cube info
var cubeCreate = function(cubeName) {
    this.cubeName = cubeName;
    
    this.cubeRotation = true;

    this.cube = new THREE.Mesh(cubeGeometry, material);
    
    this.cube.castShadow = true;
    
    this.cube.name = 'Cube'

    scene.add(this.cube);

    return this.cubeName;
}

var cubeCreateTwo = function(cubeName) {
    this.cubeName = cubeName;
    
    this.cubeRotation = true;
    
    this.cube = new THREE.Mesh(cubeGeometry, material);
    
    this.cube.castShadow = true;
    
    this.cube.name = 'CubeTwo'
    
    scene.add(this.cube);

    return this.cubeName;
}

var cubeRemove = function() {
        //removes all cubes - or at least trys to.

        for (var i = 0; i < scene.children.length; i++) {

            for (var j = 0; j < cubeHolder.length; j++) {
                if (scene.children[i].id === cubeHolder[j].cube.id) {
                    scene.children.splice(i, 1);
                    cubeHolder.splice(j, 1);
                }

            }

        }
}

//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//RANDOM CUBE SYSTEM
var boxBody;
var boxBodies = [];
for ( var i = 0; i < 2000; i ++ ) {

    var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
    var randomColor = '0x' + Math.floor(Math.random()*16777215).toString(16);
    var cubeSystemMaterial = new THREE.MeshPhongMaterial( {  specular: 0x111111, 
                                                            emissive: 0x040404, 
                                                            shininess: 100, 
                                                            shading: THREE.SmoothShading, 
                                                            opacity: 0.9, 
                                                            transparent: true });
    var object = new THREE.Mesh( boxGeometry, cubeSystemMaterial );

    
    object.material.color.setHex(randomColor);

    object.position.x = (Math.random() * 1500 - 150) + 20 ;
    object.position.y = 0;
    object.position.z = (Math.random() * 1500 - 150) + 20;

    // object.rotation.x = Math.random() * 2 * Math.PI;
    // object.rotation.y = Math.random() * 2 * Math.PI;
    // object.rotation.z = Math.random() * 2 * Math.PI;

    // object.scale.x = Math.random() + 10;
    // object.scale.y = Math.random() + 10;
    // object.scale.z = Math.random() + 10;

    object.castShadow = true;
    object.name = 'CubeSystem';
    scene.add( object );

    objects.push(object);
    boxBody  = THREEx.Oimo.createBodyFromMesh(world, object, {move: false});
    boxBodies.push(boxBody);

}    
var test = new THREE.Mesh(cubeGeometry, material);
controls.object.add(test);
var person = controls.object.children[0];
var personView = THREEx.Oimo.createBodyFromMesh(world, person);
//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//PARTICLE - Star Like in Background

var sprite = THREE.ImageUtils.loadTexture("assets/textures/disc.png");
var particleCount = 1000,
    particles = new THREE.Geometry(),
    particleMaterial = new THREE.PointsMaterial({
        size: 6,
        sizeAttenuation: false,
        map: sprite,
        alphaTest: 0.5,
        transparent: true
    });

particleMaterial.color.setHSL(1.0, 5, 0.7);

// particleSystem.sortParticles = true;
// now create the individual particles
for (var p = 0; p < particleCount; p++) {

    // create a particle with random
    // position values, -250 -> 250
    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = new THREE.Vector3(pX, pY, pZ);


    particle.velocity = new THREE.Vector3( 0, -Math.random(), 0 );
    // add it to the geometry
    particles.vertices.push( particle );

}

// create the particle system
var particleSystem = new THREE.Points(
    particles,
    particleMaterial);

// add it to the scene
scene.add(particleSystem);



//===========================================================
//===========================================================
//===========================================================
var h;
var randomColor = '0x' + Math.floor(Math.random() * 16777215).toString(16);
//RENDER & ANIMATE SCENE
var render = function() {
    requestAnimationFrame(render);

    //OIMO
    // for (var i = 0; i < boxBodies.length; i++ ) {
    //   THREEx.Oimo.updateObject3dWithBody(objects[i], boxBodies[i]);
    //   if( objects[i].position.y < -20 ){
    //       objects[i].position.x = (Math.random()-0.5)*20
    //       objects[i].position.y = 100 + (Math.random()-0.5)*15
    //       objects[i].position.z = (Math.random()-0.5)*20
    //       boxBodies[i].resetPosition(objects[i].position.x, objects[i].position.y, objects[i].position.z);  
    //     }

    // }

    THREEx.Oimo.updateObject3dWithBody(person, personView);

    var time = Date.now() * 0.00005;
    // particleSystem.rotation.y += 0.01;
    h = (360 * (1.0 + time) % 360) / 360;
    material.color.setHSL(h, 0.5, 0.5);
    pointLightOne.color.setHSL(h, 0.5, 0.5);
    particleMaterial.color.setHSL(h, 0.5, 0.5);
    // planeMaterial.color.setHSL( h, 0.5, 0.5 );

    for (i = 0; i < objects.length; i++) {

        var object = objects[i];

            

    }


    //Particle SYstem
    for (i = 0; i < scene.children.length; i++) {

        var object = scene.children[i];

        var pCount = particleCount;

        if (object instanceof THREE.Points) {

            object.rotation.y += 0.0008;

        }

    }

    bar_height = -(Math.random() * 10 / 2);
    //CUBE MOVEMENT - AND GROWING
    for (var i = 0; i < scene.children.length; i++) {

        if (scene.children[i].name === "Cube" && scene.children[i].id % 2 === 0) {

            scene.children[i].rotation.x += Math.random() * .1;
            scene.children[i].rotation.y += 0.01;
            scene.children[i].position.x += 0.01;
            scene.children[i].position.y += 0.01;
            scene.children[i].scale.y += 0.01;
            // scene.children[i].scale.y = bar_height + 1;
            // console.log('1')

        } else if (scene.children[i].name === "Cube" && scene.children[i].id % 2 === 1) {

            scene.children[i].rotation.x -= Math.random() * .1;
            scene.children[i].rotation.y -= 0.01;
            scene.children[i].position.x -= 0.01;
            scene.children[i].position.y += 0.01;
            scene.children[i].scale.y += 0.01;
            // scene.children[i].scale.y = bar_height + 1;
            // console.log('2')

        }
    }
    
    // firstPersonRender();
    // collDetection();
    var timeAlso = performance.now() / 1000;
    controls.update( timeAlso - lastTime ); 
    // controls.update();
    renderer.render(scene, camera);
    lastTime = timeAlso;
};




$(document).ready(function() {

    render();

    window.addEventListener('resize', onWindowResize, false);

    $('#addBoxes').on('click', function() {

        var a = new cubeCreate(cubeHolder.length.toString());
        cubeHolder.push(a);
        console.log('CUBE HOLDER Length:', cubeHolder.length);

    });

    $('#removeBoxes').on('click', function() {

        cubeRemove();

    });

    setInterval(function() {
        var a = new cubeCreate(cubeHolder.length.toString());
        cubeHolder.push(a);


        if (cubeHolder.length === 100) {

            var theCube = cubeHolder[0].cube.id;
            cubeHolder.shift();

            _.each(scene.children, function(object, i) {
                if (scene.children[i].id === theCube) {
                    scene.children.splice(i, 1);
                }
            });
            console.log('A CUBE HAS BEEN REMOVED');

            // cubeRemove();
        }
    }, 2000);

});