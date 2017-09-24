import React from 'react'
import { Component, PropTypes } from 'react'
import Header from './Header'

export default class MainLayout extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="container">
                <Header />
                {this.props.children}
            </div>
        )
    }
}

MainLayout.propTypos ={
    children: PropTypes.element.isRequired
}