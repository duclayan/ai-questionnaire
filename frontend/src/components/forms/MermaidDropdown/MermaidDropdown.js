import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Sample data for dropdown items
const menuItems = [
    {
        value: "Create an echarging management system architecture diagram with angular.js as the frontend, javaspring frame work as the backend, java Eureka for service exploration, postgressql database, with typicalAWS resources. Consider typical security components such as iam, firewall, gateway, monitoring. Allcomponents inside the AWS cloud, only the user is outside of the cloud.",
        label: "Create an echarging management system architecture diagram with angular.js as the frontend,  javaspring frame work as the backend,  java Eureka for service exploration,  postgressql database,  with typical AWS resources.  Consider typical security components such as iam,  firewall,  gateway,  monitoring.  All components inside the AWS cloud, only the user is outside of the cloud."
    },
    {
        value: "Create a GenAI chatbot architecture diagram with react.js as the frontend, python FastAPI and thebackend, use typical aws resources for web app, database, storage, monitoring, include securitycomponents like iam, firewall, gateway, monitoring, security groups, amazon bedrock as the NLP andclaude as the LLM. All components inside the AWS, only the user is outside of the cloud.",
        label: "Create a GenAI chatbot architecture diagram with react.js as the frontend,  python FastAPI and the backend,  use typical aws resources for web app,  database,  storage,  monitoring,  include security components like iam,  firewall,  gateway,  monitoring,  security groups,  amazon bedrock as the NLP and claude as the LLM.  All components inside the AWS, only the user is outside of the cloud."
    },
    {
        value: "Create a detailed description of a proxmox virtualisation solution in a data center (and transform it intomermaid.js language as a left-right diagram)",
        label: "Create a detailed description of a proxmox virtualisation solution in a data center (and transform it intomermaid.js language as a left-right diagram)"
    },
    // Add more items as needed
];

export const MermaidDropdown = ({ onChange }) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onChange(value); // Call onChange with the new value
    };

    return (
        <FormControl fullWidth variant="outlined">
            <InputLabel id="dropdown-label">Select Option</InputLabel>
            <Select
                labelId="dropdown-label"
                value={selectedValue}
                onChange={handleChange}
                label="Select Option"
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 300,
                            overflowY: 'auto',
                        },
                    },
                }}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {menuItems.map((item) => (
                    <MenuItem key={item.value} value={item.value} style={{ whiteSpace: 'pre-line' }}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};