import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CetakNota from './screens/CetakNota/CetakNota';
import CetakRekapan from './screens/CetakRekapan/CetakRekapan';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import BuatNota from './screens/BuatNota/BuatNota';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={LoginScreen} exact />
        <Route path='/dashboard' component={DashboardScreen} exact />
        <Route path='/nota/create' component={BuatNota} exact />
        <Route path='/nota/:notaId/cetak' component={CetakNota} exact />
        <Route
          path='/rekapan/:rekapanId/cetak'
          component={CetakRekapan}
          exact
        />
      </Switch>
    </Router>
  );
};

export default App;
