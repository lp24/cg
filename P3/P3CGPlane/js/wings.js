function createWings(){
	/*Wings*/	
	
	//Left Wing
	var leftWing			= new THREE.Mesh(createWingShape());	
	
    leftWing.scale.set		(WingDim.width,WingDim.height,10000);
	leftWing.position.copy	(planeLWingPosition);	
	meshArray.push			(leftWing);
	plane.add				(leftWing);
	
	//Right Wing
	var rightWing			=  new THREE.Mesh(createWingShape());
	
	rightWing.scale.set		(WingDim.width,WingDim.height,1);
	rightWing.position.copy	(planeRWingPosition);
	rightWing.rotateX		(pi);	
	meshArray.push			(rightWing);	
	plane.add				(rightWing);
	
	/*Gliders- They need an object to change their Axis to rotate according to Tail angle*/ 
	
	const angle=Math.atan(planeFuselageDim.radius/tailLength);
	
	//Left Glider
	var leftGlider			= new THREE.Object3D();	
	var leftGliderMesh		= new THREE.Mesh(createWingShape());	
	
	leftGliderMesh.scale.set		(GliderDim.width,GliderDim.height,1);
	leftGliderMesh.position.copy	(planeLGliderMeshPosition);
	leftGlider.add					(leftGliderMesh);
	meshArray.push					(leftGliderMesh);

	leftGlider.position.copy		(planeLGliderPosition);
	leftGlider.rotateZ				(angle);	
	plane.add						(leftGlider);
	
	//Right Glider
	var rightGlider			= new THREE.Object3D();
	var rightGliderMesh		= new THREE.Mesh(createWingShape());
	
	rightGliderMesh.scale.set		(GliderDim.width,GliderDim.height,1);
	rightGliderMesh.position.copy	(planeRGliderMeshPosition);	
	rightGlider.add					(rightGliderMesh);
	meshArray.push					(rightGliderMesh);

	rightGlider.position.copy	(planeRGliderPosition);
	rightGlider.rotateX			(pi);
	rightGlider.rotateZ			(angle);	
    plane.add					(rightGlider);
	
	//Vertical Glider
	var verticalGlider		= new THREE.Object3D();
	var verticalGliderMesh	= new THREE.Mesh(createWingShape());	
	
	verticalGliderMesh.scale.set		(GliderDim.width,GliderDim.height,1);
	verticalGliderMesh.position.copy	(planeVGliderMeshPosition);	
	verticalGlider.add					(verticalGliderMesh);
	meshArray.push						(verticalGliderMesh);	

	verticalGlider.position.copy	(planeVGliderPosition);
	verticalGlider.rotateX			(pi/2);
	verticalGlider.rotateZ			(angle);	
    plane.add						(verticalGlider);
}

/*Create Wing Shape:
Vertices: Example for N=3
Triangle		
0		 	
41			
752			
9863		
*/
//Triangle 1x1
function createWingShape(){
    const delta=1/WingN;

	var wingeo=new THREE.Geometry();
	var currentV=-1;
    for (var i=WingN;i>=0;i--){
        var currentx=0;
        var currenty=i*delta;
        for (var j=i;j>=0;j--){
            wingeo.vertices.push(new THREE.Vector3(currentx,currenty,0));
			currentV+=1;
            currenty=currenty-delta;
            currentx=currentx+delta;
			
            if (currentV>WingN){ //only creates the |\ face after first iteration
                var rightV=currentV-i-1;
                var upV=rightV-1;				
                wingeo.faces.push(new THREE.Face3(currentV,rightV,upV));
            
                if(j!=i){ //only creates the \| face after each first iteration of 'i'
                    var diagV=currentV-1;
                    wingeo.faces.push(new THREE.Face3(currentV,diagV,upV));
                }
            }
        }
    }
	wingeo.computeFaceNormals();
    return wingeo;
}
