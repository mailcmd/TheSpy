Array.prototype.shuffle = function (a,b,c,d){
 a=this;c=a.length;while(c)b=Math.random()*c--|0,d=a[c],a[c]=a[b],a[b]=d;
}

////////////////////////////////////

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

/*
function showNotificationCallbackOnClose() {
    // Create notification
    notificationCallbackOnClose = $.notification.create({
        icon: '<img src="assets/icons/app-icon.png" />',
        title: 'Fin del juego',
        titleRightText: 'now',
        subtitle: 'El juego ha terminado. ¡Felicitaciones a los gandarores y abucheos para los perdedores!',
        text: 'Click para ir al inicio',
        closeOnClick: true,
        on: {
            close: function () {
                $f7.dialog.alert('Notification closed');
            },
        },
    });

    // Open it
    notificationCallbackOnClose.open();
}
*/