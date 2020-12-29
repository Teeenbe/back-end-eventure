var express = require('express')
var router = express.Router()

const {
    getAllEvents,
    getEventById,
    addEvent,
    updateEventById,
    deleteEventById,
    getAllEventsAfterCurrentDate
} = require('../models/index')

router.get('/', async function (req, res, next) {
    const events = await getAllEvents()
    res.json({ success: true, payload: events })
})
router.get('/date', async function (req, res, next) {
    const events = await getAllEventsAfterCurrentDate()
    res.json({ success: true, payload: events })
})

router.get('/:id', async function (req, res, next) {
    const id = req.params.id
    const event = await getEventById(id)
    res.json({ success: true, payload: event })
})

router.post('/', async function (req, res, next) {
    const data = req.body
    const result = await addEvent(data)
    res.json({ success: true, payload: result })
})

router.patch('/:id', async function (req, res) {
    const id = req.params.id
    const details = req.body
    const result = await updateEventById(id, details)
    console.log(result)
    res.json({
        success: true,
        payload: `Event with id ${result.id} has been updated.`
    })
})

router.delete('/:id', async function (req, res) {
    const eventId = req.params.id
    const { id } = await deleteEventById(eventId)
    res.json({
        success: true,
        payload: `Event with id of ${id} has been deleted.`
    })
})

module.exports = router
