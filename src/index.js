import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import store from './redux/store';

// Routes
import appRoutes from './config/app.routes';

// Style - Global
import './styles/styles.scss';

// Components
import News from './components/News/News';


const history = createBrowserHistory();

const App = () => (
  <main className="App l">
    <Switch>
      <Route exact path={appRoutes.INDEX} component={News} />
      <Route path={appRoutes.NEWS_SINGLE_PAGE} component={News} />
    </Switch>
  </main>
);

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  rootElement,
);
