import React from 'react';

function IEXToolbar() {
    return (
        <div className="main-tool-bar">
            <div className="search-bar">
                <i className="material-icons md-24">search</i>
                <div className="search-container">
                    <input type="text" class="search-input" placeholder="Search by ticker symbol or company." 
                        pattern="[a-zA-Z0-9]+"/>
                    <div className="search-results"></div>
                </div>
            </div>
            <div className="account">
                <i className="material-icons md-24">account_circle</i>
            </div>
        </div>
    );
}

export default IEXToolbar;