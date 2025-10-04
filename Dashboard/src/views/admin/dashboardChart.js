export const state = {
    series: [
        {
            name: 'Orders',
            data: [20, 30, 34, 23, 45, 50, 54, 57, 60, 65, 70, 94]
        },
        {
            name: 'Revenue',
            data: [10, 20, 24, 12, 14, 25, 30, 29, 40, 43, 50, 74]
        },
        {
            name: 'Sellers',
            data: [10, 20, 34, 43, 55, 60, 74, 87, 90, 75, 50, 44]
        }
    ],
    options: {
        xaxis: {
            categories: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
        },

        // colors: ['orange', 'darkturquoise','yellowgreen'],
        chart: {
            background: 'transparent',
            foreColor: 'var(--text)'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            curve: ['smooth', 'straight', 'stepline'],
            lineCap: 'butt',
            colors: "red",
            width: .5,
            dashArray: 0
        },
        legend: {
            position: 'top'
        },
        responsive: [
            {
                breakpoint: 550,
                options: {
                    chart: {
                        width: '100%'
                    }
                }
            }
        ]
    }
}