const reheader = require('../index')
const fs = require('fs')

const prefix = './tests/data/'
const names = fs.readdirSync(prefix)
    .filter(name=>name.endsWith('.tobe.md'))
    .map(name=>name.slice(0, name.indexOf('.')))

for (const name of names) {
    test(name, ()=>{
        expect(reheader(fs.readFileSync(prefix+name+'.md', 'utf-8')))
            .toBe(fs.readFileSync(prefix+name+'.tobe.md', 'utf-8'))
    })
}