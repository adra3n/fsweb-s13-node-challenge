// projects ara yazılımları buraya
const projectsModel = require('./projects-model')

async function checkProjectId(req, res, next) {
  try {
    const { id } = req.params
    const projectExists = await projectsModel.get(id)
    if (!projectExists) {
      res.status(404).json({ message: 'proje bulunamadı' })
    } else {
      //?
      req.project = projectExists
      next()
    }
  } catch (error) {
    next(error)
  }
}

function checkProjectPayload(req, res, next) {
  try {
    const { name, description, completed } = req.params
    if (!name || !description || completed == undefined) {
      res.status(400).json({ message: 'eksik alan' })
    } else {
      //?
      req.validProject = {
        name: name,
        description: description,
        completed: completed,
      }
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { checkProjectId, checkProjectPayload }
