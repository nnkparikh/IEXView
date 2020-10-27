import React from 'react';
import IEXHeader from './components/iex-header';
import IEXContent from './components/iex-content';
import './css/styles.css';

function App() {
  return (
    <div className="App">
        <IEXHeader />
        <IEXContent />
    </div>
  );
}

export default App;
