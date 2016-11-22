var container, stats;
			var camera, scene, projector, renderer;
			var mesh, mixer;

			init();
			animate();

			function init() {

				container = document.createElement( 'div' );
				document.body.appendChild( container );

				var info = document.createElement( 'div' );
				info.style.position = 'absolute';
				info.style.top = '20%';
				info.style.left = '12%';
				info.style.width = '100%';
				info.style.textAlign = 'left';
				info.innerHTML = '+ empty points +<br /><br /><br />cependant, quand il est appelé<br />après que la page a chargé<br />(dans setInterval)   <br /><br /><a href="http://fatblubber.com">home</a><br /><br /><a href="http://fatblubber.com/about">abt</a><br /><br /><a href="http://fatblubber.com/experiments">exp</a><br /><br />theme: sapphire<br /><br /><br />+';

				container.appendChild( info );

				//

				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.y = 2111;
				camera.target = new THREE.Vector3( 600, -190, 0 );

				scene = new THREE.Scene();

				//

				var ambient = new THREE.AmbientLight( 0x999999 );
				scene.add( ambient );

				var directionalLight = new THREE.DirectionalLight( 0x5977ff );
				directionalLight.position.set( 3, 1, -1 ).normalize();
				scene.add( directionalLight );

				var directionalLight = new THREE.DirectionalLight( 0xff7cae );
				//var directionalLight = new THREE.DirectionalLight( 0xff0033 );
				directionalLight.position.set( -4, 1, -1 ).normalize();
				scene.add( directionalLight );

				var randomnumber = Math.floor(Math.random() * (4 - 1 + 1)) + 1;

				var texture = THREE.ImageUtils.loadTexture( 'models/animated/' + randomnumber + '.png');
				  var loader = new THREE.TextureLoader();
				  // URL of texture
				  loader.load("models/animated/1.png", function(texture){
				    var material = new THREE.MeshLambertMaterial({map: texture});
				    mesh = new THREE.Mesh(geometry, material);
				    scene.add(mesh);
				  });

				var loader = new THREE.JSONLoader();
				loader.load( "models/animated/2.json", function ( geometry ) {


					var material = new THREE.MeshPhongMaterial( {
						map: texture,
						vertexColors: THREE.FaceColors,
						specular: 0x050505,
    					shininess: 100,
						morphTargets: true,
						overdraw: 0.5
					} );

					mesh = new THREE.Mesh( geometry, material );
					mesh.scale.set( 1000, 1000, 1000 );
					mesh.rotation.set(-100,100,-75);
					mesh.position.set(0,280,0);
					scene.add( mesh );

					mixer = new THREE.AnimationMixer( mesh );

					var clip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'gallop', geometry.morphTargets, 30 );
					mixer.clipAction( clip ).setDuration( 48 ).play();

				} );

				//
				renderer = new THREE.WebGLRenderer({ antialias: true });
				//renderer = new THREE.CanvasRenderer({antialias: true});
				renderer.setClearColor( 0xd0c1ff );
				//renderer.setClearColor( 0xe7e0ff );
				//renderer.setClearColor( 0xbfc4ff );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild(renderer.domElement);

				//

				stats = new Stats();
				container.appendChild( stats.dom );

				//

				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {
				setTimeout( function() {
				requestAnimationFrame( animate );
			}, 1000 / 60 );
				render();
				stats.update();

			}

			var radius = 600;
			var theta = 0;

			var prevTime = Date.now();

			

			function render() {

				theta += 0.1;

				//camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				//camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
				camera.position.z = 2255;
				

				camera.lookAt( camera.target );

				if ( mixer ) {

					var time = Date.now();

					mixer.update( ( time - prevTime ) * 0.001 );

					prevTime = time;

				}

				renderer.render( scene, camera );

			}