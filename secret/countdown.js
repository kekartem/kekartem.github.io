function format_time(number) {
    if (number < 10) {
        return '0' + number
    }
    return number
}

let days_field = document.querySelector('.days')
let hours_field = document.querySelector('.hours')
let minutes_field = document.querySelector('.minutes')
let seconds_field = document.querySelector('.seconds')

let now = new Date()
let till = new Date(2022, 11, 26, 2, 50, 0)
let left_ms = new Date(till - now)
if (till < now) {
    days_field.innerHTML = '00'
    hours_field.innerHTML = '00'
    minutes_field.innerHTML = '00'
    seconds_field.innerHTML = '00'
} else {
    let left_days = Math.floor(left_ms / 86400000)
    let left_hours = Math.floor((left_ms % 86400000) / 3600000)
    let left_minutes = Math.floor(((left_ms % 86400000) % 3600000) / 60000)
    let left_seconds = Math.floor((((left_ms % 86400000) % 3600000) % 60000) / 1000)

    days_field.innerHTML = format_time(left_days)
    hours_field.innerHTML = format_time(left_hours)
    minutes_field.innerHTML = format_time(left_minutes)
    seconds_field.innerHTML = format_time(left_seconds)

    setInterval(function() {
        left_seconds -= 1
        seconds_field.innerHTML = format_time(left_seconds)
        if (left_seconds == -1) {
            left_seconds = 59
            seconds_field.innerHTML = left_seconds
            left_minutes -= 1
            minutes_field.innerHTML = format_time(left_minutes)
            if (left_minutes == -1) {
                left_minutes = 59
                minutes_field.innerHTML = left_minutes
                left_hours -= 1
                hours_field.innerHTML = format_time(left_hours)
                if (left_hours == -1) {
                    left_hours = 23
                    hours_field.innerHTML = left_hours
                    left_days -= 1
                    days_field.innerHTML = format_time(left_days)
                }
                
            }
        }
    }, 1000)
}