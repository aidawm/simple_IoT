import React, { useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import HubSummary from './components/HubSummary';

export type Hub = {
  hub_id: string
};

function App() {
  const [hubs, setHubs] = useState<Hub[] | null>(null);
  useEffect(() => {
    const url = "http://localhost:8000/hub_list"
    axios.get(url).then((response) => {setHubs(response.data);});
  }, []);
  return <div className="App">
      {
        hubs ? 
        hubs.map((hub) => {
         return <HubSummary hub={hub} />;
        }) : null
      }</div>;  

}

export default App;
