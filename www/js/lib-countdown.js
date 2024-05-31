function page_postload_countdown() {
    $('[data-name="countdown"] .circle').on('click', function(e) {
        if ($('[data-name="countdown"] .circle').reduce( (t, p) => t+(p.innerText|0), 0) >= spiesQty*playersQty) return;
        e.target.innerText = (e.target.innerText|0) + 1; 
    });
    $('[data-name="countdown"] .circle + div > i').on('click', function(e) {
        if ((e.target.parentElement.previousElementSibling.innerText|0) <= 0) return;
        e.target.parentElement.previousElementSibling.innerText = (e.target.parentElement.previousElementSibling.innerText|0) - 1; 
    });
    $('[data-name="countdown"] .range-knob-wrap').append(
        // '<i class="f7-icons" style="position: relative;top: -22px;left: -26px;background: var(--main-color);width: 4rem;height: 56px;line-height: 184%;filter: brightness(0.9);">lock_fill</i>'+
        // '<span class="material-icons" style="z-index: 10;position: absolute;left: 23px;color: var(--f7-navbar-text-color, var(--f7-bars-text-color));filter: invert(0.8);top: -5px;">forward</span>'
        '<i class="f7-icons" style="position: relative;top: -22px;left: -26px;background: var(--f7-navbar-text-color, var(--f7-bars-text-color));width: 4rem;height: 56px;line-height: 184%;filter: invert(0.9);border-right: 2px solid var(--f7-navbar-text-color, var(--f7-bars-text-color));">lock_fill</i>'+
        '<span class="material-icons" style="z-index: 10;position: absolute;left: 34px;color: var(--f7-navbar-text-color, var(--f7-bars-text-color));filter: invert(0.9);top: -7px;">forward</span>'
    );
    
    $('[data-name="countdown"] .range-slider').on('range:changed', function(e) {
        if (e.target.querySelector('input').value-0 >= 0.5) {
            app.range.setValue($('[data-name="countdown"] .range-slider')[0], 1);
        } else {
            app.range.setValue($('[data-name="countdown"] .range-slider')[0], 0);
        }
        
        if (e.target.querySelector('input').value-0 == 1) {
            $('[data-name="countdown"] .range-knob-wrap > i')[0].innerText = 'lock_open_fill';
            $('[data-name="countdown"] .circle.spy').forEach( c => c.style.filter = 'invert(1)' );
            endOfGame();
        } else {
            $('[data-name="countdown"] .range-knob-wrap > i')[0].innerText = 'lock_fill';        
            $('[data-name="countdown"] .circle.spy').forEach( c => c.style.filter = 'unset' );
        }        
    });
}

function endOfGame() {
    // Create notification
    const notificationCallbackOnClose = app.notification.create({
        icon: '<img src="assets/icons/app-icon.png" />',
        title: 'Fin del juego',
        titleRightText: '',
        subtitle: 'El juego ha terminado. ¡Felicitaciones a los gandarores y abucheos para los perdedores!',
        text: 'Click para ir al inicio',
        closeOnClick: true,
        on: {
            close: function () {
                app.views.main.router.navigate('/');
            },
        },
    });

    // Open it
    notificationCallbackOnClose.open();
}
