// "eylem" routerını buraya yazın

const router = require('express').Router()

const actionsModel = require('./actions-model')
const middleware = require('./actions-middlware')

router.get('/', async (req, res, next) => {
  try {
    const allActions = await actionsModel.get()
    res.json(allActions)
  } catch (error) {
    next(error)
  }
})
router.get('/:id', middleware.checkActionId, (req, res, next) => {
  try {
    res.json(req.action)
  } catch (error) {
    next(error)
  }
})

router.post('/', middleware.checkActionPayload, async (req, res, next) => {
  try {
    let { validAction } = req
    const insertedAction = await actionsModel.insert(validAction)
    res.status(201).json(insertedAction)
  } catch (error) {
    next(error)
  }
})
router.put(
  '/:id',
  middleware.checkActionId,
  middleware.checkActionPayload,
  async (req, res, next) => {
    try {
      const updatedAction = await actionsModel.update(
        req.params.id,
        req.validAction
      )
      res.json(updatedAction)
    } catch (error) {
      next(error)
    }
  }
)
router.delete('/:id', middleware.checkActionId, async (req, res, next) => {
  try {
    await actionsModel.remove(req.params.id)
    res.json({ message: `action silindi. id:${req.params.id}` })
  } catch (error) {
    next(error)
  }
})

module.exports = router
