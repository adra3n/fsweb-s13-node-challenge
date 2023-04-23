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
    const insertedAction = await actionsModel.insert(req.validAction)
    res.status(201).json(insertedAction)
  } catch (error) {
    next(error)
  }
})
router.put(
  '/:id',
  middleware.checkActionId,
  middleware.checkActionPayload,
  async (req, res, next) => {}
)
router.delete('/:id', middleware.checkActionId, (req, res, next) => {})

module.exports = router
