var nodeio = require('node.io');
var methods = {
    input: ['tt0412142' // House
           ,'tt1327801' //Glee
           ,'tt0439100' // Weeds
           //,'tt1844923' // Friday Night Dinner
           ,'tt0380136' // QI
           ],
    run: function (keyword) {
        var self = this, results;
        this.getHtml('http://www.imdb.com/title/' + encodeURIComponent(keyword) + '/episodes', function (err, $) {
            //Handle any request / parsing errors
            if (err) self.exit(err);
            
            var dates = [], titles = [], output;
            
            output = '\nNext episode of ' + $('a.main').text + '\n============================================\n';
            
            $('div.season-filter-all div.filter-all span.less-emphasis strong').each(function(div) {
                dates.push(div.fulltext); 
            });
            
            $('div.season-filter-all div.filter-all h3').each(function(div) {
                titles.push(div.fulltext); 
            });
            
            if (dates.length != titles.length) {
                self.exit('Title / date mismatch (' + dates.length + '/' + titles.length + ')');
            }
            var found = false;
            for (var i = 0, len = dates.length; i < len; i++) {
                var date = new Date(dates[i] + ' 20:00:00 GMT-0500')
                if (found || (date < new Date())) continue;
                
                found = true;
                output += titles[i] + '\n' + date + '\n';
            }
            self.emit(output);
        });
    }
}

exports.job = new nodeio.Job({timeout:10}, methods);
