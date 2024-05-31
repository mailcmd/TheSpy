function page_load_game() {
    const words = [];
    categoriesEnabled.forEach( cat => words.push( ...wordList[cat] ) );
    $('#word')[0].innerHTML = words[(words.length * Math.random() + 1)|0];
    playerNumber = 1;    
    $('#player-id')[0].innerHTML = playerNumber;
    
    spiesQty = localStorage.getItem('spies')|0;
    playersOrder = Array(localStorage.getItem('players')|0).fill(0).map( (_,i) => i );
    playersOrder.shuffle();
}

function show_word(el) {
    el.parentNode.classList.add('flipped');
    if (playersOrder[playerNumber-1] < spiesQty) {
       $('.word').hide();
       $('.you-are-spy').show();
    } else {
       $('.word').show();
       $('.you-are-spy').hide();
    }
}

function hide_word(el) {
    el.parentNode.classList.remove('flipped');
    playerNumber++;
    if (playerNumber <= playersOrder.length) {
        $('#player-id')[0].innerHTML = playerNumber;    
        return;
    }
    // end of cycle
    app.views.main.router.navigate('/countdown')
}
