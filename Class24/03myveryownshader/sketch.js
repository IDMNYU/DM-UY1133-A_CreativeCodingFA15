var container; // this represents the canvas

var renderer; // this represent the world / renderer
var camera; // this is a viewport
var scene; // this is a list of things to render
var object, light; // an object and a light

// THIS THING IS IN CHARGE OF THE SHADERS:
var composer; 
var effect; // this is the shader we're adding

var showmesh = false;
var geometry_size = 4;

init(); // kick off everything (equiv to setup())
animate(); // start animating (equivish to draw())

function init() {
  setupCamera(); // get the camera happening
  setupRenderer(); // the main renderer
  makeScene(); // lights, textures, materials, objects
  addToWebPage(renderer); // add the WebGL to the web page

	window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener('keypress', onDocumentKeyPressed, false); 
  document.addEventListener('mousemove', onDocumentMouseMove, false); 


}

// THE ANIMATE FUNCTION GETS THE RENDERER MOVING:
function animate() {
  // hey, web browser, when you reload a new frame:
	requestAnimationFrame( animate );

  // run the renderer:
	render();

}

// THE RENDER() FUNCTION ACTUALLY DOES THE DRAWING
// FRAME BY FRAME... EQUIV TO DRAW() IN P5:
function render() {


  // rotation fuckin' everybody:
  object.rotation.x += 0.005;
	object.rotation.y += 0.01;

	//renderer.render( scene, camera );
	
	composer.render();
	
}

function setupCamera()
{
  // camera stuff:
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 400;
}

function setupRenderer()
{
  // initialize the render:
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function makeScene()
{
  // set up the scene graph:
	scene = new THREE.Scene();

  scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x000000, 1, 1000 );
	
	object = new THREE.Object3D();
	scene.add( object );

	var geometry = new THREE.SphereGeometry( 1, geometry_size, geometry_size );
  var material = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading, wireframe: showmesh } );

	for ( var i = 0; i < 100; i ++ ) {

		var mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
		mesh.position.multiplyScalar( Math.random() * 400 );
		mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
		mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 50;
		object.add( mesh );

	}

	scene.add( new THREE.AmbientLight( 0x222222 ) );

	light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( 1, 1, 1 );
	scene.add( light );

  // postprocessing

	composer = new THREE.EffectComposer( renderer );
	composer.addPass( new THREE.RenderPass( scene, camera ) );

 	effect = new THREE.ShaderPass( LukeShader );
 	effect.uniforms[ 'foo' ].value = 1;
 	effect.renderToScreen = true;
 	composer.addPass( effect );

	//


}

// STUFF BELOW HERE YOU DON'T CHANGE OFTEN:

// this resets the camera and renderer 
// when you resize the window:
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

// add to web page:
function addToWebPage(_r)
{
  // makes the html container for the canvas:
	container = document.createElement( 'div' );
	document.body.appendChild( container );
  // add the renderer as a webGL canvas to the webpage:
	container.appendChild( _r.domElement );

}

function onDocumentMouseDown()
{
  showmesh = !showmesh;
  for(var i = 0;i<object.children.length;i++)
  {
    var tmp = object.children[i]; // pass by reference
    tmp.material.wireframe = showmesh;
  }
}

function onDocumentKeyPressed(event)
{
  var keyCode = event.which; 
  if(keyCode==43) geometry_size++;
  else if(keyCode==45) geometry_size--;
  if(geometry_size<2) geometry_size=2;

  for(var i = 0;i<object.children.length;i++)
  {
    var tmp = object.children[i]; // pass by reference
    tmp.geometry = new THREE.SphereGeometry( 1, geometry_size, geometry_size );
  }
  
}

function onDocumentMouseMove( event ) {
  var mx = event.x / window.innerWidth;
  var my = event.y / window.innerHeight;
 	effect.uniforms[ 'foo' ].value = 1.0-my;
}

