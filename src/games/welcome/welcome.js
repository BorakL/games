import React from "react";
import { Card, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

class Welcome extends React.Component{
    render(){
        return(  
            <Container fluid>
                <Row className="justify-content-center" xs={1} md={2}>   
                    {
                        this.props.games.map(g=>
                            <Card style={{ width: '18rem', margin:"1em" }} key={g} >
                                <Link to={`/${g}`}>
                                    <Card.Img style={{height:"250px"}} variant="top" src={`/images/${g}/${g}-card.png`} />
                                </Link>
                                <Card.Body>
                                    <Link to={`/${g}`}><Card.Title>{g}</Card.Title></Link>
                                    <Card.Text></Card.Text> 
                                </Card.Body>
                            </Card>
                        )
                    } 
                </Row>    
            </Container>
            
        );
    }
}

export default Welcome;