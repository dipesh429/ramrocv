import React, {Component} from 'react';
import Wrapper from './partials/wrapper';
import {Box} from 'reactjs-admin-lte'

export default class Dashboard extends Component{

    render(){
        return (
            <Wrapper heading="Dashboard">
            	<Box>
					<Box.Header>
					    <Box.Title></Box.Title>
					</Box.Header>
					<Box.Body>

					</Box.Body>
					<Box.Footer>
					
					</Box.Footer>
	            </Box>
            </Wrapper>
        );
    }
}

