import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import HubSummary from './components/HubSummary';
import internal from 'stream';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip, 
  Legend,
} from 'chart.js';

import {Line} from 'react-chartjs-2';

import type {ChartData, ChartOptions} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export type Hub = {
  hub_id: string
};

export type HubInfo = {
  id: number,
  hub_id: string,
  tempreture: number,
  humidity: number,
  timestamp: string
};


function App() {
  const [hubs, setHubs] = useState<Hub[] | null>(null);
  const [selectedHub, setSelectedHub] = useState<HubInfo[] | null>(null);
  const [tempData, setTempData] = useState<ChartData<'line'>>();
  const [tempOptions, setTempOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins:{
      legend: {
        position: 'top' as const,
      },
      title:{
        display: true,
        text: 'Chart.js line chart'
      },
    },
  });

  const [humData, setHumData] = useState<ChartData<'line'>>();
  const [humOptions, sethumOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins:{
      legend: {
        position: 'top' as const,
      },
      title:{
        display: true,
        text: 'Chart.js line chart'
      },
    },
  });

  useEffect(() => {
    const url = "http://localhost:8000/hub_list"
    axios.get(url).then((response) => { setHubs(response.data); });
  }, []);

  const handleHubChange = (hubId: string) => {
    const hub_data_url = `http://localhost:8000/hub/${hubId}`;
    axios.get(hub_data_url).then((response) => {
      console.log(response.data); // Display hub details in the console
      // const hubDetail: HubInfo = response.data; // Assuming the API returns an object that matches the HubDetail interface
      setSelectedHub(response.data);
      setTempData({
        labels: response.data.map((h: any) => {return h.timestamp}),
        datasets:[
          {
            label: 'tepreture',
            data: response.data.map((h: any) => {return h.tempreture}),
            borderColor: 'rgb(255,99,132)',
            backgroundColor: 'rgb(255,99,132,0.6)',
          },
        ],
      })

      setHumData({
        labels: response.data.map((h: any) => {return h.timestamp}),
        datasets:[
          {
            label: 'humidity',
            data: response.data.map((h: any) => {return h.humidity}),
            borderColor: 'rgb(53,162,235)',
            backgroundColor: 'rgb(53,162,235,0.6)',
          },
        ],
      })
    });
  };


  return (
    <div className="App">
      <select onChange={(e) => 
        handleHubChange(e.target.value)}
        defaultValue="default">
        <option value="default">Choose an object</option>
        {hubs ? hubs.map((hub) => (
          <option key={hub.hub_id} value={hub.hub_id}>{hub.hub_id}</option>
        )) : null}
      </select>
      {/* {selectedHub && <HubSummary hub={selectedHub} />} */}
      {tempData ? <div style={{width: 600}}
      ><Line options={tempOptions} data={tempData} /></div> : null}
      {humData ? <div style={{width: 600}}
      ><Line options={humOptions} data={humData} /></div> : null}
    </div>
  );

}

export default App;
