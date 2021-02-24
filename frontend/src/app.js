import React from 'react';
import { Container } from 'react-bootstrap';

import CetakNota from './screens/CetakNota/CetakNota';
import CetakRekapan from './screens/CetakRekapan/CetakRekapan';

const App = () => {
  return (
    <Container>
      <CetakNota />
      {/* <CetakRekapan /> */}
    </Container>
  );
};

export default App;
