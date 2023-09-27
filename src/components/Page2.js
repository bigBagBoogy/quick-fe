// src/components/Page2.js
import React, { useState } from "react";

function Page2() {
  const [backendResponse, setBackendResponse] = useState(""); // 1
  const [backendResponseDB, setBackendResponseDB] = useState(""); // 2
  const [databaseData, setDatabaseData] = useState(""); // 3

  // 1
  const connectToBackend = () => {
    // Replace with your actual API endpoint URL
    const backendUrl = "http://localhost:3000/api/connect";

    fetch(backendUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Assuming the response is JSON
      })
      .then((data) => {
        // Handle the data from the backend here
        setBackendResponse(data.message); // Replace with the actual data structure
      })
      .catch((error) => {
        console.error("There was a problem with the network request:", error);
      });
  };

  // 2
  const sendItemToBackendDatabase = () => {
    const newItemData = {
      name: "New Item",
    };
    fetch("http://localhost:3000/api/dbItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItemData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the response from the server
        if (data.message) {
          setBackendResponseDB(data.message);
        } else {
          // Handle the response data or display it as needed
          console.log("Item inserted:", data);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the network request:", error);
        setBackendResponse("Error connecting to the backend."); // Provide a user-friendly message
      });
  };

  // 3
  const loadDatabaseData = () => {
    // Replace with your actual API endpoint URL to fetch data from the database
    const backendDBUrl = "http://localhost:3000/api/dbItems";

    fetch(backendDBUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data from the database here
        setDatabaseData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the network request:", error);
        setDatabaseData("Error loading data from the database."); // Provide a user-friendly message
      });
  };

  return (
    <div>
      <h1>Page 2</h1>
      <button onClick={connectToBackend}>Connect to Backend</button>
      {backendResponse && <h1>{backendResponse}</h1>}
      <button onClick={sendItemToBackendDatabase}>Save to Backend DB</button>
      {backendResponseDB && <h1>{backendResponseDB}</h1>}
      <button onClick={loadDatabaseData}>Load Data from DB</button>
      {typeof databaseData === "string" ? (
        <h2>{databaseData}</h2>
      ) : (
        <pre>{JSON.stringify(databaseData, null, 2)}</pre>
      )}
    </div>
  );
}

export default Page2;
