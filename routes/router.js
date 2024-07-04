const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middleware/jwtMIddleware')
const multerMiddleware = require('../middleware/multerMiddleware')
const router = new express.Router()
// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add project
router.post('/project/add',jwtMiddleware,multerMiddleware.single('projectIMG'),projectController.addProjectController)

// home projects
router.get('/get-home-projects',projectController.getHomeProjects)

// all projects
router.get('/all-projects',jwtMiddleware,projectController.getAllProjectsController)

// user Projects
router.get('/user-projects',jwtMiddleware,projectController.getAllUserProjectsController)

// edit project
router.put('/project/:pid/edit',jwtMiddleware,multerMiddleware.single('projectIMG'),projectController.editProjectController)

// remove project
router.delete('/project/:pid/remove',jwtMiddleware,projectController.removeProjectController)

// edit project 
router.put('/user/edit',jwtMiddleware,multerMiddleware.single('profilePic'),userController.editProfileController)

module.exports = router