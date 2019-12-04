function createFuselage(){	
    var fuselage			= new THREE.Mesh (createFuselageShape());
	
    fuselage.scale.set		( planeFuselageDim.height,planeFuselageDim.radius,planeFuselageDim.radius );
	fuselage.position.copy	( planeFusPosition );
	fuselage.rotateX		( pi );
	
	meshArray.push			( fuselage );
    plane.add				( fuselage );
}

function createFuselageShape(){
    var fgeo		= new THREE.Geometry();    

    const tail_dim	= tailLength/planeFuselageDim.height;		// tail portion of the fuselage dimension
	const cpit_dim 	= cockpitDim.radiusx/planeFuselageDim.height; //cockpit portion of the fuselage dimension
	const body_dim 	= 1-tail_dim-cpit_dim;						// body portion of the fuselage dimension
    
    const deltaTN	= tail_dim/TailN;           //How much we move in 'x' between each circle of the tail
    const deltaBN	= body_dim/BodyN;           //How much we move in 'x' between each circle of the body
    const deltaR	= 1/TailN;                   //How much the radius of the tail grows between each Tail circle

    fgeo.vertices.push(new THREE.Vector3(0,0,0)); //tip of the tail   
    var currentx=0;
	
    //Tail
    var current_radius=0;	
    for (var i=0;i<TailN;i++){
        current_radius	+=deltaR;
        currentx		+=deltaTN;
        drawcircle(fgeo,currentx,current_radius,RadN);
    }
    
    //Body    
    for(i=0;i<BodyN;i++){
        currentx+=deltaBN;
        drawcircle(fgeo,currentx,1,RadN);
    }
	
	//UnderCockpit (creates shape equal to cockpit and rotates fuselage, since rest is symetrical)
	createCockpitShape(fgeo,currentx,cpit_dim);
	
    fgeo.computeFaceNormals();	
	return fgeo;
}

//draws a circle on plane x=x, with radius radius and RadN vertices
function drawcircle(fgeo,x,radius,RadN){
    const deltaR=2*pi/RadN; //How much the angle changes between each point while making a circle
    var current_angle=0; 
	var startV=fgeo.vertices.length; //First vertice of the circle (to know if its first circle, and to start drawing the faces)
	
	//Draws vertices
    for (var i=0;i<RadN;i++){
        var y=radius*Math.cos(current_angle);
        var z=radius*Math.sin(current_angle);
        fgeo.vertices.push(new THREE.Vector3(x,y,z));
        current_angle+=deltaR;
    }
    
	//Draws faces
	var currentV=startV;
	var nextV=currentV+1;	
	var centerV1=currentV-RadN;
    var centerV2=nextV-RadN;
	
	for (i=0;i<RadN;i++){
		if(i==RadN-1){ 	//end of cicle
			nextV-=RadN;
			centerV2-=RadN;
        }
		if(startV==1){// if this is the inicial circle, only connects to the center(=0)
            fgeo.faces.push(new THREE.Face3(currentV,0,nextV));
        }    
		else{ 	//conects this circle with previous circle
            fgeo.faces.push(new THREE.Face3(nextV,currentV,centerV1));
            fgeo.faces.push(new THREE.Face3(centerV2,nextV,centerV1));
			centerV1+=1;
			centerV2+=1;
        }
		currentV+=1;
		nextV+=1;
    }   
}
            
            

