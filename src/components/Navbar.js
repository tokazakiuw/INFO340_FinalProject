import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Chat } from './Chat/Chat';
import { getAuth, signOut } from 'firebase/auth';

function Navbar({ onSearch }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const auth = getAuth();

  function toggleChat() {
    setChatOpen(!chatOpen);
  }

  function logOff() {
    signOut(auth)
        .then(() => {console.log("signed out")})
        .catch((error) => {console.log(error)});
  }

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const showSearchBar = location.pathname === '/main' || location.pathname === '/inventory';

  return (
    <header>
      <nav>
        <div className="navbar-left">
          <Link to="/">
            <img src="../img/favicon.svg" alt="Logo" aria-label="Link to Main page" />
          </Link>
        </div>
        <div className="navbar-center">
          <div role="button" className="center-item feed">
            <Link to="/">Feed</Link>
          </div>
          <div role="button" className="center-item">
            <Link to="/inventory">Inventory</Link>
          </div>
          <div role="button" className="center-item">
            <Link to="/rules">Rules</Link>
          </div>
          <div role="button" className="center-item">
            <Link to="/chat">Chat</Link>
          </div>
        </div>
        <div className="navbar-right">
          {showSearchBar && (
            <div className="search-container">
              <form action="#" method="get" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Go</button>
              </form>
            </div>
          )}
          <div className="profile-icon">
            <button type="click" onClick={logOff} alt="Sign out" style={{backgroundColor: "#333"}}>Sign out</button>
          </div>
        </div>
      </nav>
      {chatOpen && <Chat toggleChat={toggleChat} />}
    </header>
  );
}

export default Navbar;