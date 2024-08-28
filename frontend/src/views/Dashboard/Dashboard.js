// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@mui/material';

const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [projectId, setProjectId] = useState('123');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        const response = await axios.get('http://localhost:8000/api/projects/');
        setProjects(response.data);
    };

    const addProject = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:8000/api/projects/', 
          {
            params: { 
              project_id: projectId,
              name: name,
              owner: owner
            },
          }
        );
        setName('');
        setOwner('');
        fetchProjects();
    };

    const deleteProject = async (id) => {
        await axios.delete(`http://localhost:8000/api/projects/${id}/`);
        fetchProjects();
    };

    const viewProject = (id) => {
        window.location.href = `/questionnaire/${id}`;
    };

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom>
                Project Dashboard
            </Typography>
            <form onSubmit={addProject}>
                <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Project Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Project Owner"
                            variant="outlined"
                            fullWidth
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Add Project
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <List>
                {projects.map((project) => (
                    <ListItem key={project.id}>
                        <Card style={{ width: '100%', marginTop: '10px' }}>
                            <CardContent>
                                <ListItemText
                                    primary={project.name}
                                    secondary={`Owner: ${project.owner}`}
                                />
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="primary" onClick={() => viewProject(project.id)}>
                                    View
                                </Button>
                                <Button size="small" color="secondary" onClick={() => deleteProject(project.id)}>
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Dashboard;