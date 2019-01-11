const axios = require('axios')

module.exports = {
    notFound : function(req, res){
        console.log(process.env.RSS_KEY)
        axios.get(`http://api.voicerss.org/?key=${process.env.RSS_KEY}&r=2&hl=en-us&src=Sorry, the song is not found!&c=mp3&f=44khz_16bit_stereo&b64=true`)
        .then(response => {
            res.json(response.data)
        })
        .catch(error => {
            res.json(error)
        })
    }
}