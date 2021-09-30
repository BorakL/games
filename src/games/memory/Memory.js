import React from 'react';
import { getScore } from '../../utilities/utilities';
import './Memory.css';

class Memory extends React.Component{
    static defaultProps  = {
        cards:["book","tree","cat","bell","cup","apple"]
    }
    constructor(props){
        super(props);
        this.state={
            cards:[],
            toggle:false,
            openCard1:{id:0, value:""},
            openCard2:{id:0, value:""},
            moves:0,
            result:null
        }
        this.move = this.move.bind(this);
        this.startGame = this.startGame.bind(this)
    }

    startGame(){
        let tmp = [...this.props.cards,...this.props.cards].map((c,i)=>{ return {id:i+1, value:c, isHidden:false} });
        let cards = [];	 
        while(tmp.length>0){
            let idx=Math.floor(Math.random()*tmp.length);
            cards.push(tmp[idx]);
            tmp.splice(idx,1)
        } 
        this.setState({
            cards:cards,
            openCard1:{id:0,value:""},
            openCard2:{id:0,value:""},
            moves:0,
            result:null
        })
    }

    componentDidMount(){
        this.startGame();
    }

    hideCards(value){
        let tmp = this.state.cards;
        tmp.map(t => { if(t.value===value) t.isHidden=true; return t})
        this.setState({cards: tmp});
    }

    move(e){
        let value = e.target.dataset.value;
        let id = e.target.dataset.id;
        let toggle = this.state.toggle;

        this.setState((st)=>{return{toggle:!st.toggle}});
        toggle = !this.state.toggle;
        
        if(toggle){
            this.setState((st)=>{return{openCard1:{id:id, value:value}}}); 
            this.setState({openCard2:{id:0,value:""}});
        }
        else{
            this.setState((st)=>{return{openCard2:{id:id, value:value}}});
            if(this.state.cards.length>0 && this.state.openCard1.id !== id )
            this.setState((st)=>{return{moves: st.moves+1}})
            if((this.state.openCard1.value === value) && this.state.openCard1.id !== id ){ 
                this.hideCards(value);
            }
        }
        if(this.state.cards.every(c=>c.isHidden===true)){
            this.setState({result:getScore("Memory",this.state.moves+1,"asc")})
        }
    }


    render(){
        let cards = this.state.cards;
        var openCard = (i,v)=>{ return (parseInt(this.state.openCard1.id)===i || parseInt(this.state.openCard2.id)===i) ? v : "card"}
          
        {this.state.result && <div className="score"> Your score: {this.state.result.result+1} <br/> {this.state.result.message} </div>}
        
        return( 
            <div className="memory">
                <h1>Memory</h1> 
                <div className="cards">    
                    {cards.map(c=> 
                    <div 
                        key={c.id} 
                        className={`${openCard(c.id)} card ${c.isHidden && "hidden"} `} 
                        data-value={c.value}
                        data-id={c.id} 
                        onClick={this.move}
                        style={{backgroundImage:`url(images/Memory/${openCard(c.id,c.value)}.png)`}}
                    >   
                    </div>)}
                </div> 
                {this.state.result && <div className="button"><button onClick={this.startGame}>Play Again</button></div> }
                 
                <h2>Number of moves: {this.state.moves}</h2>

                {this.state.result && <p> {this.state.result.message}</p> }
                 
            </div>
            )
        }
}

export default Memory;
 