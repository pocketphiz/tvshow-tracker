'use strict';

/**
 * source https://github.com/popcorn-official/popcorn-api
 */

var request =   require('request');
var cheerio =   require('cheerio');

var BASE_URL    =   'https://eztv.it';
var SHOWLIST    =   '/showlist/';
/*var LATEST  =   "/sort/100/";
var SEARCH  =   "/search/";*/
var SHOWS   =   '/shows/';

exports.getAllShows = function(cb) {
    if(!cb) return new Error('Missing callback');
    request(BASE_URL + SHOWLIST, function(err, res, html){
        if(err) return cb(err, null);

        var $ = cheerio.load(html);
        var allShows = [];

        $('.thread_link').each(function(){
            var entry = $(this);
            var show = entry.text();
            if (show) {
                var id = entry.attr('href').match(/\/shows\/(.*)\/(.*)\//)[1];
                var slug = entry.attr('href').match(/\/shows\/(.*)\/(.*)\//)[2];
                allShows.push({show: show, id: id, slug: slug});
            }
        });
        return cb(null, allShows);
    });
};

exports.getAllEpisodes = function(data, cb) {
    if(!cb) return new Error('missing callback');
    var episodes = {};

    request.get(BASE_URL + SHOWS + data.id + '/' + data.slug + '/', function (err, res, html) {
        if(err) return cb(err, null);

        var $ = cheerio.load(html);

        var show_rows = $('tr.forum_header_border[name="hover"]').filter(function() {
            var episode_rows = $(this).children('.forum_thread_post');
            if (episode_rows.length > 0) {
                var title = $(this).children('td').eq(1).text();

                if(title.indexOf('-CTU') > -1)
                    return false;
                else
                    return true;
                
            }
            return false;
        });

        if (show_rows.length === 0) return cb('Show Not Found', null);

        show_rows.each(function() {
            var entry = $(this);
            var ep = {};
            ep.title = entry.children('td').eq(1).text();
            var title =  ep.title.replace('x264', ''); // temp fix
            ep.torrent = {};
            ep.torrent.magnet = entry.children('td').eq(2).children('a').first().attr('href');
            ep.torrent.quality = title.match(/(\d{3,4})p/) ? title.match(/(\d{3,4})p/)[0] : '480p';

            var matcher = title.match(/S?0*(\d+)?[xE]0*(\d+)/);
            if (matcher) {
                ep.season = parseInt(matcher[1], 10);
                ep.episode = parseInt(matcher[2], 10);
                ep.dateBased = false;
            } else {
                matcher = title.match(/(\d{4}) (\d{2} \d{2})/); // Date based TV Shows
                if(matcher) {
                    ep.season = matcher[1]; // Season : 2014
                    ep.episode = matcher[2].replace(' ', '/'); //Episode : 04/06
                    ep.dateBased = true;
                }
            }
            if (ep.season && ep.episode) {
                if(!episodes[ep.season]) episodes[ep.season] = {};
                if(!episodes[ep.season][ep.episode]) episodes[ep.season][ep.episode] = {};
                if(!episodes[ep.season][ep.episode][ep.torrent.quality] || title.toLowerCase().indexOf("repack") > -1)
                    episodes[ep.season][ep.episode][ep.torrent.quality] = ep.torrent.magnet;
            }
        });
        return cb(null, episodes);
    });
};

exports.getShow = function(showName, callback) {
    if(!showName || !callback) return new Error('Missing function parameters');
    var slug =  showName.replace(/[()\-\']/g, '').replace(/\ /g, '-').toLowerCase();
    this.getAllShows(function(err, shows) {
        if (err) return callback(err, null);
        shows.forEach(function(show) {
            if (show.slug === slug) {
                return callback(null, show);
            }
        });
    });
};

