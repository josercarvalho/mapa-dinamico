import React, { Component } from 'react';
import { useRoutes } from 'hookrouter';

import Home from './Pages/home'

export default class Routes extends Component {
    render() {
        const routes = {
            '/': () => <Home />,
            // '/info-local/:latlng': ({latlng}) => <InfoLocal latlng={latlng} />
        };
      
        return useRoutes(routes);
    }
}
