export function showContent() {
    $('.first').addClass('is-primary');
    $('.second').removeClass('is-primary');
    $('.third').removeClass('is-primary');
    $('.profile').removeClass('is-hidden');
    $('.timeline-content').removeClass('is-hidden');
}

export function loading() {
    const stopLoading = () => {
        $('.loader').addClass('is-hidden');
        $('.profile').removeClass('is-hidden');
        $('.timeline-content').removeClass('is-hidden');
    }
    $('.loader').removeClass('is-hidden');
    $('.profile').addClass('is-hidden');
    $('.timeline-content').addClass('is-hidden');
    setTimeout(stopLoading, 2000);
}

export function wrongName() {
    alert('Please input alphanumeric characters only');
    $('.enter-username').addClass('is-danger');
}


export function showTime(givenDate) {
    const monthsArr = ["Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug", "Sept",
        "Oct", "Nov", "Dec"
    ];

    let dateObj = new Date(givenDate)

    let year = dateObj.getFullYear();
    let month = dateObj.getMonth();
    let numDay = dateObj.getDate();

    let output = monthsArr[month] + " " + numDay + ", " + year;

    return output;
}