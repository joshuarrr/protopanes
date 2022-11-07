import React from "react";
import Panes from './components/Panes'
import './App.css'

function App() {
  return (
    <div className="App dotgrid">
      <header className="protopanes-header">
        <h1 className="logotype text">protopanes</h1>
      </header>
      <main className="main">
        <Panes />
      </main>    
    </div>
  );
}

export default App;


