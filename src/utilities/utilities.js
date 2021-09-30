export function getScore(game,result, order="asc"){
	let score = localStorage.getItem(game) || 0;
    if(score===0){
  	    localStorage.setItem(game,result); 
  	    return{message:"", result:result}
    }
    if(order.toLowerCase()==="asc" && result<score){
        localStorage.setItem(game,result); 
        return{message:"New record!", result:result}
    }
    if(order.toLowerCase()==="desc" && result>score){
        localStorage.setItem(game,result); 
        return{message:"New record!", result:result}
    } 
    return{message:`High score: ${score}`, result:result}  
}