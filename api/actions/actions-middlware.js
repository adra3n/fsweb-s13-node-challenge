// eylemlerle ilgili ara katman yazılımları yazın
const actionsModel = require('./actions-model')

async function checkActionId(req, res, next) {
  try {
    const { id } = req.body
    const actionExists = await actionsModel.get(id)
    if (!actionExists) {
      res.status(404).json({ message: 'action bulunamadı' })
    } else {
      req.action = actionExists
      next()
    }
  } catch (error) {
    next(error)
  }
}

async function checkActionPayload(req, res, next) {
  try {
    const { project_id, description, notes, completed } = req.body
    if (
      !project_id ||
      !description ||
      !notes ||
      typeof completed != 'boolean'
    ) {
      res.status(400).json({ message: 'eksik alan' })
    } else {
      req.validAction = {
        project_id: project_id,
        description: description,
        notes: notes,
        completed: completed,
      }

      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkActionId,
  checkActionPayload,
}
