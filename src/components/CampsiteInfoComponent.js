import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggleModal = () =>{this.setState(prev=>({isOpen: !prev.isOpen}))}
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" id="rating"className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                            </Row>
                            <Row className="form-group">
                            <Label htmlFor=".name" md={12}>Name</Label>
                            <Col md={12}>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder=" Your Name"
                                    className="form-control"
                                    validators ={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}>
                                </Control.text>
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    component="div"
                                    messages={{
                                            required: 'Required',
                                            minLength: 'Must be at least 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                />
                            </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor=".comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                    className="form-control"
                                    rows="12"/>
                            </Col>
                            </Row>
                            <Button type="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                    
                </Modal>
            </div>
        )
    }
}


function RenderCampsite({campsite}){
        return(
            <div className="col-md-5 m-1">
                <Card>
                    <CardImg top src={campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
function RenderComments({comments, addComment, campsiteId}){
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
                    <CommentForm camsiteId={campsiteId} addComment={addComment} />
                </div>
            )
        }  return <div/>; 
    }
    function CampsiteInfo(props) {
        if (props.campsite) {
            return (
                <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} addComment={props.addComment} campsiteId={props.campsite.id} />
                </div>
            </div>
            )
        }
        return <div />;
    }

export default CampsiteInfo;