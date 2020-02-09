window.onload = function () {
    const setTooltip = (message) => {
        $(".lg-tooltip").html(message)
    }

    const showCheckmark = () => {
        $('div#lg-checkmark').removeClass('lg-progress-hidden')
        $('div#spinner-list-gen').addClass('lg-progress-hidden')
        $('div#lg-error').addClass('lg-progress-hidden')
    }

    const showSpinner = () => {
        $('div#spinner-list-gen').removeClass('lg-progress-hidden')
        $('div#lg-checkmark').addClass('lg-progress-hidden')
        $('div#lg-error').addClass('lg-progress-hidden')
    }

    const showError = () => {
        $('div#lg-error').removeClass('lg-progress-hidden')
        $('div#spinner-list-gen').addClass('lg-progress-hidden')
        $('div#lg-checkmark').addClass('lg-progress-hidden')
    }

    let listState;

    const checkListState = () => {
        $.getJSON('/lg/gendate/'
        ).done(r => {
            if ('generating' in r) {
                setTooltip('Listen werden generiert.')
                showSpinner();
            } else {
                const genDate = new Date(r.list_generation_date);
                let compareTo = new Date()
                compareTo = compareTo.setDate(compareTo.getDate() - 3)
                const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                const locale = genDate.toLocaleDateString("de-CH", options)
                if (compareTo < genDate.getTime()) {
                    showCheckmark();
                } else {
                    showError();
                }
                clearInterval(listState)
                setTooltip(`Erstellt: ${locale}`)
            }
        }
        ).fail(r => {
            showError();
            setTooltip('Unklarer Listenstatus.')
            clearInterval(listState);
        })
    }

    
    $('a#generateLists').click(function (e) {
        e.preventDefault();
        showSpinner();
        $.get('/lg/listgen/'
        ).done(function (r) {
            clearInterval(listState);
            listState = setInterval(checkListState, 1000);
        }).fail(function (r) {
            showError();
            setTooltip('Fehler beim Generieren der Listen.');
        });
    })

    listState = setInterval(checkListState, 1000)

}
