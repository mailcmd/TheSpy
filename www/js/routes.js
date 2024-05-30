
var routes = [
  {
    path: '/',
    url: './index.html',
    name: 'index',
  },
  {
    path: '/settings',
    name: 'settings',
    async: process_template
  },
  {
    path: '/wordlist',
    name: 'wordlist',
    async: process_template
  },
  {
    path: '/game',
    name: 'game',
    options: {
      transition: 'f7-cover-v',
    },
    async: process_template
  },
  {
    path: '/countdown',
    name: 'countdown',
    options: {
      transition: 'f7-fade',
    },
    async: process_template
  }  
];
