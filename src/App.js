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
      return data.keywords.search(value) != -1;
    });
    setFilteredData(result);
  };

  return (
    <div className="App">
      <header class="header">
        <h1 class="title">Can I Recyle It</h1>
        <input
          type="text"
          placeholder="Search"
          class="search"
          onChange={(event) => handleSearch(event)}
        />
      </header>

      <section class="container">
        {filteredData.map((value, index) => {
          return (
            <div class="cards">
              <div class="card" key="value.name">
                <div class="category">
                  <h3>{value.category}</h3>
                </div>
                <h2 class="item-name">{value.name}</h2>
                <div class="recyclable">
                  {value.recyclable === "yes" ? (
                    <p class="recyclable-text">
                      <span class="positive">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <span class="margin"> {value.recyclable}</span>
                      </span>
                    </p>
                  ) : (
                    <p class="recyclable-text">
                      <span class="negative">
                        <FontAwesomeIcon icon={faTimesCircle} />
                        <span class="margin">{value.recyclable}</span>
                      </span>
                    </p>
                  )}
                </div>

                {value.details ? (
                  <div class="details">
                    <p class="details-text">
                      <span class="label">Details: </span>
                      {value.details}
                    </p>
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
