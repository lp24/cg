/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

const cubeDim       = { side: 250, segments: 16 };

/* CubeGeometry ( width, height, depth, widthSegments, heightSegments, depthSegments ) */
const cubeGeometry  = new THREE.CubeGeometry( cubeDim.side, cubeDim.side, cubeDim.side, cubeDim.segments, cubeDim.segments, cubeDim.segments );

const cubePosition  = { x: 0,
                        y: 0,
                        z: cubeDim.side/2 };

const bumpMapRubik  = new THREE.TextureLoader().load( 'textures/cube/cube_face_bump_blur.png' );

const texture1      = new THREE.TextureLoader().load( 'textures/cube/rubik_face_1.png' );
const texture2      = new THREE.TextureLoader().load( 'textures/cube/rubik_face_2.png' );
const texture3      = new THREE.TextureLoader().load( 'textures/cube/rubik_face_3.png' );
const texture4      = new THREE.TextureLoader().load( 'textures/cube/rubik_face_4.png' );
const texture5      = new THREE.TextureLoader().load( 'textures/cube/rubik_face_5.png' );
const texture6      = new THREE.TextureLoader().load( 'textures/cube/rubik_face_6.png' );




/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createCubeMaterials(){

    var RubikMaterialArrayBasic   = [
        new THREE.MeshBasicMaterial( { map: texture5 } ),  //RIGHT
        new THREE.MeshBasicMaterial( { map: texture1 } ),  //LEFT
        new THREE.MeshBasicMaterial( { map: texture2 } ),  //BACK
        new THREE.MeshBasicMaterial( { map: texture4 } ),  //FRONT
        new THREE.MeshBasicMaterial( { map: texture3 } ),  //TOP
        new THREE.MeshBasicMaterial( { map: texture6 } )   //BOTTOM
    ];

    var RubikmaterialArrayComplex = [
        new THREE.MeshPhongMaterial( { map: texture5, bumpMap: bumpMapRubik, bumpScale: 50  } ),  //RIGHT
        new THREE.MeshPhongMaterial( { map: texture1, bumpMap: bumpMapRubik, bumpScale: 50  } ),  //LEFT
        new THREE.MeshPhongMaterial( { map: texture2, bumpMap: bumpMapRubik, bumpScale: 50  } ),  //BACK
        new THREE.MeshPhongMaterial( { map: texture4, bumpMap: bumpMapRubik, bumpScale: 50  } ),  //FRONT
        new THREE.MeshPhongMaterial( { map: texture3, bumpMap: bumpMapRubik, bumpScale: 50  } ),  //TOP
        new THREE.MeshPhongMaterial( { map: texture6, bumpMap: bumpMapRubik, bumpScale: 50  } )   //BOTTOM
    ];

    materialArrayBasic.push		( RubikMaterialArrayBasic   );
    materialArrayComplex.push	( RubikmaterialArrayComplex );
}


function createCube(){

    createCubeMaterials();

    var cube = new THREE.Mesh       ( cubeGeometry );

    meshArray.push              ( cube );
    cube.position.copy          ( cubePosition );
    scene.add                   ( cube );
}
    

