import React from 'react';

const AutoCorrectDropdown = ({ autoCorrectEnabled, handleAutoCorrectToggle }) => {
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        handleAutoCorrectToggle(selectedValue === 'on'); // Convert the value to boolean
    };

    return (
        <div>
            <label htmlFor="auto-correct-select">Enable Auto Correct:</label>
            <select
                id="auto-correct-select"
                value={autoCorrectEnabled ? 'on' : 'off'}
                onChange={handleChange}
            >
                <option value="on">On</option>
                <option value="off">Off</option>
            </select>
        </div>
    );
};

export default AutoCorrectDropdown;