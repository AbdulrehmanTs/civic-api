import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const { elections, kind } = data;

  const [voterData, setVoterData] = useState();

  const [voterAddress, setVoterAddress] = useState(
    "1263 Pacific Ave. Kansas City, KS"
  );
  const [voterId, setVoterId] = useState(2000);
  const [stateInput, setStateInput] = useState("kansas");
  const [stateData, setStateData] = useState("");
  const [officials, setOfficials] = useState("");

  const getData = async () => {
    await axios
      .get(
        // "https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyCGCE_BQpdH1EhR0RnhJt9xMfIpkJMTmqY"
        "https://civicinfo.googleapis.com/civicinfo/v2/elections?key=AIzaSyCGCE_BQpdH1EhR0RnhJt9xMfIpkJMTmqY"
      )
      .then((result) => {
        setData(result.data);
      });
  };

  const handleFind = async () => {
    await axios
      .get(
        `https://www.googleapis.com/civicinfo/v2/voterinfo?key=AIzaSyCGCE_BQpdH1EhR0RnhJt9xMfIpkJMTmqY&address=${voterAddress}&electionId=${voterId}`
      )
      .then((result) => {
        console.log("voterData:", result);
        setVoterData(result.data.election);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleGetState = async () => {
    await axios
      .get(
        `https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyCGCE_BQpdH1EhR0RnhJt9xMfIpkJMTmqY&address=${stateInput}`
      )
      .then((result) => {
        setStateData(result.data.divisions);
        setOfficials(result.data.officials);
        console.log(result.data.officials);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h1 className="title">Google Civic Information API</h1>
      <h2 className="title_2">Total Elections</h2>
      <div className="cards-container">
        {/* Showing indivisual electins data in cards */}
        {elections &&
          elections.map((item, index) => {
            return (
              <div className="card" key={index}>
                <p>ID: {item.id}</p>
                <h4>{item.name}</h4>
                <p>Election Day: {item.electionDay}</p>
                <p>OCD Division Id: {item.ocdDivisionId}</p>
              </div>
            );
          })}
      </div>

      {/* Voter Input Form */}
      <div className="voter_data_section">
        <h2 className="title">Find Your Polling Info By Address</h2>
        <div>
          <input
            className="address_input"
            value={voterAddress}
            type={"text"}
            placeholder={"Your full Address"}
            onChange={(e) => setVoterAddress(e.target.value)}
          />
          <input
            className="id_input"
            value={voterId}
            type={"text"}
            placeholder={"Id in Numbers"}
            onChange={(e) => setVoterId(e.target.value)}
          />
        </div>
        <div className="find_btn">
          <button onClick={handleFind}>Find</button>
        </div>
      </div>

      {/* Voter Information */}
      {voterData && (
        <div className="userInfo">
          <div>
            <h3>Your Polling Information is: </h3>
            <p>
              <strong>Id: </strong>
              {voterData.id}
            </p>
            <p>
              <strong>Name:</strong> {voterData.name}
            </p>
            <p>
              <strong>Election Day:</strong> {voterData.electionDay}
            </p>
          </div>
        </div>
      )}

      <div className="findBy_state_section">
        <h2 className="title">Discover Representatives in each state</h2>
        <div className="options-container">
          <select
            className="state_select"
            value={stateInput}
            onChange={(e) => {
              setStateInput(e.target.value);
            }}
          >
            <option value={"kansas"} label="kansas">
              Kansas
            </option>
            <option value={"ohio"} label="ohio">
              Ohio
            </option>
            <option value={"colorado"} label="colorado">
              Colorado
            </option>
            <option value={"utah"} label="utah">
              utah
            </option>
            <option value={"virginia"} label="virginia">
              Virginia
            </option>
            <option value={"florida"} label="florida">
              florida
            </option>
          </select>

          <button className="state-btn" type="button" onClick={handleGetState}>
            Find
          </button>
        </div>

        <div className="officials">
          {officials && <h3 className="title_2">Representatives.</h3>}
          <ol style={{ fontSize: "16px", fontWeight: "bold" }}>
            <li>Index.</li>
            <li>Name</li>
            <li>Party</li>
          </ol>
          {officials &&
            officials.map((official, index) => {
              return (
                <ol key={index}>
                  <li>{index + 1}</li>
                  <li>{official.name}</li>
                  <li>{official.party}</li>
                </ol>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
