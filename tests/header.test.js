const numbers = /((\d+\. )|((\d+\.)+\d+ ))?/

const valids = [
    '',
    '1. ',
    '10. ',
    '1.1 ',
    '1.10 ',
    '1.1.1 ',
]

for (const valid of valids) {
    test(valid, ()=>expect(valid).toMatch(numbers))
}
