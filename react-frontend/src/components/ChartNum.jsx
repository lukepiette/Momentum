import React, { Component } from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';


class ChartClass extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:{
                labels: this.props.Labels,
                legendPosition:'right',
                datasets: 
                [{
                    data: this.props.Data,
                    label: this.props.Title,
                    backgroundColor: ['rgba(255, 0, 0, 0.6)']
                }]
            }
        }
    }

    static defaultProps = {
        Width:30,
        Height:40,
        Labels:[],
        Data:[],
        Title:'',
        Type:'',
    }

    render(){
        if (this.props.Type == 'line'){
            return(
                <Line
                data={this.state.data}
                width={parseInt(this.props.Width)}
                height={parseInt(this.props.Height)}
                options={{ maintainAspectRatio: false }}
                />
            );
        }
        else if (this.props.Type == 'bar'){
            return(
                <Bar
                data={this.state.data}
                width={parseInt(this.props.Width)}
                height={parseInt(this.props.Height)}
                options={{ maintainAspectRatio: false }}
                />
            );
        }
    }
}


export default ChartClass;
