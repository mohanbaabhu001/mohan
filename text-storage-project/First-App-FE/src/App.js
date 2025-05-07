// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./App.css";

// // Get the API base URL from environment variable or fallback to localhost
// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

// function App() {
//   const [text, setText] = useState("");
//   const [storedTexts, setStoredTexts] = useState([]);

//   // Handle text input change
//   const handleChange = (e) => {
//     setText(e.target.value);
//   };

//   // Submit new text
//   const handleSubmit = async () => {
//     try {
//       await axios.post(`${API_BASE_URL}/store`, { text });
//       setText(""); // Clear input after submitting
//       // handleFetch(); // Fetch updated list after submission
//     } catch (err) {
//       console.error("Error storing text:", err);
//       alert("Error storing text");
//     }
//   };

//   // Fetch stored texts
//   const handleFetch = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/fetch`);
//       setStoredTexts(response.data); // Update stored texts
//     } catch (err) {
//       console.error("Error fetching texts:", err);
//       alert("Error fetching texts");
//     }
//   };

//   // Delete a specific text
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_BASE_URL}/delete/${id}`);
//       handleFetch(); // Re-fetch after deletion
//     } catch (err) {
//       console.error("Error deleting text:", err);
//       alert("Error deleting text");
//     }
//   };

//   // Backup all stored texts
//   const handleBackup = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/backup`);
//       alert(response.data.message); // Show success message
//     } catch (err) {
//       console.error("Error backing up data:", err);
//       alert("Error backing up data");
//     }
//   };

//   // On mount, fetch stored texts
//   useEffect(() => {
//     handleFetch();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Text Storage App</h1>

//       {/* Text Input and Submit Button */}
//       <div className="input-group">
//         <input
//           type="text"
//           value={text}
//           onChange={handleChange}
//           placeholder="Enter text"
//         />
//         <button onClick={handleSubmit} className="submit-button">Submit</button>
//       </div>

//       {/* Fetch Stored Texts Button */}
//       <button onClick={handleFetch} className="fetch-button">Fetch Texts</button>

//       {/* Display Stored Texts */}
//       <div className="texts-list">
//         <h2>Stored Texts</h2>
//         <ul>
//           {storedTexts.map((item) => (
//             <li key={item._id}>
//               {item.text}
//               <button onClick={() => handleDelete(item._id)} className="delete-button">Delete</button>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Backup Button */}
//       <button onClick={handleBackup} className="backup-button">Backup</button>
//     </div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Get the API base URL from environment variable or fallback to localhost
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

function App() {
  const [text, setText] = useState("");
  const [storedTexts, setStoredTexts] = useState([]);

  // Handle text input change
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Submit new text
  const handleSubmit = async () => {
    try {
      await axios.post(`${API_BASE_URL}/store`, { text });
      setText(""); // Clear input after submitting
      // handleFetch(); // Fetch updated list after submission
    } catch (err) {
      console.error("Error storing text:", err);
      alert("Error storing text");
    }
  };

  // Fetch stored texts
  const handleFetch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/fetch`);
      setStoredTexts(response.data); // Update stored texts
    } catch (err) {
      console.error("Error fetching texts:", err);
      alert("Error fetching texts");
    }
  };

  // Delete a specific text
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      handleFetch(); // Re-fetch after deletion
    } catch (err) {
      console.error("Error deleting text:", err);
      alert("Error deleting text");
    }
  };

  // Backup all stored texts
  const handleBackup = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/backup`);
      alert(response.data.message); // Show success message
    } catch (err) {
      console.error("Error backing up data:", err);
      alert("Error backing up data");
    }
  };

  // Open the Backup Viewer App in a new tab
  const openBackupViewer = () => {
    window.open(`${window.location.origin}/view-backups`, "_blank"); // Assuming the backup viewer is running on port 3001
  };

  // On mount, fetch stored texts
  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <div className="App">
      <h1>Text Storage App</h1>

      {/* Text Input and Submit Button */}
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          placeholder="Enter text"
        />
        <button onClick={handleSubmit} className="submit-button">Submit</button>
      </div>

      {/* Fetch Stored Texts Button */}
      <button onClick={handleFetch} className="fetch-button">Fetch Texts</button>

      {/* Display Stored Texts */}
      <div className="texts-list">
        <h2>Stored Texts</h2>
        <ul>
          {storedTexts.map((item) => (
            <li key={item._id}>
              {item.text}
              <button onClick={() => handleDelete(item._id)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Backup Button */}
      <button onClick={handleBackup} className="backup-button">Backup</button>

      {/* Open Backup Viewer Button */}
      <button onClick={openBackupViewer} className="view-backups-button">View Backups</button>
    </div>
  );
}

export default App;
