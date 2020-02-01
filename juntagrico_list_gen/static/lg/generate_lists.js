window.onload = function () {
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

    const checkDate = () => {
        $.getJSON('/lg/gendate/'
        ).done(r => {
            const genDate = new Date(r.list_generation_date);
            let compareTo = new Date()
            compareTo = compareTo.setDate(compareTo.getDate() - 3)
            const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            const locale = genDate.toLocaleDateString("de-CH", options)
            $(".lg-tooltip").html(`Erstellt: ${locale}`)
            if (compareTo < genDate.getTime()) {
                showCheckmark();
            } else {
                showError();
            }
        }
        ).fail(r => {
            showError();
        })
    }

    $('a#generateLists').click(function (e) {
        e.preventDefault();
        $(".lg-tooltip").html('Listen werden generiert.')
        // show the spinner on click
        $('div#spinner-list-gen').removeClass('lg-progress-hidden')
        // hide checkmark and error
        $('div#lg-checkmark').addClass('lg-progress-hidden')
        $('div#lg-error').addClass('lg-progress-hidden')
        $.get('/lg/listgen/'
        ).done(function (r) {
            // show and animate checkmark
            showCheckmark();
            $('div#lg-checkmark').addClass('lg-popout')
            checkDate();
        }).fail(function (r) {
            $(".lg-tooltip").html('Irgendetwas ist falsch gelaufen.')
            // show the error
            showError()
        });
    })
    checkDate();
}
