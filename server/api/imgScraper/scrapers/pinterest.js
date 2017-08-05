'use strict';

var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

exports.list = function(url, cb){
    console.log('list function was called');
    //this is the actual request to the pinterest page I care about
    request(url, function(error, resp, body){
        if(error){
            cb({
                error: error
            });
        }
        if(!error){
            console.log('No error');

            var $ = cheerio.load(body);
            var pin = {};
            var $url = url;
            var img = $(".GrowthUnauthPinImage img").get(0);
            //var img = $(".pinHolder .Image img").get(0);
            var $img = $(img).attr('src');
            //var $desc = $(".pinHolder .Image img").attr('alt');
            var $desc = $(img).attr('alt');

            console.log($img +' pin url');

            //Finding the bits on the page we care about based on class names
            pin = {
                img : $img,
                url : $url,
                desc : $desc
            };

            console.log('Scraped: ', pin);
            cb(pin);
        }
    });
};