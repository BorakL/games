import React from 'react';

class Result extends React.Component{
    constructor(){
        super();
        this.handlePlayAgain = this.handlePlayAgain.bind(this)
    }
    handlePlayAgain(){
        this.props.playAgain();
    }
    render(){
        let chance = this.props.chance;
        if(chance<1) chance=0; 

        return(
            <>
            <img src= {`images/hangman/hangman/${chance}.png`} alt="hangman"/>
            {(this.props.isOver || this.props.isWin) && 
                <>
                {this.props.isOver && <h2>Game Over</h2>}
                {this.props.isWin && <h2>You Won!</h2>}
                <button onClick={this.handlePlayAgain}>Play again</button>
                </>
            }
            </>
        )
    }
}

export default Result;