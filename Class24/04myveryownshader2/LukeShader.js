
LukeShader = {

	// these are parameters like knobs on effects pedals:
	uniforms: {

		"tDiffuse": { type: "t", value: null },
		"scale":    { type: "f", value: 1.0 }


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
		"uniform float scale;",

		// THESE ARE HARD-WIRED WORDS:
		//
		// this is the texture overall:
		"uniform sampler2D tDiffuse;",
		// this is the current x,y (or s/t, or u/v) pixel we're working with:
		"varying vec2 vUv;",
		// end hard-wired words

		"void main() {",
			// these are the 9 coordinates of the current pixel and its neighbors:
			// top row:
			"vec2 tc0 = vUv + vec2(-1., -1.)*scale;",
			"vec2 tc1 = vUv+ vec2(0.0, -1.)*scale;",
			"vec2 tc2 = vUv + vec2(+1., -1.)*scale;",
			// left hand:
			"vec2 tc3 = vUv + vec2(-1., 0.0)*scale;",
			// CENTER:
			"vec2 tc4 = vUv + vec2(0.0, 0.0)*scale;",
			// right hand:
			"vec2 tc5 = vUv + vec2(+1., 0.0)*scale;",
			// bottom row:
			"vec2 tc6 = vUv + vec2(-1., +1.)*scale;",
			"vec2 tc7 = vUv + vec2(0.0, +1.)*scale;",
			"vec2 tc8 = vUv + vec2(+1., +1.)*scale;",

			// get their colors and average them:
			"vec4 col0 = texture2D(tDiffuse, tc0);",
			"vec4 col1 = texture2D(tDiffuse, tc1);",
			"vec4 col2 = texture2D(tDiffuse, tc2);",
			"vec4 col3 = texture2D(tDiffuse, tc3);",
			"vec4 col4 = texture2D(tDiffuse, tc4);",
			"vec4 col5 = texture2D(tDiffuse, tc5);",
			"vec4 col6 = texture2D(tDiffuse, tc6);",
			"vec4 col7 = texture2D(tDiffuse, tc7);",
			"vec4 col8 = texture2D(tDiffuse, tc8);",
			// make a sum and average:
			"vec4 sum = (1.0 * col0 + 2.0 * col1 + 1.0 * col2 +  2.0 * col3 + 4.0 * col4 + 2.0 * col5 + 1.0 * col6 + 2.0 * col7 + 1.0 * col8) / 16.0;", 
  			// MOST IMPORTANT LINE IN THE WHOLE THING:          
  			"gl_FragColor = vec4(sum.rgb, 1.0);",
		"}"

	].join( "\n" )

};
