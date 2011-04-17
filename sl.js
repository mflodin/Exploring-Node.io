var nodeio = require('node.io');
var methods = {
    input: false,
    run: function() {
        var self = this;

// Tidsangivelser: *, 15 min. 22:42, Kort tåg

//http://realtid.sl.se/?epslanguage=SV&WbSgnMdl=9001-VC1DZW50cmFsZW4gKFN0b2NraG9sbSk%3d---_-- t-centralen
//http://realtid.sl.se/?epslanguage=SV&WbSgnMdl=9306-VsOkc3RyYSBza29nZW4gKFNvbG5hKQ%3d%3d---_-- v'stra skogen

        this.getHtml('http://realtid.sl.se/?epslanguage=SV&WbSgnMdl=9001-VC1DZW50cmFsZW4gKFN0b2NraG9sbSk%3d---_--', function(err, $) {

            //Handle any request / parsing errors
            if (err) self.exit(err);

            var titles = [], scores = [], output = [];

            //Select all titles on the page
            $('div.trafficList ol li').each(function(li) {
                titles.push(li.text); 
            });

            //Select all scores on the page
//            $('div#siteTable div.score.unvoted').each(function(div) {
//                scores.push(div.rawtext); //rawtext doesn't decode entities or trim the text
//            });
//
//            //Mismatch? page probably didn't load properly
//            if (scores.length != titles.length) {
//                self.exit('Title / score mismatch');
//            }

//            for (var i = 0, len = scores.length; i < len; i++) {
//                //Ignore upcoming stories
//                if (scores[i] == '&bull;') continue;
//
                //Check the data is ok
  //              self.assert(scores[i]).isInt();

                //Output = [score] title
//                output.push('['+scores[i]+'] '+titles[i]);
//            }

            self.emit(titles);
        });
    }
}

exports.job = new nodeio.Job({timeout:10}, methods);
