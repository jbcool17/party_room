var scene, camera, renderer, geometry, cube, material;


scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 5;
camera.position.x = 5;

var cubeHolder = [];

geometry = new THREE.BoxGeometry( 1, 1, 1 );
material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );



var cubeRotation = false;

var cubeCreate = function(cubeName) {
	this.cubeName = cubeName;
	this.cubeRotation = true;

	this.cube = new THREE.Mesh( geometry, material );
	scene.add( this.cube );

	return this.cubeName;
}



var render = function () {
	requestAnimationFrame( render );

	for (var i = 0; i < scene.children.length; i++ ) {

		scene.children[i].rotation.x += Math.random() * .1;
		scene.children[i].rotation.y += 0.01;
		scene.children[i].position.x += 0.01;
		
	}


	

	
	// console.log(cubeHolder);
	renderer.render(scene, camera);
};


var removeBoxes = function () {
	scene.children = [];
	cubeHolder = [];
}

$(document).ready( function() {

	render();

	$('#addBoxes').on('click', function () {

		var a = new cubeCreate(cubeHolder.length.toString());
		cubeHolder.push(a);
		console.log(cubeHolder);

	});

	$('#removeBoxes').on('click', function () {

		removeBoxes();

	});

	setInterval(function() {
		var a = new cubeCreate(cubeHolder.length.toString());
		cubeHolder.push(a);
		console.log('cube has been created');

		if (cubeHolder.length === 8 ){
			cubeHolder.shift();
			scene.children.shift();

			// removeBoxes();
		}
	}, 3000);

});

