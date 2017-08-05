'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var scrapers = {};

scrapers['pinterest'] = require('./scrapers/pinterest.js');

exports.scrape = function(req, res){
    var url = req.body.url;
    var scraperToUse;

    if(url.indexOf('pinterest') > -1){
        scraperToUse = 'pinterest';
    } else {
        console.log('Cannot locate scraper');
    }

    console.log(scrapers[scraperToUse]);

    scrapers[scraperToUse].list(url, function(data){
        console.log('Data from scraper:', data);
        res.json(data);
    });
};