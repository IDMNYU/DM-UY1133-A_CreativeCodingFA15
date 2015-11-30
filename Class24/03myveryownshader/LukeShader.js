
LukeShader = {

	// these are parameters like knobs on effects pedals:
	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"foo":    { type: "f", value: 1.0 }


	},

	// this outlines what the heck to do with the GEOMETRY (vertex)
	// part of the data... in our case, we don't care so we're gonna 
	// pass it through.
	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	// this is what to do with the VIDEO (fragment) data:
	fragmentShader: [
		"uniform float foo;",

		// THESE ARE HARD-WIRED WORDS:
		//
		// this is the texture overall:
		"uniform sampler2D tDiffuse;",
		// this is the current x,y (or s/t, or u/v) pixel we're working with:
		"varying vec2 vUv;",
		// end hard-wired words

		"void main() {",
			// what is the current color?:
			"vec4 color = texture2D( tDiffuse, vUv );",
			// figure out B&W average:
			"float average = ( color.r + color.g + color.b ) / 3.0;",
			// invert:
			"gl_FragColor = vec4( vec3( (1.0-average)*foo ), color.a );",
		"}"

	].join( "\n" )

};
