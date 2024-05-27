var $ = Dom7;


var app = new Framework7({
  name: 'The Spy', // App name
  theme: 'auto', // Automatic theme detection
  colors: {
    primary: '#e00a76',
  },

  el: '#app', // App root element

  // App store
  store: store,
  // App routes
  routes: routes,
});