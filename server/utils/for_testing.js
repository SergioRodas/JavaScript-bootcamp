const palindrome = (string) => {
    // return undefined ↓
    if (typeof string === 'undefined') return

    return string
        // Turns it into an array
        .split('')
        // Turns it over
        .reverse()
        // Turns it into a string
        .join('')
}

const average = array => {
    if (typeof array === 'undefined') return
    if (array.length === 0) return 0
    let sum = 0
    array.forEach(num => {sum += num})
    return sum / array.length 
}

module.exports = {
    palindrome,
    average
}