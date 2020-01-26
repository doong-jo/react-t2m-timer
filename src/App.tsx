import React from 'react';
import { ThemeProvider } from 'styled-components';

import 'App.css';
import GlobalStyles from './commons/style/globalstyle';
import defaultTheme from 'commons/style/themes/default';
import { Header, Footer, Timer } from 'components';

const App: React.FC = () => (
  <ThemeProvider theme={defaultTheme}>
    <GlobalStyles />
    <Header />
    <main>
      <Timer />
    </main>
    <Footer />
  </ThemeProvider>
);

export default App;
