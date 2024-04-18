import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import './App.css'; // Import the CSS file for styling
import imageSrc from './crashimage.avif';
import TupleCount from './GetTupleCount';
import Chart from 'chart.js/auto';

// Welcome Page
const WelcomePage = () => {
  return (
    <div className="centered">
      <h1>New York Collision Data Analysis<br />Welcome Page</h1>
      <nav>
        <Link to="/info">
          <button>Information Page</button>
        </Link>
        <Link to="/buttons">
          <button>Query Selector</button>
        </Link>
      </nav>
    </div>
  );
};

// Information Page
const InfoPage = () => {
  return (
    <div className="page">
      <div className="top-left">
      <nav>
        <Link to="/">
          <button>Back</button>
        </Link>
      </nav>
      </div>
      <h1>Information Page</h1>
      <p>Team Members: Erik Companhone Andrade de Almeida, Zackary Denson, Matthew Lee, Chris Ramroth, Jonathan Rodrigues</p>
      <p>Project Goal: In short, the goal of the application is to provide extensive, meaningful, and complex queries that can allow users to analyze crash information from New York City in order to draw important and helpful conclusions. The application will analyze crash information in New York to display vehicle accident trends through the use of complex queries. Then, the application will provide data on crashes around New York, so that said data can be analyzed/visualized by the user to determine trends of traffic collisions. Finally, the application can then provide enough information through complex queries for a thorough analysis of the data to be made, leading to conclusions such as areas prone to collisions that need installing extra pedestrian crossings, traffic signals, redesigning, and speed limit adjustments, among others.</p>
    </div>
  );
};

//count page 
const PageCount = () => {
  return (
    <div className="page"><h1>Total Crashes</h1>
    <div className="top-left">
      <nav>
        <Link to="/buttons">
          <button>Back</button>
        </Link>
      </nav>
      </div>
    <p> Description:  This query will provide the number of total crashes in NYC.</p>
    <TupleCount />
    </div>
  );
};

// Buttons Page
const ButtonsPage = () => {
  return (
    <div className="page">
      <div className="top-left">
      <nav>
        <Link to="/">
          <button>Back</button>
        </Link>
      </nav>
      </div>
      <h1>Query Selector</h1>
      <nav>
        <Link to="/pageCount">
        <button className="countbutton">Total Crashes </button>
        </Link>
        <Link to="/page1">
          <button className="button1">Crash Frequency by Borough with Seasonal Breakdown</button>
        </Link>
        <Link to="/page2">
          <button className="button2">Comparative Analysis of Crash Times Throughout the Day</button>
        </Link>
        <Link to="/page3">
          <button className="button3">Impact of Special Events on Crash Rates</button>
        </Link>
        <Link to="/page4">
          <button className="button4">Analysis of Crash Frequent Relative to Geographic Landmarks</button>
        </Link>
        <Link to="/page5">
          <button className="button5">Yearly Changes in Crash Hotspots</button>
        </Link>
      </nav>
      <img src={imageSrc} alt="Description of the image" />
    </div>
  );
};

let myChart1;
// Additional Pages
const Page1 = () => {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [selectedBorough, setSelectedBorough] = useState("");
  const [data, setData] = useState([]);

  const handleGoButtonClick = () => {
    console.log("Attempting post request");
    axios.post('http://localhost:5000/query1', {
      date1: date1,
      date2: date2,
      selectedBorough: selectedBorough
    })
    .then(response => {
      console.log("got response");
      updateChart(response.data);
      setData(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  // Function to update the chart
  const updateChart = (data) => {
    if(!myChart1)
    {
      const ctx = document.getElementById('myChart1');
      myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(entry => "Month " + entry.MONTH),
          datasets: [{
            label: 'Number of Crashes',
            data: data.map(entry => entry.NUMBEROFCRASHES),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    else
    {
      myChart1.data.labels = data.map(entry => "Month " + entry.MONTH);
      myChart1.data.datasets[0].data = data.map(entry => entry.NUMBEROFCRASHES);
      myChart1.update();
    }
  };

  return (
    <div className="page">
      <h1>Crash Frequency by Borough with Seasonal Breakdown</h1>
      <div className="top-left">
        <nav>
          <Link to="/buttons">
            <button>Back</button>
          </Link>
        </nav>
      </div>
      <p>Description: This query will provide insights into how crash frequencies in different boroughs change over time and across different seasons.</p>
      
      <input id="date1" type="text" name="inputbox" placeholder="Start Date: YYYY-MM--DD" value={date1} onChange={(e) => setDate1(e.target.value)} />
      
      <input id="date2" type="text" name="inputbox" placeholder="End Date: YYYY-MM--DD" value={date2} onChange={(e) => setDate2(e.target.value)} />
      
      <select name="borough" id="borough-select" value={selectedBorough} onChange={(e) => setSelectedBorough(e.target.value)}>
        <option value={0}>Borough</option>
        <option value={4}>Bronx</option>
        <option value={2}>Brooklyn</option>
        <option value={1}>Manhattan</option>
        <option value={3}>Queens</option>
        <option value={5}>Staten Island</option>
      </select>
      
      <button onClick={handleGoButtonClick}>Go</button>
      
      <div>
        <canvas id="myChart1"></canvas>
      </div>
    </div>
  );
};

const Page2 = () => {
  const [hour1, setHour1] = useState("");
  const [hour2, setHour2] = useState("");
  const [selectedBorough, setSelectedBorough] = useState("");
  const [data, setData] = useState([]);

  const handleGoButtonClick = () => {
    console.log("Attempting post request");
    axios.post('http://localhost:5000/query2', {
      hour1: hour1,
      hour2: hour2,
      selectedBorough: selectedBorough
    })
    .then(response => {
      console.log("got response");
      setData(response.data); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="page">
      <h1>Comparative Analysis of Crash Times Throughout the Day</h1>
      <div className="top-left">
        <nav>
          <Link to="/buttons">
            <button>Back</button>
          </Link>
        </nav>
      </div>
      <p>Description: Knowing the hours of increased crashes can help manage traffic safety efforts. By identifying peak crash hours, administrations can change traffic signals, speed limits, and increase awareness during those times. This query not only helps with safety improvements but also contributes to long-term planning and design to make safer roads.</p>
      
      <input id="hour1" type="text" name="inputbox" placeholder="Start Hour: 0-23" value={hour1} onChange={(e) => setHour1(e.target.value)} />
      
      <input id="hour2" type="text" name="inputbox" placeholder="End Hour: 0-23" value={hour2} onChange={(e) => setHour2(e.target.value)} />
      
      <select name="borough" id="borough-select" value={selectedBorough} onChange={(e) => setSelectedBorough(e.target.value)}>
        <option value={0}>Borough</option>
        <option value={4}>Bronx</option>
        <option value={2}>Brooklyn</option>
        <option value={1}>Manhattan</option>
        <option value={3}>Queens</option>
        <option value={5}>Staten Island</option>
      </select>
      
      <button onClick={handleGoButtonClick}>Go</button>
      
      <div>
        {data.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Borough</th>
                <th>Hour</th>
                <th>Number of Crashes</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.BOROUGHNAME}</td>
                  <td>{entry.HOUR}</td>
                  <td>{entry.NUMBEROFCRASHES}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No crashes!</p>
        )}
      </div>
    </div>
  );
};

let myChart2;

const Page3 = () => {
  const [year, setYear] = useState("");
  const [event, setEvent] = useState("");
  const [selectedBorough, setSelectedBorough] = useState("");
  const [data, setData] = useState([]);

  const handleGoButtonClick = () => {
    console.log("Attempting post request");
    axios.post('http://localhost:5000/query3', {
        year: year,
        event: event,
        selectedBorough: selectedBorough
    })
    .then(response => {
      console.log("got response");
      updateChart(response.data);
      setData(response.data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  // Function to update the chart
  const updateChart = (data) => {
    if(!myChart2)
    {
      const ctx = document.getElementById('myChart2');
      myChart2 = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(entry => "Hour " + entry.HOUR),
          datasets: [{
            label: 'Number of Crashes',
            data: data.map(entry => entry.NUMBEROFCRASHES),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    else
    {
      myChart2.data.labels = data.map(entry => "Hour " + entry.HOUR);
      myChart2.data.datasets[0].data = data.map(entry => entry.NUMBEROFCRASHES);
      myChart2.update();
    }
  };

  return (
    <div className="page">
      <h1>Impact of Special Events on Crash Rates</h1>
      <div className="top-left">
        <nav>
          <Link to="/buttons">
            <button>Back</button>
          </Link>
        </nav>
      </div>
      <p>Description: Big events will often lead to increased traffic, which in turn will increase the risk of crashes. By examining crash rates around these events, this query will help event planners, and city administration better prepare for similar future events. They may opt for improved traffic management or more public transportation options to decrease traffic volume. This approach could lessen the risks of large gatherings and promote safety.</p>
      
      <input id="year" type="text" name="inputbox" placeholder="Year: YYYY" value={year} onChange={(e) => setYear(e.target.value)} />
      
      <select name="event" id="event-select" value={event} onChange={(e) => setEvent(e.target.value)}>
        <option value={0}>Christmas</option>
        <option value={4}>New Year's Eve</option>
        <option value={2}>Halloween</option>
        <option value={1}>New Year's Day</option>
        <option value={3}>Independence Day</option>
        <option value={5}>Veteran's Day</option>
      </select>      
      
      <select name="borough" id="borough-select" value={selectedBorough} onChange={(e) => setSelectedBorough(e.target.value)}>
        <option value={0}>Borough</option>
        <option value={4}>Bronx</option>
        <option value={2}>Brooklyn</option>
        <option value={1}>Manhattan</option>
        <option value={3}>Queens</option>
        <option value={5}>Staten Island</option>
      </select>
      
      <button onClick={handleGoButtonClick}>Go</button>
      
      <div>
        <canvas id="myChart2"></canvas>
      </div>
    </div>
  );
};

let myChart3;

const Page4 = () => {
  const [selectedBorough, setSelectedBorough] = useState("");
  const [location, setLocation] = useState("");
  const [data, setData] = useState([]);

  const handleGoButtonClick = () => {
    axios.post('http://localhost:5000/query4', {
      selectedBorough: selectedBorough,
      location: location
    })
    .then(response => {
      console.log("got response");
      updateChart(response.data);
      setData(response.data); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  // Function to update the chart
  const updateChart = (data) => {
    if(!myChart3)
    {
      const ctx = document.getElementById('myChart3');
      myChart3 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(entry => entry.KM_RANGE),
          datasets: [{
            label: 'Number of Crashes',
            data: data.map(entry => entry.NUMBEROFCRASHES),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    else
    {
      myChart3.data.labels = data.map(entry => entry.KM_RANGE + "km");
      myChart3.data.datasets[0].data = data.map(entry => entry.NUMBEROFCRASHES);
      myChart3.update();
    }
  };

  return (
    <div className="page">
      <h1>Analysis of Crash Frequency Relative to Geographic Landmarks</h1>
      <div className="top-left">
        <nav>
          <Link to="/buttons">
            <button>Back</button>
          </Link>
        </nav>
      </div>
      <p>Description: This query will help uncover patterns in crashes that may be influenced by traffic associated with landmarks or infrastructure. For example, areas surrounding schools, famous landmarks, and hospitals might see higher crash rates due to increased vehicle and pedestrian traffic. Similarly, infrastructure like bridges and tunnels might have unique crash patterns due to changing speed limits and merging traffic. By allowing users to specify boroughs, this query gives them flexibility in the crash patterns they can analyze. This will give insights to help administrations and planners better manage traffic patterns in certain areas prone to greater crash rates.</p>
      
      <select name="borough" id="borough-select" value={selectedBorough} onChange={(e) => setSelectedBorough(e.target.value)}>
        <option value={0}>Borough</option>
        <option value={4}>Bronx</option>
        <option value={2}>Brooklyn</option>
        <option value={1}>Manhattan</option>
        <option value={3}>Queens</option>
        <option value={5}>Staten Island</option>
      </select>
      
      <select name="Location" id="landmark-select" value={location} onChange={(e) => setLocation(e.target.value)}>
        <option value={0}>Landmark</option>
        <option value={71717}>Empire State Building</option>
        <option value={71718}>Central Park</option>
        <option value={71719}>One World Trade Center</option>
        <option value={71720}>Chrysler Building</option>
      </select>  

      <button onClick={handleGoButtonClick}>Go</button>
      
      <div>
        <canvas id="myChart3"></canvas>
      </div>
    </div>
  );
};

let myChart4;

const Page5 = () => {
  const [year1, setYear1] = useState("");
  const [year2, setYear2] = useState("");
  const [selectedBorough, setSelectedBorough] = useState("");
  const [data, setData] = useState([]);

  const handleGoButtonClick = () => {
    console.log("Attempting post request");
    axios.post('http://localhost:5000/query5', {
      year1: year1,
      year2: year2,
      selectedBorough: selectedBorough
    })
    .then(response => {
      console.log("got response");
      updateChart(response.data);
      setData(response.data); 
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  // Function to update the chart
  const updateChart = (data) => {
    if(!myChart4)
    {
      const ctx = document.getElementById('myChart4');
      myChart4 = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(entry => entry.YEAR),
          datasets: [{
            label: 'Number of Collisions',
            data: data.map(entry => entry.MAX2),
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
    else
    {
      myChart4.data.labels = data.map(entry => entry.YEAR);
      myChart4.data.datasets[0].data = data.map(entry => entry.MAX2);
      myChart4.update();
    }
  };

  return (
    <div className="page">
      <h1>Yearly Changes in Crash Hotspots</h1>
      <div className="top-left">
        <nav>
          <Link to="/buttons">
            <button>Back</button>
          </Link>
        </nav>
      </div>
      <p>Description: Finding the locations of crash hotspots will provide insights for safety initiatives and infrastructure. Analyzing yearly data will allow users to identify areas that are consistently at risk of crashes. This can help in the creation of effective safety measures and improvements. Flexible hotspot criteria allows users to target their analysis and investigate trends based on their requirements.</p>
      
      <input id="year1" type="text" name="inputbox" placeholder="Start Year: YYYY" value={year1} onChange={(e) => setYear1(e.target.value)} />
      
      <input id="year2" type="text" name="inputbox" placeholder="End Year: YYYY" value={year2} onChange={(e) => setYear2(e.target.value)} />
      
      <select name="borough" id="borough-select" value={selectedBorough} onChange={(e) => setSelectedBorough(e.target.value)}>
        <option value={0}>Borough</option>
        <option value={4}>Bronx</option>
        <option value={2}>Brooklyn</option>
        <option value={1}>Manhattan</option>
        <option value={3}>Queens</option>
        <option value={5}>Staten Island</option>
      </select>
     
      <button onClick={handleGoButtonClick}>Go</button>
      
      <div>
        <canvas id="myChart4"></canvas>
      </div>
    </div>
  );
};

// App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/buttons" element={<ButtonsPage />} />
        <Route path="/pageCount" element={<PageCount />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/page4" element={<Page4 />} />
        <Route path="/page5" element={<Page5 />} />
      </Routes>
    </Router>
  );
};

export default App;
