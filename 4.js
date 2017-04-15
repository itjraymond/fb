if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
    
        var camera, scene, renderer, mesh, geo, bgGeo, cameraParent, bg;
        var inc = 0.0;
		var cameraInc = 0.0;
		var mouseX = 0.0, mouseY = 0.0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;
		//var location = new THREE.Vector3(0,0,0);
		var ogPositions = [];
		var axis = [];
		var dirVert = [];
		var dirFace = [];
		var faceDif = [];
		
		var spheres = [], rVelY = [], vColors=[], brt = .8;
		
		var fvNames = [ 'a', 'b', 'c', 'd' ];
		
		var phase = 0.0, inc = 0.0;
		
		var canFade=false, info;
        
		var path = "assets/images/CubeMap5/";
		var format = '.png';
		var urls = [
			path + 'px' + format, path + 'nx' + format,
			path + 'py' + format, path + 'ny' + format,
			path + 'pz' + format, path + 'nz' + format
		];
		
		var reflectionCube;
					
        init();
        animate();
        
        function init() {
    		var container = document.getElementById( 'container' );
            
			info = document.getElementById("info");
			setTimeout(function(){canFade = true;},4000);
			
            camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 5, 766 );
            camera.position.set( 0, 0, 10 );
    
            scene = new THREE.Scene();	
            //scene.fog = new THREE.FogExp2( 0x000000, 0.05);		
            
            renderer = new THREE.WebGLRenderer({preserveDrawingBuffer:true,antialias:true});
            renderer.setSize( window.innerWidth, window.innerHeight );
            
            //renderer.setClearColor(0x000000, 1.0);
            renderer.autoClearColor = false;
			
            container.appendChild( renderer.domElement );
			
			reflectionCube = THREE.ImageUtils.loadTextureCube( urls );
			reflectionCube.format = THREE.RGBFormat;
			
			cameraParent = new THREE.Object3D();
			scene.add(cameraParent);
			
			var dlight = new THREE.DirectionalLight(0xffe900, .3, 0, 0, 1);
			scene.add(dlight);

			var dlight = new THREE.DirectionalLight(0x84b9ff, .8);
			scene.add(dlight);
			
			var alight = new THREE.AmbientLight( 0xffffff ); // soft white light
			scene.add( alight );
			
			bgTexture = THREE.ImageUtils.loadTexture('assets/images/bg.jpg');
			bgTexture.wrapS = bgTexture.wrapT = THREE.RepeatWrapping;
			bgTexture.repeat.set( 1, 1 );
			
			bgGeo = new THREE.PlaneGeometry( 200, 200, 1, 1 );
			
			for ( var i = 0; i < bgGeo.faces.length; i ++ ) {
				var f  = bgGeo.faces[ i ];
				var n = ( f instanceof THREE.Face3 ) ? 3 : 4;
				for( var j = 0; j < n; j++ ) {
					vColors.push(Math.random());
				}
			}
				
			
			var bgMat = new THREE.MeshBasicMaterial( { color: 0x000000, shading: THREE.FlatShading, transparent:true, opacity:.04, vertexColors: THREE.VertexColors } );

			
			//var bgMat = new THREE.MeshBasicMaterial( { side:THREE.DoubleSide, opacity:0.1, transparent:true, map:bgTexture } );
		
			bg = new THREE.Mesh( bgGeo, bgMat);
			bg.position.z = -40;
			cameraParent.add( bg );
			
			var mat = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0xffffff, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.7 } );

			var mat2 = new THREE.MeshLambertMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0x000000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0 } );

			var mat3 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0xcfe0fc, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0 } );

			var mat4 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0x000000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0 } );

			var mat5 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0xff0000, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.1 } );

			var mat6 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0xff6666, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.25 } );

			var mat7 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0xb3b3ff, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.15 } );

			var mat8 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0xffccfa, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.1 } );

			var mat9 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0xccf0ff, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.1 } );

			var mat10 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0xffffff, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.1 } );

			var mat11 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0xfffdcc, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.1 } );
			
			var mat12 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0x0004ff, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.35 } );

			var mat13 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0x4c9900, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.1 } );

			var mat14 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0xc46f00, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.1 } );

			var mat15 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0x00bdc4, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.1 } );

			var mat16 = new THREE.MeshPhongMaterial( { vertexColors: THREE.VertexColors, side:THREE.DoubleSide, ambient: 0x7f00c4, envMap: reflectionCube, combine: THREE.MixOperation, reflectivity: 0.1 } );

			var mat17 = new THREE.MeshBasicMaterial( { side:THREE.DoubleSide, color:0x000000, ambient: 0x000000, wireframe: false, } );
			
			
			
			/*
			for(var d = 0; d <100; d++){
				//var rnd = Math.floor(Math.random()*6);
				var rnd2 = Math.floor(Math.random()*9);
				var lod = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod.load("Assets/Shapes/1/"+rnd2+".json", function(geometry){
					var ms = new THREE.Mesh(geometry, mat);
					var scl = Math.random();
					ms.scale = new THREE.Vector3(99, 99, 99);
					ms.position.x = -20+Math.random()*40;
					ms.position.z = -20+Math.random()*40;
					ms.position.y = -40+Math.random()*80;
					ms.position.z = -1;
					
					rVelY.push(Math.random()*.15);
					spheres.push(ms);// = ms;
					
					scene.add(ms);

					
				
				});
					
			}

			for(var d = 0; d <100; d++){
				//var rnd = Math.floor(Math.random()*6);
				var rnd2 = Math.floor(Math.random()*9);
				var lod3 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod3.load("Assets/Shapes/1/"+rnd2+".json", function(geometry){
					var ms3 = new THREE.Mesh(geometry, mat3);
					var scl = Math.random();
					ms3.scale = new THREE.Vector3(99, 99, 99);
					ms3.position.x = -20+Math.random()*40;
					ms3.position.z = -20+Math.random()*40;
					ms3.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*.15);
					spheres.push(ms3);// = ms;
					
					scene.add(ms3);

					
				
				});
					
			}*/
			

			for(var d = 0; d <3; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/1.json", function(geometry){
					var ms2 = new THREE.Mesh(geometry, mat2);
					var scl = Math.random();
					ms2.scale = new THREE.Vector3(55, 55, 55);
					ms2.position.x = -20+Math.random()*40;
					ms2.position.z = -20+Math.random()*40;
					ms2.position.y = -40+Math.random()*80;
					ms2.position.z = 1;
					
					rVelY.push(Math.random()*.15);
					spheres.push(ms2);// = ms;
					
					scene.add(ms2);

					
				
				});
					
			}

			for(var d = 0; d <5; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/0.json", function(geometry){
					var ms3 = new THREE.Mesh(geometry, mat3);
					var scl = Math.random();
					ms3.scale = new THREE.Vector3(15, 15, 15);
					ms3.position.x = -21+Math.random()*70;
					ms3.position.z = -21+Math.random()*70;
					ms3.position.y = -21+Math.random()*100;
					//ms3.position.z = 1;
					
					rVelY.push(Math.random()*.15);
					spheres.push(ms3);// = ms;
					
					scene.add(ms3);

					
				
				});
					
			}

			for(var d = 0; d <3; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/2.json", function(geometry){
					var ms4 = new THREE.Mesh(geometry, mat4);
					var scl = Math.random();
					ms4.scale = new THREE.Vector3(11, 44, 244);
					ms4.position.x = -20+Math.random()*40;
					ms4.position.z = -20+Math.random()*40;
					ms4.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.05);
					spheres.push(ms4);// = ms;
					
					scene.add(ms4);

					
				
				});
					
			}

			for(var d = 0; d <4; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/3.json", function(geometry){
					var msa = new THREE.Mesh(geometry, mat5);
					var scl = Math.random();
					msa.scale = new THREE.Vector3(44, 44, 244);
					msa.position.x = -20+Math.random()*40;
					msa.position.z = -20+Math.random()*40;
					msa.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.06);
					spheres.push(msa);// = ms;
					
					scene.add(msa);

					
				
				});
					
			}

			for(var d = 0; d <4; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/3.json", function(geometry){
					var ms5 = new THREE.Mesh(geometry, mat6);
					var scl = Math.random();
					ms5.scale = new THREE.Vector3(55, 55, 55);
					ms5.position.x = -20+Math.random()*40;
					ms5.position.z = -20+Math.random()*40;
					ms5.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.06);
					spheres.push(ms5);// = ms;
					
					scene.add(ms5);

					
				
				});
					
			}

			for(var d = 0; d <3; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/4.json", function(geometry){
					var ms6 = new THREE.Mesh(geometry, mat7);
					var scl = Math.random();
					ms6.scale = new THREE.Vector3(55, 55, 55);
					ms6.position.x = -20+Math.random()*40;
					ms6.position.z = -20+Math.random()*40;
					ms6.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.075);
					spheres.push(ms6);// = ms;
					
					scene.add(ms6);

					
				
				});
					
			}

			for(var d = 0; d <3; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/5.json", function(geometry){
					var ms7 = new THREE.Mesh(geometry, mat8);
					var scl = Math.random();
					ms7.scale = new THREE.Vector3(55, 55, 55);
					ms7.position.x = -20+Math.random()*40;
					ms7.position.z = -20+Math.random()*40;
					ms7.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.075);
					spheres.push(ms7);// = ms;
					
					scene.add(ms7);

					
				
				});
					
			}

			for(var d = 0; d <3; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/6.json", function(geometry){
					var ms8 = new THREE.Mesh(geometry, mat9);
					var scl = Math.random();
					ms8.scale = new THREE.Vector3(90, 90, 90);
					ms8.position.x = -20+Math.random()*40;
					ms8.position.z = -20+Math.random()*40;
					ms8.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.075);
					spheres.push(ms8);// = ms;
					
					scene.add(ms8);

					
				
				});
					
			}

			for(var d = 0; d <3; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/7.json", function(geometry){
					var ms9 = new THREE.Mesh(geometry, mat10);
					var scl = Math.random();
					ms9.scale = new THREE.Vector3(90, 90, 90);
					ms9.position.x = -20+Math.random()*40;
					ms9.position.z = -20+Math.random()*40;
					ms9.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.0475);
					spheres.push(ms9);// = ms;
					
					scene.add(ms9);

					
				
				});
					
			}
			for(var d = 0; d <3; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/8.json", function(geometry){
					var ms10 = new THREE.Mesh(geometry, mat11);
					var scl = Math.random();
					ms10.scale = new THREE.Vector3(90, 90, 90);
					ms10.position.x = -20+Math.random()*40;
					ms10.position.z = -20+Math.random()*40;
					ms10.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.0475);
					spheres.push(ms10);// = ms;
					
					scene.add(ms10);

					
				
				});
					
			}

			for(var d = 0; d <3; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/hand.json", function(geometry){
					var ms11 = new THREE.Mesh(geometry, mat12);
					var scl = Math.random();
					ms11.scale = new THREE.Vector3(3, 3, 3);
					ms11.position.x = -20+Math.random()*40;
					ms11.position.z = -20+Math.random()*40;
					ms11.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.0475);
					spheres.push(ms11);// = ms;
					
					scene.add(ms11);

					
				
				});
					
			}

			for(var d = 0; d <3; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/head.json", function(geometry){
					var ms12 = new THREE.Mesh(geometry, mat13);
					var scl = Math.random();
					ms12.scale = new THREE.Vector3(1, 1, 1);
					ms12.position.x = -20+Math.random()*40;
					ms12.position.z = -20+Math.random()*40;
					ms12.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.0775);
					spheres.push(ms12);// = ms;
					
					scene.add(ms12);

					
				
				});
					
			}

			for(var d = 0; d <1; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/glitch1.json", function(geometry){
					var ms13 = new THREE.Mesh(geometry, mat17);
					var scl = Math.random();
					ms13.scale = new THREE.Vector3(11, 11, 11);
					ms13.position.x = -20+Math.random()*40;
					ms13.position.z = -20+Math.random()*40;
					ms13.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.0775);
					spheres.push(ms13);// = ms;
					
					scene.add(ms13);

					
				
				});
					
			}

			for(var d = 0; d <1; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/glitch2.json", function(geometry){
					var ms14 = new THREE.Mesh(geometry, mat14);
					var scl = Math.random();
					ms14.scale = new THREE.Vector3(11, 11, 11);
					ms14.position.x = -20+Math.random()*40;
					ms14.position.z = -20+Math.random()*40;
					ms14.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.0775);
					spheres.push(ms14);// = ms;
					
					scene.add(ms14);

					
				
				});
					
			}

			for(var d = 0; d <1; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/glitch3.json", function(geometry){
					var ms15 = new THREE.Mesh(geometry, mat15);
					var scl = Math.random();
					ms15.scale = new THREE.Vector3(11, 11, 11);
					ms15.position.x = -20+Math.random()*40;
					ms15.position.z = -20+Math.random()*40;
					ms15.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.775);
					spheres.push(ms15);// = ms;
					
					scene.add(ms15);

					
				
				});
					
			}

			for(var d = 0; d <1; d++){
				//var rnd = Math.floor(Math.random()*6);
				
				var lod2 = new THREE.JSONLoader();
				//lod.load("Assets/Shapes/"+rnd+"/scene.js", function(geometry){
				lod2.load("assets/shapes/1/glitch4.json", function(geometry){
					var ms16 = new THREE.Mesh(geometry, mat16);
					var scl = Math.random();
					ms16.scale = new THREE.Vector3(11, 11, 11);
					ms16.position.x = -20+Math.random()*40;
					ms16.position.z = -20+Math.random()*40;
					ms16.position.y = -40+Math.random()*80;
					
					
					rVelY.push(Math.random()*0.0775);
					spheres.push(ms16);// = ms;
					
					scene.add(ms16);

					
				
				});
					
			}



			
			/*
			var loader1 = new THREE.JSONLoader();
			loader1.load("Assets/Scene/dates3.json", function(geometry){
				
				mesh = new THREE.Mesh(geometry, mat2);
				mesh.scale.set(2,2,2);
				mesh.rotation.z = 180;
				mesh.rotation.x = -Math.PI*.25;
				mesh.position.x = 0;
				
				scene.add(mesh);
				
				geo = mesh.geometry;
				geo.dynamic = true;
				geo.computeCentroids(false);
				geo.computeFaceNormals(false);
				geo.computeVertexNormals(false);
						
				doVertexLoop(false);
				
			});
*/

			
			
            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
			document.addEventListener( 'mousedown', onDocumentMouseDown, false );
            document.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
            document.addEventListener( 'DOMMouseScroll', onDocumentMouseWheel, false);
            window.addEventListener( 'resize', onWindowResize, false );

        }
		
		function animate() {
			
			requestAnimationFrame( animate );
			render();
		
		}
		
		function handleMesh(){
			
			if(mesh){
				mesh.rotation.y +=.01;
				doVertexLoop(true);
				
			}
			
			for(var i = 0; i < spheres.length; i++){
				if(spheres[i]){
					spheres[i].position.y-=.03;
					spheres[i].rotation.x+=rVelY[i]*.2;
					spheres[i].rotation.y+=rVelY[i]*.2;
					if(spheres[i].position.y<-40){
						spheres[i].position.y = 40;
					}
				}
			}			
		
		}
		
		
		
		
		
		
		function doVertexLoop(animate){
			
			var doNormals = false;
			var scl = 0.5;
			
			for( var i = 0; i < geo.faces.length; i ++ ) {
				
				var face = geo.faces[i];
			
			
				if(animate){
					
					var dr = dirVert[i];
					var og = ogPositions[i];
					var ax = axis[i];
					
					for(var k = 0; k<face.vertexNormals.length; k++){
						
						var vertPhase = (scl*.5)+Math.sin(phase + ax[k])*(scl*.5);
						
						var thisVert = geo.vertices[face[fvNames[k]]];
						
						
						if(doNormals){
					
							thisVert.x = og[k].x + vertPhase * dr[k].x;
							
							thisVert.y = og[k].y + vertPhase * dr[k].y;
						
							thisVert.z = og[k].z + vertPhase * dr[k].z;
						
						}else{
						
							thisVert.x = og[k].x + vertPhase;
							
							thisVert.y = og[k].y + vertPhase;
						
							thisVert.z = og[k].z + vertPhase;	
						}
							
					}

				}else{
								
					var dr = [];
					var og = [];
					var ax = [];
					
					for(var k = 0; k<face.vertexNormals.length; k++){
						
						dr[k] = new THREE.Vector3(face.vertexNormals[k].x, face.vertexNormals[k].y, face.vertexNormals[k].z);
						og[k] = new THREE.Vector3(geo.vertices[face[fvNames[k]]].x, geo.vertices[face[fvNames[k]]].y, geo.vertices[face[fvNames[k]]].z)
						ax[k] =  (geo.vertices[face[fvNames[k]]].y*1.5);
					
					}
					
					dirVert[i]  = dr;
					
					ogPositions[i] = og;
					
					axis[i] = ax;
					
				}
			
			}
			
			phase += .04;
			mesh.geometry.verticesNeedUpdate = true;
		}
		
		
	
		
		
		function doFaceLoop(animate){
			
			
			var scl = 0.5;
			
			for( var i = 0; i < geo.faces.length; i ++ ) {
				
				var face = geo.faces[i];
				
				
				if(animate){
					
					
					var facePhase = Math.sin(phase + axis[i])*(scl);
					if(facePhase<0)facePhase = 0;
					var ogPos = new THREE.Vector3(ogPositions[i].x, ogPositions[i].y, ogPositions[i].z); 
					var dir = new THREE.Vector3(dirFace[i].x, dirFace[i].y, dirFace[i].z);
					
					var al = faceDif[i];
			
					for(var k = 0; k<face.vertexNormals.length; k++){
						
						var dif = new THREE.Vector3(al[k].x, al[k].y, al[k].z);
						
						geo.vertices[face[fvNames[k]]].x = (ogPos.x+dif.x)  + facePhase * dir.x;
						
						geo.vertices[face[fvNames[k]]].y = (ogPos.y+dif.y) + facePhase * dir.y;
					
						geo.vertices[face[fvNames[k]]].z = (ogPos.z+dif.z)  + facePhase * dir.z;
					}
					
				}else{
					
					
					dirFace[i] = face.normal;

					ogPositions[i] = new THREE.Vector3(face.centroid.x, face.centroid.y, face.centroid.z);
					
					axis[i] = face.centroid.y* 2;
					
					var al = [];
					
					for(var k = 0; k<face.vertexNormals.length; k++){
						
						var xx = geo.vertices[face[fvNames[k]]].x - ogPositions[i].x;
						var yy = geo.vertices[face[fvNames[k]]].y - ogPositions[i].y;
						var zz = geo.vertices[face[fvNames[k]]].z - ogPositions[i].z;
						al[k] = new THREE.Vector3(xx,yy,zz);
						
					}
					
					faceDif[i] = al;
				
				}
			
			}

			phase += .01;
			mesh.geometry.verticesNeedUpdate = true;
		
		}
		
		
		function handleVertexColors(){
			
			var color, f, p, n, vertexIndex;
			
			if(brt>0.8)brt-=.01;
			
			for ( var i = 0; i < bgGeo.faces.length; i ++ ) {

				f  = bgGeo.faces[ i ];
				

				var n = ( f instanceof THREE.Face3 ) ? 3 : 4;

				for( var j = 0; j < n; j++ ) {
					
					vertexIndex = f[ fvNames[ j ] ];
					p = bgGeo.vertices[ vertexIndex ];

					color = new THREE.Color( 0xffffff );
					vColors[j]+=.002;
					vColors[j] = vColors[j]%1.0;
				
					color.setHSL( vColors[j], 1.0, brt );

					f.vertexColors[ j ] = color;

				}

			}
			
			bg.geometry.colorsNeedUpdate = true;
			
		}
		
		
		
			
		function render() {
			
			//cameraInc += (mouseX-inc)*.00004;
			
			camera.position.z = 0;
			
			
			camera.position.y += ( mouseY - camera.position.y ) * .09;
			camera.position.x += ( mouseX - camera.position.x ) * .09;
			camera.position.z += ( mouseX - camera.position.x ) * .009;
			
			
			camera.lookAt( new THREE.Vector3(0, 0, 0));

			
			cameraParent.rotation.copy( camera.rotation );
			cameraParent.position.copy( camera.position);	

			camera.rotation.z = 1;
			
			//mesh = new THREE.mesh()
			
			handleMesh();
			handleVertexColors();
			
			renderer.render( scene, camera );
		}
			
		
		
		function onWindowResize() {

			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;

			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();

			renderer.setSize( window.innerWidth, window.innerHeight );

		}
		
		function onDocumentMouseDown( event ) {

			for(var i = 0; i < vColors.length; i++){
				vColors[i]=Math.random();
			}
			brt = 1.0;
		}
		

		function onDocumentMouseMove( event ) {

			mouseX = ( event.clientX - windowHalfX );
			mouseY = ( event.clientY - windowHalfY );
			if(canFade){
				if(event.clientY > (windowHalfY*2)-100 && event.clientX > (windowHalfX*2)-200){
					info.style.opacity = 1;
				}else{
					info.style.opacity = 0;
				}
			}
		}
		
		function onDocumentMouseWheel( event ) {
			
			if ( event.wheelDeltaY ) {
				camera.fov -= event.wheelDeltaY * 0.01;
			} else if ( event.wheelDelta ) {
				camera.fov -= event.wheelDelta * 0.01;			
			} else if ( event.detail ) {
				camera.fov -= event.detail * 0.01;
			}
			
			if(camera.fov<2)camera.fov=2;
			if(camera.fov>70)camera.fov=70;


			
			camera.updateProjectionMatrix();
					
		}
