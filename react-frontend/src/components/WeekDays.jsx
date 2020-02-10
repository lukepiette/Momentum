import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Select } from 'antd';

class WeekDays extends Component{
    render(){
        return(
            <div>
                <Button style={{marginLeft:"0px",marginRight:"1px"}}>Mon</Button>
                <Button style={{marginLeft:"1px",marginRight:"1px"}}>Tue</Button>
                <Button style={{marginLeft:"1px",marginRight:"1px"}}>Wed</Button>
                <Button style={{marginLeft:"1px",marginRight:"1px"}}>Thu</Button>
                <Button style={{marginLeft:"1px",marginRight:"1px"}}>Fri</Button>
                <Button style={{marginLeft:"1px",marginRight:"1px"}}>Sat</Button>
                <Button style={{marginLeft:"1px",marginRight:"0px"}}>Sun</Button>
            </div>
        )
    }
}

export default WeekDays