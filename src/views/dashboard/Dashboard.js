import React from 'react';
import Panel from '../../components/Panel/Panel';
import RacoonPNG from "../../assets/img/racoon.png";
import LogoPNG from "../../assets/img/logo.png";



function Dashboard() {
  return (
    <Panel>
      <div className='flex flex-col items-center justify-center'>
        <img src={RacoonPNG} />
        <img src={LogoPNG} className='mt-5 w-[150px]' />
      </div>
    </Panel>
  );
}

export default Dashboard;