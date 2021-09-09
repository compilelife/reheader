#!/usr/bin/env node

const reheader = require('../index')
const fs = require('fs')

function main() {
    const filePath = process.argv[2]

    const content = fs.readFileSync(filePath, 'utf-8')
    const converted = reheader(content)
    fs.writeFileSync(filePath, converted)
}

main()