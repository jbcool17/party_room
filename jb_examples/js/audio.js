var scene, camera, renderer;
var cubeGeometry, cube, material;
var sphereGeometry, sphere;
var clock = new THREE.Clock();

scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

camera.position.z = 0;
camera.position.y = 0;
camera.position.x = -130;

var light = new THREE.PointLight(0xffffff);
light.position.set(-100, 200, 100);
scene.add(light);




//OBJECTS
cubeGeometry = new THREE.BoxGeometry( 5, 1, 10 );
material = new THREE.MeshBasicMaterial( { name: 'green-wire', color: 0x00ff00, wireframe: true } );
shinyMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00, specular: 0x666666, emissive: 0xff0000, shininess: 1, shading: THREE.SmoothShading, opacity: 0.9, transparent: true });



for( var i = 0; i < 100; i++ ) {
    var a = scene.children.length
    var b = scene.children[a-1].position.x

    cube = new THREE.Mesh( cubeGeometry, shinyMaterial );
    

    cube.position.x = b + 10 ;
    
    

    scene.add( cube );

}




var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.autoRotateSpeed = 10;

//RENDER & ANIMATE SCENE
var render = function () {

    requestAnimationFrame( render );
    renderer.render(scene, camera);

    // cube.scale.y += 0.001;
    controls.update();

};


// Create a new instance of an audio object and adjust some of its properties
var audio = new Audio();
audio.src = 'assets/audio/052406.mp3';
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
    for (var i = 0; i < bars; i++) {
        bar_x = i * 3;
        bar_width = 2;
        bar_height = -(fbc_array[i] / 2);
        scene.children[i].scale.y = bar_height + 1;
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
// frameLooper() animates any style of graphics you wish to the audio frequency
// Looping at the default frame rate that the browser provides(approx. 60 FPS)


$(document).ready(function() {
    render();
    initMp3Player();
    $('#start').on('click', function () {
        
    });

    $('#stop').on('click', function () {
        oscillator.stop();
    });

    $('body').on('click', function() {
        // cube.scale.y += 0.01;
    });

});


