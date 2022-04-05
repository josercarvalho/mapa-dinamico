import React from 'react';
import { useRoutes } from 'hookrouter';

import Home from './Pages/home';
import InfoLocal from './Pages/Local';
import Bairros from './Pages/Bairros';

function App() {

    const routes = {
        '/': () => <Home />,
        '/info-local/:latlng': ({ latlng }) => <InfoLocal latlng={latlng} />,
        '/bairros/:bairro': ({ bairro }) => <Bairros bairro={bairro} />
    };
  
    return useRoutes(routes);
  }
  
  export default App;
  