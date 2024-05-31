function page_load_settings() {
    const eye = $('#eye')[0];
    const players = $('#players')[0];
    const spies = $('#spies')[0];

    eye.checked = eval(localStorage.getItem('eye')) ?? false;
    if (eye.checked) {
        $('#logo-eye')[0].classList.remove('closing');
    } else {
        $('#logo-eye')[0].classList.add('closing');
    }

    players.value = playersQty;

    spies.value = spiesQty;
    spies.setAttribute('min', '1');
    spies.setAttribute('max', players.value - 1);

    $('#badge-spies')[0].innerHTML = spies.value;
    $('#badge-no-spies')[0].innerHTML = players.value - spies.value;

    players.onchange = save_settings;
    $('#spies').off('range:change').on('range:change', save_settings);
    spies.oninput = save_settings;  
    $('#direction')[0].value = roundDirection;  
}

function save_settings() {
    const eye = $('#eye')[0];
    const players = $('#players')[0];
    const spies = $('#spies')[0];

    if (eye.checked) {
        $('#logo-eye')[0].classList.remove('closing');
    } else {
        $('#logo-eye')[0].classList.add('closing');
    }       
    
    if (spies.value > players.value - 1) {
        spies.value = players.value - 1;
    }
    
    $('#badge-spies')[0].innerHTML = spies.value;
    $('#badge-no-spies')[0].innerHTML = players.value - spies.value;
    
    localStorage.setItem('eye', eye.checked);
    localStorage.setItem('players', players.value);
    localStorage.setItem('spies', spies.value);
    localStorage.setItem('no-spies', $('#badge-no-spies')[0].innerText);
    localStorage.setItem('roundDirection', $('#direction')[0].value);
    
    playersQty = players.value|0;
    spiesQty = spies.value|0;    
    roundDirection = $('#direction')[0].value|0;
}