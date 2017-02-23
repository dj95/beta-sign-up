var vertices;
var vertex_buffer;
var counter = 0;
var init = function() {
    var c = document.getElementById('gl');
    var gl = c.getContext('webgl');

    if (!gl) {
        return;
    }

    gl.clearColor(0.8671875, 0.8671875, 0.8671875, 1.0);

    resize(gl);

    gl.clear(gl.COLOR_BUFFER_BIT);

    vertices = [
            -0.5,0.5,
            0.0,0.5,
            -0.25,0.25,
            0.1,0.1,
            -1.0, 0.0,
            1.0, 0.0,
         ];

    for (var i=0; i < 500; i++) {
        a = Math.random() * (1.0 + 1.0) - 1.0
        vertices.push(a);
    }
    b = shuffle(vertices);
    vertices.push.apply(vertices, b);
    b = shuffle(vertices);
    vertices.push.apply(vertices, b);
    b = shuffle(vertices);
    vertices.push.apply(vertices, b);
    b = shuffle(vertices);
    vertices.push.apply(vertices, b);

    console.log(vertices.length);
    
    vertex_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertCode =
    'attribute vec2 coordinates;' +
        
    'void main(void) {' +
       ' gl_Position = vec4(coordinates, 0.0, 1.0);' +
       'gl_PointSize = 5.0;'+
    '}';
    // Create a vertex shader object
    var vertShader = gl.createShader(gl.VERTEX_SHADER);

    // Attach vertex shader source code
    gl.shaderSource(vertShader, vertCode);

    // Compile the vertex shader
    gl.compileShader(vertShader);

    // fragment shader source code
    var fragCode =
       'void main(void) {' +
          ' gl_FragColor = vec4(0.0, 0.0, 0.0, 0.03);' +
       '}';
    
    // Create fragment shader object
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    // Attach fragment shader source code
    gl.shaderSource(fragShader, fragCode);
 
    // Compile the fragmentt shader
    gl.compileShader(fragShader);

    // Create a shader program object to store
    // the combined shader program
    var shaderProgram = gl.createProgram();

    // Attach a vertex shader
    gl.attachShader(shaderProgram, vertShader); 

    // Attach a fragment shader
    gl.attachShader(shaderProgram, fragShader);

    // Link both programs
    gl.linkProgram(shaderProgram);

    // Use the combined shader program object
    gl.useProgram(shaderProgram);

    /*======== Associating shaders to buffer objects ========*/

    // Bind vertex buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

    // Get the attribute location
    var coord = gl.getAttribLocation(shaderProgram, "coordinates");

    // Point an attribute to the currently bound VBO
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

    // Enable the attribute
    gl.enableVertexAttribArray(coord);

    /*============= Drawing the primitive ===============*/


    return gl;
}

var resize = function(gl) {
    gl.canvas.width = gl.canvas.clientWidth;
    gl.canvas.height = gl.canvas.clientHeight;

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

var render = function(gl) {
    resize(gc);
    
    //gc.clear(gc.COLOR_BUFFER_BIT);

    for (var i=0; i < vertices.length; i++) {
        if (counter >= 300) {
            console.log('new value');
            for (var i=0; i < vertices.length; i++) {
                a[i] = Math.random() * (0.0005 + 0.0005) - 0.0005;
            }
            counter = 0;
        }

        vertices[i] = vertices[i] + a[i];
    }
    counter = counter + 1;

    gc.bindBuffer(gc.ARRAY_BUFFER, vertex_buffer);
    gc.bufferData(gc.ARRAY_BUFFER, new Float32Array(vertices), gc.STATIC_DRAW);
    gc.bindBuffer(gc.ARRAY_BUFFER, null);

    // Clear the canvas
    gc.clearColor(0.8671875, 0.8671875, 0.8671875, 1.0);

    // Enable the depth test
    gc.enable(gc.DEPTH_TEST);

    // Clear the color buffer bit
    //gc.clear(gc.COLOR_BUFFER_BIT);

    // Set the view port
    gc.viewport(0,0,gc.canvas.width,gc.canvas.height);

    // Draw the triangle
    gc.drawArrays(gc.POINTS, 0, vertices.length / 2);
    gc.drawArrays(gc.LINES, 0, vertices.length / 2);
    requestAnimationFrame(render);
}

/**
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

var gc = init();

var a = []
for (var i=0; i < vertices.length; i++) {
    a[i] = Math.random() * (0.0005 + 0.0005) - 0.0005;
}

requestAnimationFrame(render);
