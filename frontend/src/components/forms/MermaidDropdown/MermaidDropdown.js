import React, { useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

// Sample data for dropdown items
const menuItems = [
    {
        value: "Create an echarging management system architecture diagram with angular.js as the frontend, javaspring frame work as the backend, java Eureka for service exploration, postgressql database, with typical AWS resources. Consider typical security components such as iam, firewall, gateway, monitoring. All components inside the AWS cloud, only the user is outside of the cloud.",
        label: "Architecture Diagram"
    },
    {
        value: "Create a GenAI chatbot architecture diagram with react.js as the frontend, python FastAPI and the backend, use typical aws resources for web app, database, storage, monitoring, include security components like iam, firewall, gateway, monitoring, security groups, amazon bedrock as the NLP and claude as the LLM. All components inside the AWS, only the user is outside of the cloud.",
        label: "Architecture Diagram"
    },
    {
        value: "Create a detailed description of a proxmox virtualisation solution in a data center (and transform it into mermaid.js language as a left-right diagram)",
        label: "Flowchart"
    },
    {
        value: "Create three independent sub diagrams in one picture with mermaid.js with different detail levels of SAP Hana SRM in Azure. The first one is a high-level one, the third has the most details.",
        label: "3-Layer Diagram"
    },
    {
        value: "Create a Gantt chart for a cybersecurity incident response plan that includes tasks such as preparation, detection and analysis, containment, eradication, recovery, and lessons learned. The timeline should cover a six-month period with specific start and end dates for each task.",
        label: "Gantt Chart"
    },
    {
        value: "Create a pie chart representing the distribution of various types of cyber threats faced by an organization in the past year, including malware attacks, phishing attempts, insider threats, and denial-of-service attacks.",
        label: "Pie Chart"
    },
    {
        value: "Create a quadrant chart to assess risks based on their likelihood and impact on the organization. Risks may include data breaches, system outages, compliance violations, and insider threats.",
        label: "Quadrant Chart"
    }

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
                label="Select Template"
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 300,
                            marginTop: "10px", // Set marginTop to 10px
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