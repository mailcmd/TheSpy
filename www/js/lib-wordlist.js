function page_load_wordlist() {
    // nada por ahora
}

function save_wordlist() {
    categoriesEnabled = $('#category-list input[type="checkbox"]').filter( c =>  c.checked ).map( c =>  c.value );
    localStorage.setItem('categories', categoriesEnabled.join(','));
}