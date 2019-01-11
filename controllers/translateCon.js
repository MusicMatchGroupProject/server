var googleTranslate = require('google-translate')(process.env.TRANSLATE_TOKEN);

class TranslateCon {
    static translate(req, res, next) {
        googleTranslate.translate(req.body.text, 'id', function(err, translation) {
            console.log(translation.translatedText);
            res.status(200).json({
                translatedText: translation.translatedText
            });
        });
    }
};

module.exports = TranslateCon;