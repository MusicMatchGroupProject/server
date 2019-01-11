const router = require('express').Router()
const musicController = require('../controllers/musicCon')


router.get('/', musicController.showTopSong)
router.get('/:title', musicController.showOneMusic)
router.get('/?artist=&lyrics=', musicController.Showlyrics)
router.get('/search/lyrics/:id', musicController.ShowOnelyrics)
router.get('/songs/:search', musicController.listeningSong)

module.exports = router   