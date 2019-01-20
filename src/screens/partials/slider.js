import React,{Component} from 'react'
import {withRouter} from 'react-router-dom';
import InputRange from 'react-input-range';

import  '../../css/slider.css';



class Slider extends Component {

	state = {
        value: { min: 50000, max: 90000 },
        values:50000,
    }

	render(){
        const { max, min, currentState, changeState, ...props} = this.props;
		return (

		<div style={{paddingTop:'50px',paddingBottom:'80px'}}>
            <InputRange
                maxValue= {max}
                minValue= {min}
                draggableTrack= {true}
                formatLabel={value => `Rs. ${value}`}
                value= {currentState}
                onChange={value => changeState(value)}
                {...props} />
        </div>

)
}
}

export default withRouter(Slider)

