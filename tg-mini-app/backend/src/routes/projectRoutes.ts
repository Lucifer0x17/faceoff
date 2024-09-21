import { Router } from 'express';
import { Project } from '../models/Project';

const router = Router();


router.post('/projects', async (req, res) => {
    const { eth_id, name, description, link, finalist, end_time, image, winner } = req.body;

    try {
        // Create a new Project document
        const newProject = new Project({
            eth_id,
            name,
            image,
            description,
            link,
            finalist,
            end_time,
            winner
        });

        // Save the new project to the database
        await newProject.save();
        console.log("New entry added", eth_id)

        // Send a success response with the new project
        res.status(201).json(newProject);
    } catch (err: any) {
        // Handle errors (e.g., validation errors)
        res.status(500).json({ error: err.message });
    }
});

// GET route to fetch all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find();  // Fetch all projects from the database
        res.json(projects);  // Return the projects in JSON format
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});

// GET route to fetch a project by its id
router.get('/projects/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findOne({ id });  // Find a project by its id
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);  // Return the found project
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
});


export default router;