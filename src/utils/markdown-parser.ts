/**
 * markdown代码高亮处理
 *
 * marked官网：https://marked.js.org/
 * highlight样式： https://highlightjs.org/demo
 */

import { Marked, Renderer } from 'marked'
import hljs from 'highlight.js'
// 引入高亮样式
import 'highlight.js/styles/atom-one-light.css'
//import 'highlight.js/styles/atom-one-dark.css';

const copy_code = '复制代码'

const renderer = new Renderer()
renderer.code = (token: any) => {
  //console.log('token:', token)
  const rawCode: string = token.raw
  const code: string = token.text
  const lang: string = token.lang
  if (lang) {
    try {
      const orgLanguage = lang
      // 由于highlight.js不支持vue的<template>， 暂时当做Javascript处理
      const language = lang === 'vue' ? 'Javascript' : lang;

      const highlightedCode = hljs.highlight(code, { language }).value
      return `<pre><div class="code-block-header""><span class="code-block-header-lang">${orgLanguage}</span>&nbsp;&nbsp;<span class="code-block-header-copy">${copy_code}</span></div><code class="hljs ${language}">${highlightedCode}</code></pre>`
    } catch (e) {
      console.error(`Error highlighting code: ${e}`)
    }
  }
  return `<pre><code>${code}</code></pre>`
}

const marked = new Marked()
marked.setOptions({
  renderer
})

marked.use({
  pedantic: false,  // 是否严格遵循Markdown规范，禁用一些不标准但广泛接受的语法
  gfm: true  // 启用GitHub-flavored Markdown
})


export function parseMarkdown(markdownText: string) {
  return marked.parse(markdownText)
}