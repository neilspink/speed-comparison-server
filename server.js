const API_KEY = 'GOOGLE API KEY FOR PAGESPEED INSIGHTS';

const express = require('express');
const psi = require('psi');

var app = express();

var port = process.env.PORT || 8121;

var siteRouter = express.Router();

siteRouter.route('/site')
    .get(function(req, res) {

        var query = {};

        if (!req.query.url) {
            res.json({error: "no url"});
            return;
        }

        psi(req.query.url, {key: API_KEY, strategy: 'mobile'}).then(data => {
            res.json({speed: data.ruleGroups.SPEED.score});
        });
    });

app.use('/api', siteRouter);

app.get('/', function(req, res){
    res.send('welcome to my API');
});

app.listen(port, function(){
    console.log('Gulp is running on PORT:' + port);
});



