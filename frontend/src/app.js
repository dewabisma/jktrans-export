import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CetakNota from './screens/CetakNota/CetakNota';
import CetakRekapan from './screens/CetakRekapan/CetakRekapan';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';

const App = () => {
  return (
    <Router>
      <Route path='/' component={LoginScreen} exact />
      <Route path='/dashboard' component={DashboardScreen} exact />
      <Route path='/nota/:notaId/cetak' component={CetakNota} exact />
      <Route path='/rekapan/:rekapanId/cetak' component={CetakRekapan} exact />
    </Router>
  );
};

export default App;
