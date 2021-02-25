import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CetakNota from './screens/CetakNota/CetakNota';
import CetakRekapan from './screens/CetakRekapan/CetakRekapan';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';

const App = () => {
  return (
    <Router>
      <Container id='container'>
        <Route path='/' component={LoginScreen} exact />
        <Route path='/dashboard' component={DashboardScreen} exact />
        <Route path='/nota/:notaId/cetak' component={CetakNota} exact />
        <Route
          path='/rekapan/:rekapanId/cetak'
          component={CetakRekapan}
          exact
        />
      </Container>
    </Router>
  );
};

export default App;
