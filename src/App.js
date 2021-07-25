import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState(allData);

  useEffect(() => {
    axios("./data.json")
      .then((response) => {
        console.log(response.data);
        setAllData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = allData.filter((data) => {
      return data.keywords.search(value) !== -1;
    });
    setFilteredData(result);
  };

  return (
    <div className="App">
      <header className="header">
        <p className="attribution">
          Built By{" "}
          <a
            href="https://www.darian.digital"
            target="_blank"
            alt="Darian Nocera"
            rel="noreferrer">
            darian.
          </a>
        </p>
        <h1 className="title">Can I Recyle...</h1>
        <input
          type="text"
          placeholder="milk jugs, egg cartons, etc."
          className="search"
          autoFocus
          onChange={(event) => handleSearch(event)}
        />
      </header>

      <section className="container">
        {filteredData.map((value, index) => {
          return (
            <div className="cards">
              <div className="card" key="value.name">
                <h3 className="category">{value.category}</h3>

                <h2 className="item-name">{value.name}</h2>
                <div className="recyclable">
                  {value.recyclable === "yes" ? (
                    <p className="recyclable-text">
                      <span className="positive">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <span className="margin"> {value.recyclable}</span>
                      </span>
                    </p>
                  ) : (
                    <p className="recyclable-text">
                      <span className="negative">
                        <FontAwesomeIcon icon={faTimesCircle} />
                        <span className="margin">{value.recyclable}</span>
                      </span>
                    </p>
                  )}
                </div>

                {value.details ? (
                  <div className="details">
                    <p className="details-text">{value.details}</p>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
export default App;
