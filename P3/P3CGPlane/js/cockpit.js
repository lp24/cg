function createCockpit(){
	var cgeo				= new THREE.Geometry();
	createCockpitShape		( cgeo,0,1 ); //(geometry,currentx,Cpit_size)
	cgeo.computeFaceNormals	();

    var cockpit		   		= new THREE.Mesh( cgeo );
    cockpit.scale.set		( cockpitDim.radiusx,cockpitDim.radiusyz,cockpitDim.radiusyz );
	cockpit.position.copy	( planeCockpitPosition );
	
	meshArray.push			( cockpit );
    plane.add				( cockpit );
}

// QuarterSphere
function createCockpitShape(geo,currentx,size){
	const deltaN		= size/CpitN;			//How much we move in 'x' between each halfcircle
    var   current_angle	= pi/2;					//Starting angle
    const deltaR		= current_angle/CpitN;  //How much the radius changes between each circle
	
    //Draws half circles with decreasing radius
    for (var i=0;i<CpitN;i++){
        drawHalfcircle(geo,currentx,Math.sin(current_angle),HRadN);
        current_angle	-= deltaR;
        currentx		+= deltaN;
    }
        
    //closing the quartersphere
	//adds a point in centre to connect with (push returns Length)
    var center 		= geo.vertices.push(new THREE.Vector3(currentx,0,0))-1;
    var currentV	= center-HRadN;
	var nextV		= currentV+1;
    for (i=0;i<HRadN-1;i++){	
        geo.faces.push(new THREE.Face3(center,currentV,nextV));
		currentV+=1;
        nextV	+=1;	
    }
}	

//Draws half a circle on plane x=x, with HRadN vertices
function drawHalfcircle(geo,x,radius,HRadN){
    const deltaR		= pi/(HRadN-1); //How much the angle changes between each point while making a circle. 
    var   current_angle	= 0; 
	var   currentV		= geo.vertices.length; //Vertice of the start of the halfcircle (to start drawing the faces)
	
    //adds vertices
    for (var i=0;i<HRadN;i++){
        var y=radius*Math.cos(current_angle);
        var z=radius*Math.sin(current_angle);
        geo.vertices.push(new THREE.Vector3(x,y,z));
        current_angle+=deltaR;
    }
    
    //adds faces
    if(radius<1){ //if not the inicial circle, conects this halfcircle with previous one
		//currentV is the first vertice of this halfcircle 
		var nextV		= currentV+1;
		var centerV1	= currentV-HRadN;
		var centerV2	= centerV1+1;
        for(i=0;i<HRadN-1;i++){
            geo.faces.push(new THREE.Face3(nextV,currentV,centerV1));
            geo.faces.push(new THREE.Face3(nextV,centerV1,centerV2));
			currentV+=1;
			nextV	+=1;
			centerV1+=1;
			centerV2+=1;
        }
    } 
}
            
            
            
            
            

