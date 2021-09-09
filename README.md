这是一个用于给markdown文件的标题自动编号的工具

This is a handy tool to smartly add chapter numbers to markdown headers

# Usage

你可以把它当shell工具使用：

You can use it as a shell tool

```shell
npm i -g @compilelife/reheader

reheader /path/to/your/file.md
```

或者是用在项目里

or, in project:

```shell
npm i -S @compilelife/reheader
```

```js
const reheader = require('@compilelife/reheader')

console.log(reheader('# h1'))
//# 1. h1
```

# Todo

- [ ] support Setext-style headers
- [ ] support various number style
- [ ] plugin for vscode/typora/...