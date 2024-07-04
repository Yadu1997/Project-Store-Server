const projects = require('../models/projectModel')

// add project
exports.addProjectController = async (req,res)=>{
    console.log("Inside Add Project Function");
    const {title,languages,overview,github,website} = req.body
    const userId = req.payload
    const projectIMG = req.file.filename
    console.log(title,languages,overview,github,website,userId,projectIMG);
    
    try {
        const existingProject = await projects.findOne({github})
        if (existingProject) {
            res.status(406).json("Project already exist. Add another one ")
        } else {
             const newProject = new projects({
                title,languages,overview,github,website,projectIMG,userId
             })
             await newProject.save()
             res.status(200).json(newProject)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// getting home projects
exports.getHomeProjects = async (req,res) =>{
    console.log("inside Get Home Project Function");
    try {
        const homeProjects = await projects.find().limit(3)
        res.status(200).json(homeProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get all projects
exports.getAllProjectsController = async (req,res) =>{
    console.log("inside Get all Project Function");
    const searchKey = req.query.search
    const query = {
        languages:{
            $regex:searchKey,
            $options:"i"
        }
    }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// all user projects
exports.getAllUserProjectsController = async (req,res) =>{
    console.log("inside Get all User Project Function");
    const userId = req.payload
    try {
        
        const allUserProjects = await projects.find({userId})
        res.status(200).json(allUserProjects)
    } catch (error) {
        res.status(401).json(error)
    }
}

// edit projects
exports.editProjectController = async(req,res) =>{
    console.log("inside editProjectController");
    const {pid} = req.params
    const {title,languages,overview,github,website,projectIMG} = req.body
    const uploadIMG = req.file?req.file.filename:projectIMG
    const userId = req.payload
    try {
        const updatedProject = await projects.findByIdAndUpdate({_id:pid},{
            title,languages,overview,github,website,projectIMG:uploadIMG,userId
        },{new:true})
        await updatedProject.save()
        res.status(200).json(updatedProject)
    } catch (error) {
        res.status(401).json(error)
    }
}

// remove project
exports.removeProjectController = async (req,res)=>{
    console.log("inside remove project controller");
    const {pid} = req.params
    try {
        const removedProject = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(removedProject)
    } catch (error) {
        res.status(401).json(error)
    }
}