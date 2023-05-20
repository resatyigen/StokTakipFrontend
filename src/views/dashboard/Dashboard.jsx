import React from 'react'
import './dashboard.css';
import Header from '../../components/header/Header'
import Sidebar from '../../components/sidebar/Sidebar'
import '../../App.css'
import '../../assets/css/index.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
    </div>
  );
}

export default App;