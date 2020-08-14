import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { menuItems } from './components/menuItemsStorage';

import './App.css';
import Header from './components/header/Header';
import Resource from './components/resource/Resource';
import Menu from './components/Menu';
import Login from './components/Login';
import Map from './components/Map';
import Log from './components/Log';

function App() {
  const kingdomName = 'Dummy';

  return (
    <div className="App">
      <Header kingdomName={kingdomName} />
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/kingdom/map">
            <Map />
          </Route>
          <Route path="/kingdom">
            <Menu menuItems={menuItems} />
            {menuItems.map(menuItem => (
              <Route
                key={menuItem.link}
                path={'/fandom' + menuItem.link}
                render={() => <menuItem.component name={menuItem.name} />}
              />
            ))}
            <Log />
            <Resource />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
