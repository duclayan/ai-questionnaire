import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Card,
  CardContent,
  CardActions,
  Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link, useNavigate  } from 'react-router-dom';
import { DocumentLoader } from '../../components/forms';
import './styles.css'; 
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({ name: '', owner: '' });
  const [editMode, setEditMode] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT
  const token = localStorage.getItem('token');
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
        const response = await axios.put(`${apiEndpoint}/api/projects/${currentProjectId}/`, 
          newProject,
          {
            headers: { Authorization: `Bearer ${token}` }
          });
        setProjects(projects.map(project => (project.project_id === currentProjectId ? response.data.project : project)));
      } else {
        // Create new project
        const response = await axios.post(`${apiEndpoint}/api/projects/`, 
          newProject,
          {
            headers: { Authorization: `Bearer ${token}` }
          });
        setProjects([...projects, response.data.project]);
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
      await axios.delete(`${apiEndpoint}/api/projects/${projectId}/`,
        {
          headers: { Authorization: `Bearer ${token}` }
        });
      fetchProjects(); // Refresh the project list
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/api/projects`, 
        {
          headers: { Authorization: `Bearer ${token}` }
        });
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
  <div className="app-container" >
    <Container maxWidth="md" sx={{ mt: 4 }}>
        <Button variant="contained" onClick={() => handleOpen()} sx={{ mb: 2 }}>
          Create Project
        </Button>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {projects.map((project) => (
            <Card key={project.project_id} variant="outlined" className="card">
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" className="card-title">
                    {project.name}
                  </Typography>
                  <Typography className="card-owner">Owner: {project.owner}</Typography>
                </Box>
                <CardActions>
                  <IconButton aria-label="edit">
                    <Link to={`/forms/${project.project_id}`} >
                      <Edit />
                    </Link>
                  </IconButton>
                  <IconButton aria-label="delete" sx={{ color: '#00695c' }} onClick={() => handleDeleteProject(project.project_id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </Box>      
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
    </div>
  );
};

export default Dashboard;