import React from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Home } from './Top'
import Chat from './Chat'
import './App.css'
import NewWindow from 'react-new-window'

const features = {
  menubar: true,
  toolbar: true,
  resizable: true,
}

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
