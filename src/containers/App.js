import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList ';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll.js';
import './App.css';

import { setSearchField , requestRobots } from '../actions';

const mapStateProps = state => {
    return{
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
           }
}

class App extends Component{
    componentDidMount(){
        this.props.onRequestRobots()
    }
        
    render(){
        const { searchField,onSearchChange,robots,isPending } =this.props;
        const filterRobots= robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return isPending ?
        <h1>Loading</h1> :
    (
            <div className='tc'>
                <h1 className='f2'>RoboFriends</h1>
                <Searchbox SearchChange={onSearchChange}/>
                <Scroll>
                    <CardList robots={filterRobots}/>
                </Scroll> 
            </div>
        );
    }    
    } 

export default connect(mapStateProps,mapDispatchToProps)(App);
