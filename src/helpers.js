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