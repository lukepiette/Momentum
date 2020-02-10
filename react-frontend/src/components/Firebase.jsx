import firebase from '../Firebase';
import React, { Component } from 'react';

class FireTest extends Component{

    constructor() {
        super();
        this.state = {
            speed:10
        };
    }

    componentDidMount() {
        const rootRef = firebase.database().ref().child('root');
        const speedRef = rootRef.child('speed');
        speedRef.on('value', snap => {
            this.setState({
                speed: snap.val()
            });
        });
    }

    render() {
        return(
            <h1>{this.state.speed}</h1>
        );
    }
}

export default FireTest
