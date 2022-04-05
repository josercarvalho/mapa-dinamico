import React from 'react';
import { useRoutes } from 'hookrouter';

import Home from './Pages/home';
import InfoLocal from './Pages/Local';

function App() {

    const routes = {
        '/': () => <Home />,
        '/info-local/:latlng': ({ latlng }) => <InfoLocal latlng={latlng} />
    };
  
    return useRoutes(routes);
  }
  
  export default App;
  