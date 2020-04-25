import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component {
    
    renderCampsite(campsite){
        return(
            <div className = "col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
    renderComment(comments){
        if(comments) {
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                        {comments.map(comment => 
                            <div key={comment.id}>
                            <hr />
                                <p>{comment.text} </p>
                               <p><em>--{comment.author}</em>, 
                                {new Intl.DateTimeFormat('en-US', { 
                                year: 'numeric', month: 'short', day: '2-digit'
                                }).format(new Date(Date.parse(comment.date)))}
                                </p>
                            </div>)}
                        
                </div>
            )
        }  return <div/>; 
    }
    render(){
        if(this.props.campsite === null) { 
            return <div></div>;
        } else {
            return <div className="row">
                {this.renderCampsite(this.props.campsite)}
                {this.renderComment(this.props.campsite.comments)}
            </div>;
        }
    }
}

export default CampsiteInfo;