import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import BackupViewer from "./BackupViewer";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <h1>Backup Viewer App</h1>

        <nav>
          <ul>
            <li>
              <Link to="/view-backups">View Backups</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/view-backups" element={<BackupViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
