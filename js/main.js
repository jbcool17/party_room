var scene, camera, renderer;
var cubeGeometry, cube, material;
var sphereGeometry, sphere;

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 15;
camera.position.x = 0.5;
camera.position.y = .1;

var controls = new THREE.OrbitControls(camera, renderer.domElement);

var light = new THREE.AmbientLight( 0x1111 ); // soft white light
scene.add( light );

var spotLight = new THREE.SpotLight( 0xffffff );
spotLight.position.set( 1, 20, 10 );
spotLight.castShadow = true;
spotLight.shadowCameraNear = 8;
spotLight.shadowCameraFar = 30;
spotLight.shadowMapWidth = 1024;
spotLight.shadowMapHeight = 1024;
spotLight.angle = 1;
spotLight.exponent = 5;
spotLight.shadowDarkness = 1;
spotLight.name = 'SpotLight';
scene.add( spotLight );


var pointLightOne = new THREE.PointLight( 0xff0000 );
pointLightOne.position.set( 1, 1, 10);
scene.add( pointLightOne );

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.BasicShadowMap;
renderer.setClearColor(0x000000, 1);



//RESIZER
var onWindowResize = function( event ) {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

//OBJECTS
	//Materials
phongMaterial = new THREE.MeshPhongMaterial({ color: 0x156289, emissive: 0x072534 });
material = new THREE.MeshBasicMaterial( { name: 'green-wire', color: 0x00ff00, wireframe: true } );
var planeMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, 
												emissive: 0x072534,
												shininess: 100, 
												side: THREE.DoubleSide, 
												shading: THREE.SmoothShading} );

var planeGeometry = new THREE.PlaneGeometry( 100, 100, 1 );
var ground = new THREE.Mesh( planeGeometry, planeMaterial );
ground.rotation.x = 1.57;
ground.position.y = -2;
ground.scale.x = 100;
ground.scale.y = 100;
ground.castShadow = false;
ground.receiveShadow = true;
ground.name = 'Ground'

var wallOne = new THREE.Mesh( planeGeometry, planeMaterial);
wallOne.castShadow = false;
wallOne.receiveShadow = true;
wallOne.position.z = -10;
wallOne.scale.x = 100;
var wallTwo = new THREE.Mesh( planeGeometry, planeMaterial);
wallTwo.castShadow = false;
wallTwo.receiveShadow = true;
wallTwo.position.z = 100;
wallTwo.scale.x = 100;
scene.add( ground );


cubeGeometry = new THREE.BoxGeometry( 1, 1, 1 );
sphereGeometry = new THREE.SphereGeometry( 1, 5, 5 );

sphere = new THREE.Mesh( sphereGeometry, phongMaterial );

var cubeHolder = []; 					//holds some cube info
var cubeCreate = function(cubeName) {
	this.cubeName = cubeName;
	this.cubeRotation = true;

	this.cube = new THREE.Mesh( cubeGeometry, material );
	this.cube.castShadow = true;
	this.cube.name = 'Cube'    
    
	scene.add( this.cube );
	
	return this.cubeName;
}

var cubeCreateTwo = function(cubeName) {
	this.cubeName = cubeName;
	this.cubeRotation = true;

	this.cube = new THREE.Mesh( cubeGeometry, material );
	this.cube.castShadow = true;
	this.cube.name = 'CubeTwo'
	scene.add( this.cube );
	
	return this.cubeName;
}

var cubeRemove = function () {
	//removes all cubes - or at least trys to.

	for (var i = 0; i < scene.children.length; i++) {

		for (var j = 0; j < cubeHolder.length; j++) {
			if ( scene.children[i].id === cubeHolder[j].cube.id) {
				scene.children.splice(i, 1);
				cubeHolder.splice(j, 1);	
			}
		
		}

	}

	
}


var h;
//RENDER & ANIMATE SCENE
var render = function () {
	requestAnimationFrame( render );
	var time = Date.now() * 0.00005;
    // particleSystem.rotation.y += 0.01;
    h = ( 360 * ( 1.0 + time ) % 360 ) / 360;
    material.color.setHSL( h, 0.5, 0.5 );
    pointLightOne.color.setHSL( h, 0.5, 0.5 );

	
    
    bar_height = -(Math.random() * 10 / 2);

	for (var i = 0; i < scene.children.length; i++ ) {

		if (scene.children[i].name === "Cube" && scene.children[i].id % 2 === 0) {

			scene.children[i].rotation.x += Math.random() * .1;
			scene.children[i].rotation.y += 0.01;
			scene.children[i].position.x += 0.01;
			scene.children[i].position.y += 0.01;
			scene.children[i].scale.y += 0.01;
			// scene.children[i].scale.y = bar_height + 1;
			// console.log('1')

		} else if(scene.children[i].name === "Cube" && scene.children[i].id % 2 === 1) {

			scene.children[i].rotation.x -= Math.random() * .1;
			scene.children[i].rotation.y -= 0.01;
			scene.children[i].position.x -= 0.01;
			scene.children[i].position.y += 0.01;
			scene.children[i].scale.y += 0.01;
			// scene.children[i].scale.y = bar_height + 1;
			// console.log('2')

		}
	}
	controls.update();
	renderer.render(scene, camera);
};

$(document).ready( function() {

	render();
	
	window.addEventListener( 'resize', onWindowResize, false );

	$('#addBoxes').on('click', function () {

		var a = new cubeCreate(cubeHolder.length.toString());
		cubeHolder.push(a);
		console.log('CUBE HOLDER Length:', cubeHolder.length);

	});

	$('#removeBoxes').on('click', function () {

		cubeRemove();

	});

	setInterval(function() {
		var a = new cubeCreate(cubeHolder.length.toString());
		cubeHolder.push(a);
		

		if (cubeHolder.length === 100 ){

			var theCube = cubeHolder[0].cube.id;
			cubeHolder.shift();

			_.each(scene.children, function(object, i) {
				if (scene.children[i].id === theCube ) {
					scene.children.splice(i, 1);
				}
			});
			console.log('A CUBE HAS BEEN REMOVED');

			// cubeRemove();
		}
	}, 2000);
	
	$('body').on('keypress', function(e){
		console.log(e.keyCode);

		//UP
		if ( e.keyCode === 119) {
			camera.position.y += 1;
		}

		//DOWN
		if ( e.keyCode === 115) {
			camera.position.y -= 1;
		}

		//LEFT
		if ( e.keyCode === 97) {
			camera.position.x -= 1;
		}
		//RIGHT
		if ( e.keyCode === 100) {
			camera.position.x += 1;
		}

	});

});

