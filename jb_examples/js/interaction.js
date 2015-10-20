var scene, camera, renderer, controls;
var cubeGeometry, cube, cubeMaterial, raycaster;
var radius = 10, theta = 0;
var mouse = new THREE.Vector2(), INTERSECTED;

//Create Scene
scene = new THREE.Scene();

//Create and Set Camera
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = 60;
camera.position.y = 50;
camera.position.z = 60;


// LIGHTS
var light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );
var spotLight = new THREE.SpotLight( 0xaaaaaa );
spotLight.position.set( 60, 100, 60 );
spotLight.name = 'SpotLight';
scene.add( spotLight );

scene.fog = new THREE.FogExp2( 0x000000, 0.001 );

//Set up Renderer
renderer = new THREE.WebGLRenderer();
	//canvas size
renderer.setSize( window.innerWidth, window.innerHeight );
	//bg color
renderer.setClearColor( 0x111111 );
renderer.setPixelRatio( window.devicePixelRatio );

document.body.appendChild( renderer. domElement );
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

// resize window - insert into doc.ready 
// - window.addEventListener( 'resize', onWindowResize, false );
var onWindowResize = function ( event ) {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}


//Set up orbit controls
controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.autoRotate = true;
 //   _____  _____ ______ _   _ ______ 
 //  / ____|/ ____|  ____| \ | |  ____|
 // | (___ | |    | |__  |  \| | |__   
 //  \___ \| |    |  __| | . ` |  __|  
 //  ____) | |____| |____| |\  | |____ 
 // |_____/ \_____|______|_| \_|______|
                                    
 //  ______ _      ______ __  __ ______ _   _ _______ _____ 
 // |  ____| |    |  ____|  \/  |  ____| \ | |__   __/ ____|
 // | |__  | |    | |__  | \  / | |__  |  \| |  | | | (___  
 // |  __| | |    |  __| | |\/| |  __| | . ` |  | |  \___ \ 
 // | |____| |____| |____| |  | | |____| |\  |  | |  ____) |
 // |______|______|______|_|  |_|______|_| \_|  |_| |_____/ 


//CUBE
cubeGeometry = new THREE.BoxGeometry( 2, 2, 2);


cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
// scene.add( cube );
for ( var i = 0; i < 100; i ++ ) {


	var randomColor = '0x' + Math.floor(Math.random()*16777215).toString(16) ;
	cubeMaterial = new THREE.MeshBasicMaterial( { name: 'material', color: 0xaaaaff } );
	var phong = new THREE.MeshPhongMaterial( {  specular: 0x111111, emissive: 0x040404, shininess: 100, shading: THREE.SmoothShading, opacity: 0.9, transparent: true });
	var object = new THREE.Mesh( cubeGeometry, phong );

	
	object.material.color.setHex(randomColor);

	object.position.x = Math.random() * 500 - 250;
	object.position.y = Math.random() * 500 - 250;
	object.position.z = Math.random() * 500 - 250;

	

	object.rotation.x = Math.random() * 2 * Math.PI;
	object.rotation.y = Math.random() * 2 * Math.PI;
	object.rotation.z = Math.random() * 2 * Math.PI;

	object.scale.x = Math.random() + 10;
	object.scale.y = Math.random() + 10;
	object.scale.z = Math.random() + 10;

	object.name = 'CUBE';

	scene.add( object );

}







//RAYCASTER
raycaster = new THREE.Raycaster();

//RENDER & ANIMATE SCENE
function onDocumentMouseMove( event ) {

				event.preventDefault();

				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
				mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			}


var render = function () {
	requestAnimationFrame( render );
	TWEEN.update();

	// cube.rotation.x += 0.01;

	theta += 0.1;

	// camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
	// camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
	// camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
	// camera.lookAt( scene.position );

	// camera.updateMatrixWorld();

	var children = scene.children;
	var target = { x : Math.random() * 400, y: Math.random() * 400 };
	for ( var i = 0; i < children.length; i++ ) {
		if (children[i].name === 'CUBE' && children[i].id % 2 === 0  ) {
			
			children[i].rotation.x += Math.random() * 0.01;

			// children[i].material.color.setHex(randomColor);
		} else if ( children[i].name === 'CUBE' && children[i].id % 2 === 0  ) {
			children[i].rotation.y += Math.random() * 0.1;
			children[i].rotation.x += Math.random() * 0.01;
		}
	}


	// find intersections

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( scene.children );

	if (intersects.length > 0) {


        if (INTERSECTED != intersects[0].object) {

            if (INTERSECTED){
                material = INTERSECTED.material;
                if(material.emissive){
                    material.emissive.setHex(INTERSECTED.currentHex);
                }
                else{
                    material.color.setHex(INTERSECTED.currentHex);
                }
            }   
            INTERSECTED = intersects[0].object;
            material = INTERSECTED.material;
            if(material.emissive){
                INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
                material.emissive.setHex(0xff0000);
            }
            else{
                INTERSECTED.currentHex = material.color.getHex();
                material.color.setHex(0xff0000);
            }

            //touched object
            // INTERSECTED.position.x += 10;
            new TWEEN.Tween( intersects[ 0 ].object.position ).to( {
						x: Math.random() * 800 - 400,
						y: Math.random() * 800 - 400,
						z: Math.random() * 800 - 400 }, 4000 )
					.easing( TWEEN.Easing.Elastic.Out).start();

					new TWEEN.Tween( intersects[ 0 ].object.rotation ).to( {
						x: Math.random() * 2 * Math.PI,
						y: Math.random() * 2 * Math.PI,
						z: Math.random() * 2 * Math.PI }, 2000 )
					.easing( TWEEN.Easing.Elastic.Out).start();
            // console.log(INTERSECTED);
        }

    } else {

        if (INTERSECTED){
            material = INTERSECTED.material;

            if(material.emissive){
                material.emissive.setHex(INTERSECTED.currentHex);
            }
            else
            {
                material.color.setHex(INTERSECTED.currentHex);
            }
        }

        INTERSECTED = null;

    }


	controls.update();
	renderer.render(scene, camera);
}

$(document).ready( function () {

	window.addEventListener( 'resize', onWindowResize, false );

	render();
	console.log('loaded.');
});
