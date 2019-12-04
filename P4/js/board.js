/***************************************************************************/
/*                                                                         */
/*                             Constant Values                             */
/*                                                                         */
/***************************************************************************/

/* Object Dimensions for Positions */

const boardDim		= {	width : 1600, height: 1600, segments: 64 };

/* Positions accordingly to the Object Graph */

const boardPosition = { x: 0,
						y: 0,
						z: 0 };

/* PlaneGeometry ( width, height, widthSegments, heightSegments ) */
const boardGeometry	    = new THREE.PlaneGeometry( boardDim.width, boardDim.height, boardDim.segments, boardDim.segments );

const textureBoard      = new THREE.TextureLoader().load( 'textures/board/chessboard_wood.png' );


/***************************************************************************/
/*                                                                         */
/*                                Functions                                */
/*                                                                         */
/***************************************************************************/

function createBoardMaterials(){

    var boardBasicMaterial          =   new THREE.MeshBasicMaterial	    ( { map: textureBoard } );
    var boardLambertMaterial        =   new THREE.MeshLambertMaterial	( { map: textureBoard } );

    materialArrayBasic.push 	( boardBasicMaterial   );
    materialArrayComplex.push   ( boardLambertMaterial );
}


function createBoard() {

    /*Start Materials for Board*/
    createBoardMaterials();

    var board           = new THREE.Mesh( boardGeometry );

    meshArray.push      ( board );
	
    board.position.copy ( boardPosition );

    scene.add           ( board );
}
