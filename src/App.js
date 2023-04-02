import React, { useEffect, useState } from "react"
import './App.css';
import { getRouteData } from "./getRouteData";

const App = () => {

  const [routeData, setRouteData] = useState()
  const [timeLeft, setTimeLeft] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      const response = await getRouteData([13225, 15669])
      setRouteData(response)
    }

    if (timeLeft === 0) {
      fetchData();
      setTimeLeft(15);
      console.log("Data Refreshed. Refreshing Data again in 15 seconds.");
    }
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);


  const renderTimes = (busObject) => {
    if (busObject?.error){
      return "Bus Times Not Available"
    }
    const arr = busObject?.values.map((element) => element.minutes ).join(', ')
    return <span>{`${arr} min`}</span>
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h2>6 Haight/Parnassus</h2>
        <div style={{marginTop: 20}}>
          <div>
            Inbound - 9th Ave & Noriega St
            <div>{routeData ? renderTimes(routeData[0]): "loading..."}</div>
          </div>
        </div>
        <div style={{marginTop: 60}}>
          <div>
            Outbound - Market St & Drumm St
            <div>{routeData ? renderTimes(routeData[1]): "loading..."}</div>
          </div>
        </div>
        <div style={{fontSize: 14, marginTop: 100}}>{`Refreshing data in ${timeLeft} seconds`}</div>
      </header>
    </div>
  );
}

export default App;
