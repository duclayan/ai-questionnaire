import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const Dashboard = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1', owner: 'John Doe' },
    { id: 2, name: 'Project 2', owner: 'Jane Smith' },
  ]);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', owner: '' });
  // const [projects, setProjects] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCreateProject = () => {
    setProjects([...projects, { ...newProject, id: Date.now() }]);
    setNewProject({ name: '', owner: '' });
    handleClose();
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  const handleEditProject = (id) => {
    // Implement edit functionality here
    console.log('Edit project', id);
  };

  
  const fetchProjects = async (category) => {
    try {
      const response = await axios.get("http://localhost:8000/api/projects");
      const project_list = response.data;
      setProjects(project_list);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
          Create Project
        </Button>
        <List>
          {projects.map((project) => (
            <ListItem
              key={project.id}
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleEditProject(project.id)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProject(project.id)}>
                    <Delete />
                  </IconButton>
                </>
              }
            >
              <ListItemText primary={project.name} secondary={`Owner: ${project.owner}`} />
            </ListItem>
          ))}
        </List>
      </Container>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Name"
            fullWidth
            variant="standard"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Project Owner"
            fullWidth
            variant="standard"
            value={newProject.owner}
            onChange={(e) => setNewProject({ ...newProject, owner: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateProject}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;