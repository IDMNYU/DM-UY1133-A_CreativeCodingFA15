var container; // this represents the canvas

var renderer; // this represent the world / renderer
var camera; // this is a viewport
var scene; // this is a list of things to render

init(); // kick off everything (equiv to setup())
animate(); // start animating (equivish to draw())

function init() {

  // makes the container for the canvas:
	container = document.createElement( 'div' );
	document.body.appendChild( container );

  // camera stuff:
  var fieldofview = 45;
  var aspectratio = window.innerWidth / window.innerHeight;
  var near_clip = 1;
  var far_clip = 2000;
  // set up the camera based on the stuff above:
	camera = new THREE.PerspectiveCamera( fieldofview, aspectratio, near_clip, far_clip );
  // camera lookat and position:
  camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 800;
	camera.lookAt( 0, 0, 0 );



  // set up the scene graph:
	scene = new THREE.Scene();

  // placeholder variables for a single light and an object:
	var light, object;

  // ambient light goes EVERYWHERE.  the result is 
  // to multiply every color in the scene with the ambient
  // light color:
  light = new THREE.AmbientLight( 0xfffff );
	scene.add( light );

  // direction light shines on one spot:
	light = new THREE.DirectionalLight( 0xff0000 );
	light.position.set( 0, 1, 0 );
	scene.add( light );

  // texture consists of an image, an image mapping scheme, and a resolution:
  // load a picture:
	thetexture = THREE.ImageUtils.loadTexture( './data/UV_Grid_Sm.jpg' );
  // tell the texture to repeat:
	thetexture.wrapS = thetexture.wrapT = THREE.RepeatWrapping;
	// resolution of the texture:
	thetexture.anisotropy = 16;

  // this binds the texture to a material:
	var material = new THREE.MeshLambertMaterial( { map: thetexture, side: THREE.DoubleSide } );

	// ADD ALL THE 3D DATA AS OBJECTS TO THE SCENE:

	object = new THREE.Mesh( new THREE.SphereGeometry( 75, 20, 10 ), material );
	object.position.set( -400, 0, 200 );
	scene.add( object );

	object = new THREE.Mesh( new THREE.IcosahedronGeometry( 75, 1 ), material );
	object.position.set( -200, 0, 200 );
	scene.add( object );

	object = new THREE.Mesh( new THREE.OctahedronGeometry( 75, 2 ), material );
	object.position.set( 0, 0, 200 );
	scene.add( object );

	object = new THREE.Mesh( new THREE.TetrahedronGeometry( 75, 0 ), material );
	object.position.set( 200, 0, 200 );
	scene.add( object );

	//

	object = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100, 4, 4 ), material );
	object.position.set( -400, 0, 0 );
	scene.add( object );

	object = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 ), material );
	object.position.set( -200, 0, 0 );
	scene.add( object );

  // this is a basic circle:
  var circlesize = 100;
  var circlesegments = 20;
  // this generates the geometry:
  var circlegeometry = new THREE.CircleGeometry( circlesize, circlesegments, 0, Math.PI * 2 );
  // make a mesh out of the geometry and the material:
	object = new THREE.Mesh( circlegeometry, material );
  // give it a default position in the scene:
	object.position.set( 0, 0, 0 );
	// add it to the rendering stack:
	scene.add( object );

	object = new THREE.Mesh( new THREE.RingGeometry( 10, 50, 20, 5, 0, Math.PI * 2 ), material );
	object.position.set( 200, 0, 0 );
	scene.add( object );

	object = new THREE.Mesh( new THREE.CylinderGeometry( 25, 75, 100, 40, 5 ), material );
	object.position.set( 400, 0, 0 );
	scene.add( object );

	//

	var points = [];

	for ( var i = 0; i < 50; i ++ ) {

		points.push( new THREE.Vector3( Math.sin( i * 0.2 ) * Math.sin( i * 0.1 ) * 15 + 50, 0, ( i - 5 ) * 2 ) );

	}

	object = new THREE.Mesh( new THREE.LatheGeometry( points, 20 ), material );
	object.position.set( -400, 0, -200 );
	scene.add( object );

	object = new THREE.Mesh( new THREE.TorusGeometry( 50, 20, 20, 20 ), material );
	object.position.set( -200, 0, -200 );
	scene.add( object );

	object = new THREE.Mesh( new THREE.TorusKnotGeometry( 50, 10, 50, 20 ), material );
	object.position.set( 0, 0, -200 );
	scene.add( object );

	object = new THREE.AxisHelper( 50 );
	object.position.set( 200, 0, -200 );
	scene.add( object );

	object = new THREE.ArrowHelper( new THREE.Vector3( 0, 1, 0 ), new THREE.Vector3( 0, 0, 0 ), 50 );
	object.position.set( 400, 0, -200 );
	scene.add( object );

	//


  // THIS IS THE MAIN EVENT OF THE RENDERER:
  
  // initialize the render:
	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

  // add the renderer as a webGL canvas to the webpage:
	container.appendChild( renderer.domElement );

	//

	window.addEventListener( 'resize', onWindowResize, false );

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

	var timer = Date.now() * 0.0001;

	camera.position.x = Math.cos( timer ) * 800;
	camera.position.y = 300;
	camera.position.z = Math.sin( timer ) * 800;

	camera.lookAt( scene.position );

	for ( var i = 0, l = scene.children.length; i < l; i ++ ) {

		var object = scene.children[ i ];

		object.rotation.x = timer * 5;
		object.rotation.y = timer * 2.5;

	}

  // THIS DOES THE DRAWING:
	renderer.render( scene, camera );

}


// this resets the camera and renderer 
// when you resize the window:
function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
