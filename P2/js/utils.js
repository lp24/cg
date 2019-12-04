 const pi=Math.PI;
 
 function cos(x){
	return Math.cos(x);
}
 
 function sin(x){
	 return Math.sin(x);
 }
 
 function arctg(x){
	 return Math.atan(x);
 }
 function Abs(x){
	 return Math.abs(x);
 }
 
 function squared(x){
     return x*x;
 }

 function sqroot(x){
	 return Math.sqrt(x);
 }
 function randFloat(min,max){
    return Math.random() * (max - min) + min;
 }

 function sqrdistance(pos1,pos2){
     var disx=pos1.x-pos2.x;
     var disy=pos1.y-pos2.y;
     return squared(disx)+squared(disy);
 }
     
function distance(pos1,pos2){
     return sqroot(sqrdistance(pos1,pos2));
 }
