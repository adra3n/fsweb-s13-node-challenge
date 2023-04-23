// "project" routerını buraya yazın!

const router = require('express').Router()

const projectsModel = require('./projects-model')
const middleware = require('./projects-middleware')

router.get('/', async (req, res, next) => {
  try {
    const allProjects = await projectsModel.get()
    res.json(allProjects)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', middleware.checkProjectId, async (req, res, next) => {
  try {
    res.json(req.project)
  } catch (error) {
    next(error)
  }
})

router.post('/', middleware.checkProjectPayload, async (req, res, next) => {
  try {
    let { validProject } = req
    const insertedProject = await projectsModel.insert(validProject)
    res.status(201).json(insertedProject)
  } catch (error) {
    next(error)
  }
})

router.put(
  '/:id',
  middleware.checkProjectId,
  middleware.checkProjectPayload,
  async (req, res, next) => {
    try {
      const updatedProject = await projectsModel.update(
        req.params.id,
        req.validProject
      )
      res.json(updatedProject)
    } catch (error) {
      next(error)
    }
  }
)

router.delete('/:id', middleware.checkProjectId, async (req, res, next) => {
  try {
    await projectsModel.remove(req.params.id)
    res.json({ message: `${req.params.id} id'li proje silindi` })
  } catch (error) {
    next(error)
  }
})
router.get(
  '/:id/actions',
  middleware.checkProjectId,
  async (req, res, next) => {
    try {
      const actionList = await projectsModel.getProjectActions(req.params.id)
      res.json(actionList)
    } catch (error) {
      next(error)
    }
  }
)

module.exports = router
