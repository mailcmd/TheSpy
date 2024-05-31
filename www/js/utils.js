function process_template({ app, to, resolve }) {
    // Requested route
    //console.log(to);
    // Get external data and return page content
    fetch(to.name+'.html')
      .then((res) => res.text())
      .then((html) => resolve( { content: eval('`'+html+'`') } ));
}

function capitalize(word) {
    return word[0].toUpperCase() + word.substring(1);
}

Array.prototype.shuffle = function (a,b,c,d){
 a=this;c=a.length;while(c)b=Math.random()*c--|0,d=a[c],a[c]=a[b],a[b]=d;
}