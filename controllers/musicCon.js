const axios = require('axios')

module.exports = {
        showTopSong: function (req, res) {
            axios({
                method: "GET",
                url: `http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=6&country=us&f_has_lyrics=1&apikey=${process.env.API_KEY}`
            })
            .then((response) => {
                console.log(response.data)
                res.status(200).json({
                    msg:'success get data',
                    data: response.data
                })
            })
            .catch((error) => {
                res.status(500).json({
                    msg: 'internl server error',
                    error: error.message
                })
                console.log(error)
            })
        },
        showOneMusic: function (req, res) {
            axios({
                method: "get",
                url: `http://api.musixmatch.com/ws/1.1/track.search?q_track=${req.params.title}&page_size=3&page=1&s_track_rating=desc&page_size=3&page=1&s_track_rating=desc&&apikey=${process.env.API_KEY}`,
            })
            .then((response) => { 
                console.log(response)   
                if (response.data.message.body.track_list) {
                    res.status(200).json({
                        data: response.data
                    })
                } else {
                    res.status(404).json({
                        msg: 'id not found'
                    })
                }
                // console.log(response.data)
            })
            .catch((err) => {
                res.status(500).json({
                    msg: 'internal server error',
                    error: err.message
                })
                console.log(err)
            })
        },
    
        Showlyrics: function (req, res) {
            axios({
                method: "get",
                url:`http://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${req.query.search}}&q_artist=${req.query.artist}$apikey=${process.env.API_KEY}` ,
            })
            .then((response) => {
                if (response.data) {
                    res.status(200).json({
                        msg: 'success get match lyrics',
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                res.status(500).json({
                    msg: 'internal server error',
                    error: err.message
                })
            })
        },
    
        ShowOnelyrics: function (req, res) {
            console.log(req.query.id)
            axios({
                method: "get",
                url: `http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${req.params.id}&apikey=${process.env.API_KEY}`,
            })
            .then((response) => {
                console.log(response.data)
                res.status(200).json({
                    msg: 'success get lyrics',
                    data: response.data
                })
            })
            .catch((err) => {
                res.status(500).json({
                    msg: 'internal server error',
                    error: err.message
                })
            })
        },
    
        listeningSong: function (req, res) {
            axios({
                method: 'get',
                url: `https://deezerdevs-deezer.p.mashape.com/search?q= ${req.params.search}`,
                headers: {
                "X-Mashape-Key": process.env.MASHAPED_KEY,
                Accept: "text/plain"
                }
            })
            .then((response) => {
                if (response.data) {
                    res.status(200).json({
                        msg: 'get all song',
                        data: response.data
                    })
                } else {
                    res.status(404).json({
                        msg: 'not found'
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    msg: 'internal server error',
                    error: err.message
                })
            })
        }
    
    }
