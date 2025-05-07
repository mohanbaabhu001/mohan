import React, { useState } from "react";
import axios from "axios";

function BackupViewer() {
  const [backups, setBackups] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  console.log(apiUrl, "Line 56")

  const fetchBackups = async () => {
    try {
      console.log("Calling:", `${apiUrl}/api/backups`);
      const response = await axios.get(`${apiUrl}/api/backups`);
      console.log("Response:", response.data);
      setBackups(response.data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Error fetching backups");
    }
  };

  return (
    <div className="backup-viewer">
      <h2>Backup Texts</h2>

      <button onClick={fetchBackups}>View Backups</button>

      {error && <p className="error">{error}</p>}

      <ul>
        {backups.map((backup, index) => (
          <li key={backup._id}>
            <strong>Backup #{index + 1}:</strong>
            <ul>
              {backup.texts.map((text, idx) => (
                <li key={idx}>{text}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BackupViewer;
