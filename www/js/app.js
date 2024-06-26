var $;

// global vars
const wordList = {};
const wordCategories = [];
var categoriesEnabled = []; 
var currentWord = '';
var playerNumber = 1;
var playersOrder = [];
var playersQty = 6;
var spiesQty = 1;
var roundDirection = -1;
var firstTime = true;
var currentPage = null;

var app;

if (window.cordova) { 
    document.addEventListener('deviceready', onDeviceReady, false);
} else {
    onDeviceReady();
}

/////////////////////////////////////////////////////////////////////////////////////////
function onDeviceReady() {

    try {
        window.plugins.insomnia.keepAwake();
    } catch(e) {}

    $ = Dom7;

    app = new Framework7({
        name: 'The Spy', // App name
        theme: 'auto', // Automatic theme detection
        colors: {
            primary: '#e00a76',
        },
        el: '#app', // App root element
        routes: routes,
        on: {
            init: function() {
                // init some stuff
                if (eval(localStorage.getItem('eye')) ?? false) {
                    $('#logo-eye')[0].classList.remove('closing');
                }
                
                playersQty = (localStorage.getItem('players') ?? playersQty)|0;
                spiesQty = (localStorage.getItem('spies') ?? spiesQty)|0;
                roundDirection = eval(localStorage.getItem('roundDirection')) ?? roundDirection;
                
                // get word list
                fetch('data/word-list.txt')
                .then((response) => response.text())
                .then( (list) => {
                    const lines = list.split('\n');
                    let currentCategory = '';
                    for (let i = 0; i < lines.length; i++) {
                        if (!lines[i].trim()) continue;
                        const line = lines[i].trim();
                        const match = line.match(/\[\[(.+?)(?:\]\]|\n)/i);
                        if (match) {
                            currentCategory = match[1];
                            wordCategories.push(currentCategory);
                            wordList[currentCategory] = []
                        } else {
                            wordList[currentCategory].push(capitalize(line));
                        }
                    }
                    if (!localStorage.getItem('categories')) {
                        localStorage.setItem('categories', wordCategories.join(','));
                    }
                    categoriesEnabled = localStorage.getItem('categories').split(',');
                });            

            },
            pageInit: function(page) {
                
                if (firstTime) {
                    document.addEventListener('backbutton', function(e){
                        e.preventDefault();
                        if (app.views.main.history.length <= 1) {
                            try {
                                window.plugins.appMinimize.minimize();
                            } catch(e) {}
                            return;
                        } else if (app.views.main.history.length >= 3) {
                            app.views.main.router.navigate('/');
                            return;
                        }
                        app.views.main.router.back();
                    }, false);
                    firstTime = false;
                }

                currentPage = page;
                if (page.name == 'home') {
                } else if (page.name == 'settings') {
                    page_load_settings();
                } else if (page.name == 'wordlist') {
                    page_load_wordlist();
                } else if (page.name == 'game') {
                    page_load_game();
                }            
            },
            
        }
    });

    /*
    $(document).on('page:init', function (e) {
        const page = e.target;
        console.log(e)
    });
    */

    $(document).on('page:afterin', function (e) {
        const page = e.target;
        if (page.getAttribute('data-name') == 'home') {
            app.views.main.router.clearHistory();
            if (eval(localStorage.getItem('eye')) ?? false) {
                $('#logo-eye')[0].classList.remove('closing');
            }
        } else if (page.getAttribute('data-name') == 'settings') {
        } else if (page.getAttribute('data-name') == 'wordlist') {
        } else if (page.getAttribute('data-name') == 'game') {
        } else if (page.getAttribute('data-name') == 'countdown') {
            page_postload_countdown();
        }
    });
    
    try {
        window.addEventListener('beforeunload', window.plugins.insomnia.allowSleepAgain, false);
    } catch(e){}

}

function about() {
    const notificationCallbackOnClose = app.notification.create({
        icon: '<span class="material-icons color-green">extension</span>',
        title: 'My Playground Studio',
        titleRightText: '',
        subtitle: 'App creada sólo por diversión,... como todo lo que hacemos en My Playground Studio.',
        text: '',
        closeOnClick: true,
        on: {
            close: function () {
            },
        },
    });

    // Open it
    notificationCallbackOnClose.open();
}