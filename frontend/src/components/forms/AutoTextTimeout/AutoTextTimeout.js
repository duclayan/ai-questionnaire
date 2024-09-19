import React from 'react';

const AutoTextTimeout = ({ textTimeoutEnabled, handleAutoTextTimeoutToggle }) => {
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        handleAutoTextTimeoutToggle(selectedValue === 'on'); // Convert the value to boolean
    };

    return (
        <div>
            <label htmlFor="auto-text-timeout-select">Enable Auto Texttimeout:</label>
            <select
                id="auto-text-timeout-select"
                value={textTimeoutEnabled ? 'on' : 'off'}
                onChange={handleChange}
            >
                <option value="on">On</option>
                <option value="off">Off</option>
            </select>
        </div>
    );
};

export default AutoTextTimeout;