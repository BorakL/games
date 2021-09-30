import React from 'react';
import './word.css';
import {v4 as uuidv4} from 'uuid';

// background-image: url('images/graph-line.jpg');

class Word extends React.Component{
    
    isVisible(hitLetters,letter){
        return hitLetters.indexOf(letter)>=0 ? true : false; 
    }

    render(){
        let word = this.props.value.split("");  
        let hitLetters = this.props.hitLetters;
         
        return(
            <> 
            {word.map((letter,i)=>
                <div key={uuidv4()} className="field">
                    <span className={`letter ${(this.isVisible(hitLetters,letter) || this.props.isOver) && "visible"}`}> { i===0 ? letter.charAt(0).toUpperCase()+letter.slice(1) : letter}</span>
                </div>)
            } 
            </>
        )
    }
}

export default Word;