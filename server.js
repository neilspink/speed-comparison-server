const API_KEY = 'GOOGLE API KEY FOR PAGESPEED INSIGHTS';

const express = require('express');
const psi = require('psi');

var app = express();

var port = process.env.PORT || 8121;

var siteRouter = express.Router();

siteRouter.route('/sites')
    .get(function(req, res) {

        var query = {};

        if (!req.query.url) {
            res.json({error: "no url"});
            return;
        }

        psi(req.query.url, {key: API_KEY, strategy: 'mobile'}).then(data => {
	        res.header("Access-Control-Allow-Origin", "*");
	        
            res.json({data:
                        {
                            id: 1,
                            speed: data.ruleGroups.SPEED.score,
                            usability: data.ruleGroups.USABILITY.score,
                            numberResources: data.pageStats.numberResources,
                            numberHosts: data.pageStats.numberHosts,
                            totalRequestBytes: data.pageStats.totalRequestBytes,
                            numberStaticResources: data.pageStats.numberStaticResources,
                            htmlResponseBytes: data.pageStats.htmlResponseBytes,
                            textResponseBytes: data.pageStats.textResponseBytes,
                            cssResponseBytes: data.pageStats.cssResponseBytes,
                            imageResponseBytes: data.pageStats.imageResponseBytes,
                            javascriptResponseBytes: data.pageStats.javascriptResponseBytes,
                            flashResponseBytes: data.pageStats.flashResponseBytes,
                            otherResponseBytes: data.pageStats.otherResponseBytes,
                            numberJsResources: data.pageStats.numberJsResources,
                            numberCssResources: data.pageStats.numberCssResources
                        }});
        });
    });

app.use('/api', siteRouter);

app.get('/', function(req, res){
    res.send('welcome to my API');
});

app.listen(port, function(){
    console.log('Gulp is running on PORT:' + port);
});



