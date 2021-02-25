import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CetakNota from './screens/CetakNota/CetakNota';
import CetakRekapan from './screens/CetakRekapan/CetakRekapan';
import LoginScreen from './screens/LoginScreen/LoginScreen';

const App = () => {
  return (
    <Router>
      <Container>
        <Route path='/' component={LoginScreen} exact />
        {/* <CetakNota /> */}
        {/* <CetakRekapan /> */}
      </Container>
    </Router>
  );
};

export default App;
