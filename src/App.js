import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import the CSS file for styling
import imageSrc from './crashimage.avif';
import TupleCount from './GetTupleCount';

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

// Buttons Page
const ButtonsPage = () => {
  return (
    <div className="page">
      <div className="top-left">
        <TupleCount />
      <nav>
        <Link to="/">
          <button>Back</button>
        </Link>
      </nav>
      </div>
      <h1>Query Selector</h1>
      <nav>
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
          <button className="button4">Analysis of Crash Frequenct Relative to Geographic Landmarks</button>
        </Link>
        <Link to="/page5">
          <button className="button5">Yearly Changes in Crash Hotspots</button>
        </Link>
      </nav>
      <img src={imageSrc} alt="Description of the image" />
    </div>
  );
};

// Additional Pages
const Page1 = () => {
  return (
    <div className="page"><h1>Crash Frequency by Borough with Seasonal Breakdown</h1>
    <div className="top-left">
      <nav>
        <Link to="/buttons">
          <button>Back</button>
        </Link>
      </nav>
      </div>
    <p> Description:  This query will provide insights into how crash frequencies in different boroughs change over time and across different seasons. It caters to a wide range of interests, such as city planners looking to improve road safety. Seasonal analysis can reveal whether certain times of the year lead to higher crash rates, possibly due to weather, traffic, or other seasonal factors. These trends could help understand seasonal needs such as increased traffic enforcement or road maintenance to reduce crash rates.</p>
    </div>
  );
};
const Page2 = () => {
  return (
    <div className="page"><h1>Comparative Analysis of Crash Times Throughout the Day</h1>
    <div className="top-left">
      <nav>
        <Link to="/buttons">
          <button>Back</button>
        </Link>
      </nav>
      </div>
      <p>Description: Knowing the hours of increased crashes can help manage traffic safety efforts. By identifying peak crash hours, administrations can change traffic signals, speed limits, and increase awareness during those times. This query not only helps with safety improvements but also contributes to long-term planning and design to make safer roads.</p>
    </div>
  );
};
const Page3 = () => {
  return (
    <div className="page"><h1>Impact of Special Events on Crash Rates</h1>
    <div className="top-left">
      <nav>
        <Link to="/buttons">
          <button>Back</button>
        </Link>
      </nav>
      </div>
      <p>Description: Big events will often lead to increased traffic, which in turn will increase the risk of crashes. By examining crash rates around these events, this query will help event planners, and city administration better prepare for similar future events. They may opt for improved traffic management or more public transportation options to decrease traffic volume. This approach could lessen the risks of large gatherings and promote safety.</p>
    </div>
  );
};
const Page4 = () => {
  return (
    <div className="page"><h1>Analysis of Crash Frequenct Relative to Geographic Landmarks</h1>
    <div className="top-left">
      <nav>
        <Link to="/buttons">
          <button>Back</button>
        </Link>
      </nav>
      </div>
      <p>Description: This query will help uncover patterns in crashes that may be influenced by traffic associated with landmarks or infrastructure. For example, areas surrounding schools and hospitals might see higher crash rates at certain hours due to increased vehicle and pedestrian traffic. Similarly, infrastructure like bridges and tunnels might have unique crash patterns due to changing speed limits and merging traffic. By allowing users to specify distances and time ranges, this query gives them flexibility in what type of crash patterns they can analyze. This will give insights to help administrations and planners better manage traffic patterns in certain areas prone to greater crash rates.</p>
    </div>
  );
};
const Page5 = () => {
  return (
    <div className="page"><h1>Yearly Changes in Crash Hotspots</h1>
    <div className="top-left">
      <nav>
        <Link to="/buttons">
          <button>Back</button>
        </Link>
      </nav>
      </div>
      <p>Description: Finding the locations of crash hotspots will provide insights for safety initiatives and infrastructure. Analyzing yearly data will allow users to identify areas that are consistently at risk of crashes. This can help in the creation of effective safety measures and improvements. Flexible hotspot criteria allows users to target their analysis and investigate trends based on their requirements.</p>
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
