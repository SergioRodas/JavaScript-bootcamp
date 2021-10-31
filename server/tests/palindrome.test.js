const { palindrome } = require('../utils/for_testing')

test('palindrome of Sergio Rodas', () => {
    const result = palindrome('sergio')

    expect(result).toBe('oigres')
})

test('palindrome of empty string', () => {
    const result = palindrome('')

    expect(result).toBe('')
})

test('palindrome of undefined', () => {
    const result = palindrome()

    expect(result).toBeUndefined()
})