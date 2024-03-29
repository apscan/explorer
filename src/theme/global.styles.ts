import { css } from '@emotion/react'

export const globalCSS = css`
  * {
    border-width: 0px;
    border-width: 0px;
    box-sizing: border-box;
  }

  html,
  body,
  h1,
  input,
  select {
    font-family: Helvetica, Arial, sans-serif;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'ss01' on, 'cv01' on, 'cv03' on, 'calt' off, 'zero' off;
    height: 100%;
  }

  body {
    font-size: 14px;
    font-weight: 400;
    position: relative;
    min-height: 100%;
    line-height: 1.5;
  }

  #root {
    min-height: 100%;
    height: 100%;
  }

  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  /* fix scoller width */
  /* html {
    margin-left: calc(100vw - 100%);
    margin-right: 0;
  } */
`
