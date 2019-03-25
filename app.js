
function init(){
	//Width and Height
	var width  = window.innerWidth,
		height = window.innerHeight;

	//Earth Paramenters
	var radius   = 0.5,
		segments = 32,
		rotation = 6;  

	var scene = new THREE.Scene(); //Scene
	var gui = new dat.GUI();// Initializing Dat connection
	var camera = new THREE.PerspectiveCamera(45,
					window.innerWidth / window.innerHeight, 0.01, 1000); //Camera
	
	camera.position.z = 1.5; //Camera Position
	//Controls Intitialization
	
	
	//3##################333 
	/*
	var loader = new THREE.FontLoader();
loader.load( 'font/helvetiker_regular.typeface.json', function ( font ) {

  var textGeometry = new THREE.TextGeometry( "Africa", {

    font: font,

    size: 0.2,
    height: 0.11,
    curveSegments: 12,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelEnabled: true

  });

  var textMaterial = new THREE.MeshPhongMaterial( 
    { color: 0xff0000, specular: 0xffffff }
  );

  var mesh = new THREE.Mesh( textGeometry, textMaterial );

  scene.add( mesh );

}); 
	*/
	//---------------------
	
	//Renderer initializating
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(width, height);
	document.getElementById('webgl').appendChild(renderer.domElement);
	
	//Creating and attaching Ambient Light
	var ambientLight = new THREE.AmbientLight(0x333333);
	
	//Creating Light Diractional Light
//	var dirLight = new THREE.DirectionalLight(0xffffff , 1);
	ambientLight.position.z = 5;
	ambientLight.intensity = 6;
	renderer.setPixelRatio(window.devicePixelRatio);

	var sLLight = new THREE.SpotLight(0x333333, 1);
	var sRLight = new THREE.SpotLight(0x333333, 1);

	//VR Stereo Effect
	/*renderer.vr.enabled = true;
	renderer.animate(animate);
	WEBVR.getVRDisplay(function (device){
	renderer.vr.setDevice(device);
	document.body.appendChild(WEBVR.createButton(renderer));

	});*/

	
	
/*	
	gui.add(dirLight.position, 'x', 1 , 50);
	gui.add(dirLight.position, 'y', 1 , 50);
	gui.add(dirLight.position, 'z', 1 , 50);
	gui.add(dirLight, 'intensity', 1 , 50);
	*/
	
//	sLLight.position.x = -5;
	sLLight.position.y = 2;
//	sLLight.position.z = -4;
	
//	sRLight.position.x = 5;
	sRLight.position.y = 2;
//	sRLight.position.z = -4;
	var LeftLight = gui.addFolder('sLLight');
	LeftLight.add(sLLight.position, 'x' ,-10,50);
	LeftLight.add(sLLight.position, 'y' ,1,50);
	LeftLight.add(sLLight.position, 'z' ,-10,50);
	LeftLight.add(sLLight , 'intensity' , 1, 10);

	
	var RightLight = gui.addFolder('sRLight');
	RightLight.add(sRLight.position, 'x' , -20, 50);
	RightLight.add(sRLight.position, 'y' , -20, 50);
	RightLight.add(sRLight.position, 'z' , -20, 50);
	RightLight.add(sRLight , 'intensity' , 1, 10);
	
    var sphere = createSphere(radius, segments);
	sphere.rotation.y = rotation; 
//	sphere.bumpMap = 
	
	scene.add(ambientLight);

	scene.add(camera);
//	scene.add(sLight);
	scene.add(sphere);
	camera.add(sLLight);
	camera.add(sRLight);
   /* var clouds = createClouds(radius, segments);
	clouds.rotation.y = rotation;
	scene.add(clouds)
*/
	//VR Code
	
	
	var stars = createStars(90, 64);
	scene.add(stars);

	var orbitCon = new THREE.OrbitControls( camera, renderer.domElement );
	orbitCon.minPolarAngle = 0;
	orbitCon.maxPolarAngle = Math.PI;
		orbitCon.minAzimuthAngle = -Infinity;
		orbitCon.maxAzimuthAngle = Infinity;
		
//	dirLight.position.copy(controls);
    THREE.ImageUtils.crossOrigin = '';  

	//Function to create a curvers

// smooth my curve over this many points
//################################################

/*################################################
	var paths = [
    [
      37.77397, 
      -122.43129, 
      22.54554,
      114.0683
    ],
    [
      47.77397, 
      -110.43129, 
      22.54554,
      114.0683
    ]
  ];
	*/
	
function creatCurve(strt , middle , end){
	var curve = new THREE.QuadraticBezierCurve3(
	new THREE.Vector3(strt,0, 0),
	new THREE.Vector3(strt,middle,middle),
	new THREE.Vector3(0,0,end)
	
);

var points = curve.getPoints( 50 );
var geometry = new THREE.BufferGeometry().setFromPoints( points );

var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

// Create the final object to add to the scene
var ellipse = new THREE.Line( geometry, material );
return scene.add(ellipse);
	
}
/* Sample Curves
	var c1 = creatCurve(0.5,0.5,0.5);
	var c2 = creatCurve(0.5,0.7,-0.1);
	var c3 = creatCurve(0.5,0.7,-0.55);
	var c6 = creatCurve(0.5,0.7,-0.6);
	var cs = creatCurve(0.5,0.7,-0.7);
	var c3d = creatCurve(0.5,0.7,-0.85);
	//var c4 = creatCurve(0.5,0.7,1);
	
	
//	var c3 = creatCurve(0,0.50,0.5);
	*/

	animate();

	function animate() {
		orbitCon.update();

		sphere.rotation.y += 0.0010;
	//	clouds.rotation.y += 0.0005;		
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}

	
}


//	function createSphere(radius, segments) {
//		var geo = new THREE.SphereGeometry(radius, segments, segments); 
//			var material = 	new THREE.MeshPhongMaterial({
//				map: new THREE.ImageUtils.loadTexture('images/earth_lights.jpg')});
//			var mesh = new THREE.Mesh(geo , material);
//		
//				var bump = new THREE.loadTexture();
//		bump.bumpMap = bump.loader('images/nightEarth.jpg');
//				//bumpScale:   0.001;
//		
//		return mesh;
//	}




		function createSphere(radius, segments) {
		var geo = new THREE.SphereGeometry(radius, segments, segments); 
			var material = 	new THREE.MeshPhongMaterial();
			var loader = new THREE.TextureLoader();
			material.map = loader.load('earth_lights.jpg');
			material.bumpMap = loader.load('earth_lights.jpg');
		//	material.roughnessMap = loader.load('/images/earth_lights.jpg');
			material.bumpScale = 0.5;
	//		material.metalness = 0.1;
		//	material.sharpness = 15;
			
			var mesh = new THREE.Mesh(geo , material);
		
	//			var bump = new THREE.loadTexture();
	//	bump.bumpMap = bump.loader('images/nightEarth.jpg');
				//bumpScale:   0.001;
		   console.log(geo.vertices.length);

		return mesh;
	}


	function createStars(radius, segments) {
		var geo = 	new THREE.SphereGeometry(radius, segments, segments);
		var material = new THREE.MeshBasicMaterial();
		var loader = new THREE.TextureLoader();
		material.map = loader.load('galaxy_starfield.png');
		material.bumpMAp = loader.load('galaxy_starfield.png');
		material.side = THREE.DoubleSide;
		var mesh = new THREE.Mesh(geo, material);
	return mesh;
	}



init();