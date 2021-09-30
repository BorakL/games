import React from 'react';
import Word from './components/word/word';
import Result from './components/result/result';
import Letters from './components/letters/letters';
import "./hangman.css";

class Hangman extends React.Component{
    static defaultProps = {
        letters: "abcdefghijklmnopqrstuvxyz".split(""),
        words: ["Athens","Belgrade","Berlin","Bern","Bratislava","Brussels","Bucharest","Budapest","Chisinau","Copenhagen","Dublin","Helsinki","Kiev","Lisbon","Ljubljana","London","Luxembourg","Madrid","Minsk","Monaco","Moscow","Nicosia","Oslo","Paris","Podgorica","Prague","Reykjavik","Riga","Rome","Sarajevo","Skopje","Stockholm","Tallinn","Vienna","Vilnius","Warsaw","Zagreb"]
    }
    constructor(props){
        super(props);
        this.state = {
            usedLetters:[],
            hitLetters:[],
            chance:6, 
            disabled:[]
        }
        this.word = (this.selectWord()).toLowerCase();
       
        //functions binding
        this.try = this.try.bind(this)
        this.playAgain = this.playAgain.bind(this)
        this.disablingButtons = this.disablingButtons.bind(this)
    }

    selectWord(){
         return this.props.words[Math.floor(Math.random()*this.props.words.length)]
    }

    try(e){  
        let letter = e;
        let word = this.word.split("");  

        //set usedLetter
        let tmp = [...this.state.usedLetters];
        tmp.push(letter);
        this.setState(st=>{return {usedLetters: tmp}}); 
        
        //set hitLetters
        let hitLetters = this.state.hitLetters;
        let indx = word.indexOf(letter);
        //hit
        if(indx>=0){
            hitLetters.push(...word.filter(l=>l===letter))
            this.setState(st=>{return {hitLetters:hitLetters}}) 
        }
        //miss
        else{
            this.setState(st=>{return {chance:st.chance-1}})
        }
        
    }

    disablingButtons(id){
        this.setState({disabled: [...this.state.disabled, id]}) 
    }

    playAgain(e){
        this.word = (this.selectWord()).toLowerCase();
        this.setState(st=>{
            return{
            usedLetters:[],
            hitLetters:[],
            chance:6, 
            disabled:[]
            }
        })
    }
 

    render(){  
        let isWin = this.word.length === this.state.hitLetters.length;
        let isOver = this.state.chance<1; 
        
        return(
            <div className="hangman" >
                
                <h1>Cities</h1>
                
                <div className="letters-container">
                    <Letters letters={this.props.letters} try={this.try} chance={this.state.chance} isOver={isOver || isWin} disablingButtons={this.disablingButtons} disabled={this.state.disabled}/>
                </div> 
                <div className="word-container">
                    <Word value={this.word} hitLetters={this.state.hitLetters} isOver={isOver}/>
                </div> 
                <div className="result" >
                    <Result chance={this.state.chance} isOver={isOver} isWin={isWin} playAgain={this.playAgain}/>
                </div>

            </div>
        )
    }
}

export default Hangman;