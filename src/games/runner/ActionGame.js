import React from 'react';
import {FaRedo} from 'react-icons/fa';
import { getScore } from '../../utilities/utilities';
import './ActionGame.css';


class ActionGame extends React.Component{
    constructor(){
        super();
        this.state={
            move:"",
            isEnd:true,
            iteration:0,
            obstaclePosition:0,
            result:null
        }
        this.move = this.move.bind(this); 
        this.handleKeyDown = this.handleKeyDown.bind(this);  
        this.isEnd = this.isEnd.bind(this);
        this.playAgain = this.playAgain.bind(this);
        this.placeObstacle = this.placeObstacle.bind(this);
        this.gameRef = React.createRef();
        this.characterRef = React.createRef();
        this.obstacleRef = React.createRef(); 
        this.intervaIsEnd=null;
        this.intervalPlaceObstacle=null; 
    }
    
    componentDidMount(){
        document.addEventListener("keydown", this.handleKeyDown); 
    }

    move(m){ 
        if(m!=="jump" && m!=="down") throw("The move can be either a jump or down")
        if(this.state.move!==m){
            this.setState((st)=>{return{move:m}})
        }
        setTimeout(()=>{
            this.setState({move:""})
        },500)
    } 

    placeObstacle(){ 
        if(!this.state.isEnd) {
            this.setState({obstaclePosition: Math.floor(Math.random()*3)});
        }
    }

    isEnd(){
        let character = this.characterRef.current;
        let obstacle = this.obstacleRef.current;
        let game = this.gameRef.current;
        if(!game)return;
        let gameWidth = parseInt(getComputedStyle(game).getPropertyValue("width"));
        let gameHeight = parseInt(getComputedStyle(game).getPropertyValue("height"));
        let bottomCharacter = parseInt(getComputedStyle(character).getPropertyValue("bottom"));
        let heightCharacter = parseInt(getComputedStyle(character).getPropertyValue("height"));
        let leftObstacle = parseInt(getComputedStyle(obstacle).getPropertyValue("left"));
        let dangerZone = leftObstacle>=10*gameWidth/100 && leftObstacle<=20*gameWidth/100;
        
        const gameOver=()=>{
            this.setState({isEnd:true});
            clearInterval(this.intervaIsEnd);
            clearInterval(this.intervalPlaceObstacle);
            this.setState({result: getScore("runner",this.state.iteration,"desc")}) 
        }

        if(this.state.obstaclePosition===0 && dangerZone && bottomCharacter<40*gameHeight/100 ){
            gameOver();    
        }
        if(this.state.obstaclePosition===1 && dangerZone){
            if(heightCharacter<=10*gameHeight/100)return
            else if(bottomCharacter>40*gameHeight/100)return
            else gameOver(); 
        }
        if(this.state.obstaclePosition===2 && dangerZone && heightCharacter>10*gameHeight/100 )gameOver();


        this.setState((st)=>{return{iteration:st.iteration+1}})
    }
    
    playAgain(){
        this.setState({move:""});
        this.setState({obstaclePosition:0})
        this.setState({isEnd:false});
        this.setState({iteration:0}); 
        this.intervaIsEnd = setInterval(this.isEnd,50);
        this.intervalPlaceObstacle = setInterval(this.placeObstacle,1000);
    }

    handleKeyDown(e){
        if (e.keyCode === 40) this.move("down")
        if (e.keyCode === 38) this.move("jump")
    }

    render(){
        let obstaclesBottoms=[10,25,30];
        let op = obstaclesBottoms[this.state.obstaclePosition];

        let img="stay";
        if(this.state.move==="" && !this.state.isEnd){
            img="running";
        }
        if(this.state.move==="jump"){
            img="jump"
        }
        if(this.state.move==="down"){
            img="down"
        }
        let gameOver = (
                        <div className="gameOver">
                            <p>Game Over</p><FaRedo onClick={this.playAgain}/>
                            {this.state.result && <div className="score"> Your score: {this.state.result.result+1} <br/> {this.state.result.message} </div>}
                        </div>
                        );
 
        return(
            <>
            <div className="action-game" ref={this.gameRef} style={{backgroundImage:"url(images/Runner/sky.jpg)"}}>
                {(this.state.isEnd===true && this.state.iteration===0) && <h1 className="title">Runner</h1>}
                <div 
                    className={`character ${!this.state.isEnd && this.state.move}`} 
                    ref={this.characterRef}
                    >
                    <img src= {`images/Runner/${img}.gif`} alt="character"/> 
                </div>

                <div className= {!this.state.isEnd ? "obstacle" : "unvisible"} style={{bottom: `${op}%`, backgroundImage:"url(images/Runner/ground.jpg)"}} ref={this.obstacleRef}></div>

                <div className={`ground ${!this.state.isEnd && "groundAnimation"}`} style={{backgroundImage:"url(images/Runner/ground.jpg)"}}></div>
            
                {this.state.isEnd && this.state.iteration>0 && gameOver}

                

            </div>            

            <div>
                <button onClick={this.playAgain} disabled={!this.state.isEnd}>Play Game</button> 
                <p>{this.state.iteration}</p>
            </div> 
            </>
        )
    }
}

export default ActionGame;