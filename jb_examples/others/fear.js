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
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);

camera.position.x = 300;
camera.position.y = -100;
camera.position.z = 330;

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

renderer.setClearColor(0xF39C12, 1);

document.body.appendChild(renderer.domElement);

controls = new THREE.OrbitControls( camera, renderer.domElement );
//++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++
//LIGHTS

var ambient = new THREE.AmbientLight( 0xffffff );
        scene.add( ambient );

var pointLight = new THREE.PointLight( 0xffffff, 2 );
        scene.add( pointLight );

//++++++++++++++++++++++++++++++++++++++ 
//++++++++++++++++++++++++++++++++++++++ 
var path = "pisa/";
        var format = '.jpg';
        var urls = [
          path + 'px' + format, path + 'nx' + format,
          path + 'py' + format, path + 'ny' + format,
          path + 'pz' + format, path + 'nz' + format
        ];

        var textureCube = THREE.ImageUtils.loadTextureCube( urls );
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

//++++++++++++++++++++++++++++++++++++++ 
// var material  = new THREE.MeshPhongMaterial( { color: 0x111111, opacity: 0.5, wireframe: true });
var sphereHold = [];
var Z = 0;
for (var k = 0; k < 10; k++ ){
  var Y = 0;
  for (var i = 0; i < 10; i++ ) {
    var X = 0;
    for (var j = 0; j < 10; j++ ) {
      sphereGeometry = new THREE.SphereGeometry( 100, 32, 16 );
      // sphereGeometry = new THREE.SphereGeometry( 5 );
      mesh = new THREE.Mesh( sphereGeometry, material);
      mesh.position.x = X
      mesh.position.y = Y
      mesh.position.z = Z;
      mesh.scale.x = .1
      mesh.scale.y = .1
      mesh.scale.z = .1
      scene.add(mesh);
      sphereHold.push(mesh);
      X +=40; 
    }
    Y += 20;
  }
  Z += 40
}

var sphereHoldAudio = [];
var Z = 0;
for (var i = 0; i < 10; i++ ) {
    var X = 0;
    for (var j = 0; j < 10; j ++ ) {
      sphereGeometry = new THREE.SphereGeometry( 100, 32, 16 );
      // sphereGeometry = new THREE.SphereGeometry( 5 );
      mesh = new THREE.Mesh( sphereGeometry, material);
      mesh.position.x = X + 400;
      mesh.position.z = Z;
      mesh.scale.x = .1
      mesh.scale.y = .1
      mesh.scale.z = .1
      scene.add(mesh);
      sphereHoldAudio.push(mesh);
      X +=20; 
    }
    Z += 20;
  }



//
//RENDER
//

var render = function() {

    requestAnimationFrame(render);

    var time = Date.now() * 0.00005;
    h = (360 * (1.0 + time) % 360) / 360;

    for (var i = 0; i < sphereHold.length; i++ ) {
      sphereHold[i].rotation.x += 0.01;
      
    }

    material.color.setHSL(h, 0.5, 0.5);
    pointLight.color.setHSL(h, 0.5, 0.5);

    controls.update();
    
    renderer.render(scene, camera);
    
};

// Create a new instance of an audio object and adjust some of its properties
var audio = new Audio();
audio.src = '052406.mp3';
audio.controls = true;
audio.loop = true;
audio.autoplay = true;

// Establish all variables that your Analyser will use
var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

// Initialize the MP3 player after the page loads all of its HTML into the window
window.addEventListener("load", initMp3Player, false);
var frameLooper = function (){
    window.requestAnimationFrame(frameLooper);
    fbc_array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.fillStyle = '#00CCFF'; // Color of the bars
    

    bars = 100;
    
    for (var i = 0; i < sphereHoldAudio.length; i++) {
        bar_x = i * 3;
        // bar_width = Math.random() * fbc_array[i] / 2;
        bar_height = -fbc_array[i] / 2;
        sphereHoldAudio[i].position.y = -1 * (bar_height + 1);
        // sphereHold[i].position.x = bar_width * 10;

        
    // particleSystem.rotation.y += 0.01;
        
        // scene.children[0].scale.x = bar_width * Math.random();
        //  fillRect( x, y, width, height ) // Explanation of the parameters below
        ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
    }
}
var initMp3Player = function (){
    document.getElementById('audio_box').appendChild(audio);
    context = new AudioContext(); // AudioContext object instance
    analyser = context.createAnalyser(); // AnalyserNode method
    canvas = document.getElementById('analyser_render');
    ctx = canvas.getContext('2d');
    // Re-route audio playback into the processing graph of the AudioContext
    source = context.createMediaElementSource(audio); 
    source.connect(analyser);
    analyser.connect(context.destination);
    frameLooper();
}

$(document).ready(function() {

  render();
  initMp3Player();


});
