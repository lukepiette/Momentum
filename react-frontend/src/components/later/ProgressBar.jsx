import React, { Component } from 'react';
import { Steps } from 'antd';
import { Layout, Menu, Breadcrumb, Icon, Button } from 'antd';

const { Step } = Steps;


class ProgressBar extends Component {
    render(){
        return (
            <Steps current={2}>
            <Step title="Sign Up" description="Good start!" />
            <Step title="Create Item" description="Personalize tracking." />
            <Step title="Track Progress" description="Measure productivity." />
            </Steps>);
    }
}

export default ProgressBar
