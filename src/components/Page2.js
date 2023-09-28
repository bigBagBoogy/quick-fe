// src/components/Page2.js
import React, { useState } from "react";
import styles from "./Page2.module.css";

function Page2() {
  const [backendResponse, setBackendResponse] = useState(""); // 1
  const [backendResponseDB, setBackendResponseDB] = useState(""); // 2
  const [databaseData, setDatabaseData] = useState([]); // 3
  const [userInput, setUserInput] = useState(""); // 2a State variable for user input

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
      name: userInput, // Use the user's input
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

  // 3 fetch data from the database
  const loadDatabaseData = () => {
    const backendDBUrl = "http://localhost:3000/api/dbItems";

    fetch(backendDBUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          // Check if data is an array
          setDatabaseData(data);
        } else {
          setDatabaseData([]); // Set it to an empty array or handle the error
        }
      })
      .catch((error) => {
        console.error("There was a problem with the network request:", error);
        setDatabaseData("Error loading data from the database."); // Provide a user-friendly message
      });
  };

  // 4
  const deleteItemFromBackendDatabase = (itemId) => {
    // Send a DELETE request to your server to delete the item
    fetch(`http://localhost:3000/api/dbItems/${itemId}`, {
      method: "DELETE",
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
          console.log(data.message);
        } else {
          console.log("Item deleted:", data);
        }
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <div className={styles.page2}>
      <h1 style={{ color: "white" }}>Page 2</h1>

      <button onClick={connectToBackend}>Connect to Backend</button>
      {backendResponse && <h1>{backendResponse}</h1>}
      <h2 style={{ color: "white" }}>Database Data</h2>
      <ul>
        {databaseData.map((item) => (
          <li key={item._id}>
            {item.name}
            <button onClick={() => deleteItemFromBackendDatabase(item._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Enter data"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)} // Update user input state
      />
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
