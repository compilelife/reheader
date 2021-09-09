
function extractHeader(content) {
    //reference: https://daringfireball.net/projects/markdown/syntax#header
    /**
Setext-style headers are “underlined” using equal signs (for first-level headers) and dashes (for second-level headers). For example:

This is an H1
=============

This is an H2
-------------
Any number of underlining =’s or -’s will work.

Atx-style headers use 1-6 hash characters at the start of the line, corresponding to header levels 1-6. For example:

# This is an H1

## This is an H2

###### This is an H6
Optionally, you may “close” atx-style headers. This is purely cosmetic — you can use this if you think it looks better. The closing hashes don’t even need to match the number of hashes used to open the header. (The number of opening hashes determines the header level.) :

# This is an H1 #

## This is an H2 ##

### This is an H3 ######
     */

    const lines = content.split('\n')

    const atxPattern = /^(?<levelStr>#+) ((\d+\. )|((\d+\.)+\d+ ))?(?<text>.*)/
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let matched = line.match(atxPattern)
        if (matched) {
            const {levelStr, text} = matched.groups
            lines[i] = {
                level: levelStr.length,
                levelStr,
                text
            }
        }
        //TODO: Setext-style
    }

    return lines
}

function addNumber(lines) {
    /**
     * use stack to store current level number
     * 
     * 1. init empty stack
     * 2. get a header from line
     * 3. if header level > stack size, push ones into stack till header level == stack size, use 1
     * 4. else if header level == stack size, use stack.top.value + 1
     * 5. else (header level < stack size), pop stack till header level == stack size, then use stack.top.value += 1
     */
    const levelStack = []
    for (const line of lines) {
        if (!line.level)
            continue

        if (line.level > levelStack.length) {
            const interLevels = new Array(line.level - levelStack.length)
            for (let i = 0; i < interLevels.length; i++) {
                interLevels[i] = 1;
            }
            levelStack.push(...interLevels)
        } else if (line.level < levelStack.length) {
            levelStack.splice(line.level)
            levelStack[levelStack.length - 1]++
        } else {
            levelStack[levelStack.length - 1]++
        }

        if (levelStack.length === 1) {
            line.numStr = `${levelStack[0]}.`
        } else {
            line.numStr = levelStack.join('.')
        }
    }
}

function assemble(lines) {
    let s = ''
    for (const line of lines) {
        if (line.numStr) {
            s += `${line.levelStr} ${line.numStr} ${line.text}`
        }
        else {
            s += line
        }
        s += '\n'
    }
    return s.slice(0, s.length-1)
}

module.exports = function (content) {
    //1. extract markdown header info
    const lines = extractHeader(content)
    //2. set new number
    addNumber(lines)
    //3. assemble
    return assemble(lines)
}