import './App.css';
import { useState } from "react";
import data from './mockData/data.json';
import IncidentForm from './components/form/IncidentForm';
import IncidentList from './components/incidentList/IncidentList';

const App = () => {
  const [incidents, setIncidents] = useState(data);
  const [filters, setFilters] = useState("all");
  const [sortOrder, setSortOrder] = useState("new");
  const [toggle, setToggle] = useState('form');

  const addIncident = (newIncident) => {
    setIncidents([...incidents, newIncident]);
  };

  const filteredIncidents = incidents.filter((incident) => {
    if (filters === "all") return true;

    return incident.severity.toLowerCase() === filters.toLowerCase();
  });

  const sortedIncidents = filteredIncidents.sort((a, b) => {
    if (sortOrder === "new") {
      return new Date(b.reported_at) - new Date(a.reported_at);
    }

    return new Date(a.reported_at) - new Date(b.reported_at);
  });

  return (
    <>
      <h1 className="title">AI Safety Incident Dashboard</h1>

      <div className="toggleButtonContainer">
        <button
          className={`toggleButton ${toggle === 'form' ? 'active' : ''}`}
          onClick={() => setToggle('form')}
        >
          Add Incident
        </button>
        <button
          className={`toggleButton ${toggle === 'list' ? 'active' : ''}`}
          onClick={() => setToggle('list')}
        >
          View Incidents
        </button>
      </div>

      {toggle === 'form' ? (
        <IncidentForm addIncident={addIncident} setToggle={setToggle} />
      ) : (
        <>
          <div className="filterContainer">
            <select onChange={(event) => {
              setFilters(event.target.value);
            }}>
              <option value="all">All</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select onChange={(event) => {
              setSortOrder(event.target.value);
            }}>
              <option value="new">Newest First</option>
              <option value="old">Oldest First</option>
            </select>
          </div>

          <IncidentList incidents={sortedIncidents} />
        </>
      )
      }
    </>
  );
};

export default App;
