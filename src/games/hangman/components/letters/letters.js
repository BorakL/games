import React from 'react';
import {v4 as uuidv4} from 'uuid';
import './letters.css';

class Letters extends React.Component{
    constructor(){
        super();
        this.handleTry = this.handleTry.bind(this);
        this.handleDisablingButtons = this.handleDisablingButtons.bind(this)
    }
    handleTry(e){ 
        this.props.try(e.target.value)
        let id = Number(e.target.dataset.id);
        this.handleDisablingButtons(id)
    }
    handleDisablingButtons(id){
        this.props.disablingButtons(id)
    }
    render(){ 
        return(
            <> 
            {this.props.letters.map((l,i)=>
                <button 
                    key={uuidv4()} 
                    data-id={i}
                    onClick={this.handleTry} 
                    value={l} 
                    disabled={(this.props.isOver || this.props.disabled.indexOf(i)!==-1)}>
                    {l}
                </button>
            )}
            </>
        )
    }
}

export default Letters;