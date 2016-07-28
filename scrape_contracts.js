var webPage = require('webpage');

var page = webPage.create();
var base_url = 'http://ca.indeed.com/jobs?q=Software+Developer&l=Montreal,+QC&radius=25&jt=contract&sort=date';
var url = base_url;
var next = "&start=";
var job_base_url = "http://ca.indeed.com/viewjob?jk=";



var result = 'success';
var offset = 0;
var max_offset = 80;


function phantomExit() {
  // do nothing  
}

function nextPage() {
    handlePage(url);
    offset += 10;
    url = base_url + next + offset.toString();    
    if (result === 'success' && offset < max_offset) {
        setTimeout(nextPage, 5000);
    } else
    {
        setTimeout(phantomExit, 5000);    
    }
}
    
function handlePage(uri) {    
    page.open(uri, function(status) {
       result = status;
       if ('success' === status && offset < max_offset) {
           var jobs = page.evaluate(function() {
                   return jobmap;
           });
           for(var i in jobs) {
               var title = JSON.stringify(jobs[i].title);
               var jurl = job_base_url + jobs[i].jk;
               console.log('<a href="' + jurl + '">' + title + '</a>' + '</br>' );
           }           
       } else {
           console.log('</body>');
           console.log('</html>');
           phantom.exit();               
       }
    });
}

console.log('<html>');
console.log('<body>');
nextPage();

