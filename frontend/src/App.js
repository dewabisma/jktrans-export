import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CetakNota from './screens/CetakNota/CetakNota';
import CetakRekapan from './screens/CetakRekapan/CetakRekapan';
import DashboardScreen from './screens/DashboardScreen/DashboardScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import BuatNota from './screens/BuatNota/BuatNota';
import BuatRekapan from './screens/BuatRekapan/BuatRekapan';
import LihatNota from './screens/LihatNota/LihatNota';
import LihatRekapan from './screens/LihatRekapan/LihatRekapan';
import DetailNota from './screens/DetailNota/DetailNota';
import DetailRekapan from './screens/DetailRekapan/DetailRekapan';
import EditNota from './screens/EditNota/EditNota';
import EditRekapan from './screens/EditRekapan/EditRekapan';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' component={LoginScreen} exact />
        <Route path='/dashboard' component={DashboardScreen} exact />
        <Route path='/nota' component={LihatNota} exact />
        <Route path='/nota/create' component={BuatNota} exact />
        <Route path='/nota/:notaId' component={DetailNota} exact />
        <Route path='/nota/:notaId/edit' component={EditNota} exact />
        <Route path='/nota/:notaId/cetak' component={CetakNota} exact />
        <Route path='/rekapan' component={LihatRekapan} exact />
        <Route path='/rekapan/create' component={BuatRekapan} exact />
        <Route path='/rekapan/:rekapanId' component={DetailRekapan} exact />
        <Route path='/rekapan/:rekapanId/edit' component={EditRekapan} exact />
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
