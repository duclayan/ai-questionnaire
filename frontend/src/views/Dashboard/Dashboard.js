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
import { Link, useNavigate  } from 'react-router-dom';
import { DocumentLoader } from '../../components/forms';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', owner: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT
  const navigate = useNavigate(); 
  const handleOpen = (project = null) => {
    if (project) {
      setNewProject({ name: project.name, owner: project.owner });
      setCurrentProjectId(project.project_id); 
      setEditMode(true);
    } else {
      setNewProject({ name: '', owner: '' });
      setCurrentProjectId(null);
      setEditMode(false);
    }
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleCreateOrUpdateProject = async () => {
    try {
      if (editMode) {
        // Update existing project
        const response = await axios.put(`${apiEndpoint}/projects/${currentProjectId}/`, newProject);
        setProjects(projects.map(project => (project.project_id === currentProjectId ? response.data.project : project)));
      } else {
        // Create new project
        const response = await axios.post(`${apiEndpoint}/projects/`, newProject);
        setProjects([...projects, response.data.project]);
        console.log("SUCCESS ACCOUNT", response);
        // Navigate to the new form after creating a project
        navigate(`/forms/${response.data.project.project_id}`);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving project:', error.response.data);
    }
  };

  const handleDeleteProject = async (projectId) => {
    try {
      await axios.delete(`${apiEndpoint}/projects/${projectId}/`);
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/projects`);
      setProjects(response.data.project_list);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    setLoading(true)
    fetchProjects();
    setLoading(false)
  }, []);

  if (loading) {
    // Show loading screen while fetching data
   return <DocumentLoader isLoading={loading} text={"Preparing the Data"} />;
 }
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
        <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>
          Create Project
        </Button>
        <List>
          {projects.map((project) => (
            <ListItem
              key={project.project_id} 
              secondaryAction={
                <>
                  <IconButton edge="end" aria-label="edit">
                    <Link to={`/forms/${project.project_id}`}>
                      <Edit />
                    </Link>
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteProject(project.project_id)}>
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
        <DialogTitle>{editMode ? 'Edit Project' : 'Create New Project'}</DialogTitle>
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
          <Button onClick={handleCreateOrUpdateProject}>{editMode ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;