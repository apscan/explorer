import { createGlobalTheme, createGlobalThemeContract } from '@vanilla-extract/css'

const themeContractValues = {
  colors: {
    link: '',
    linkHover: '',
    backgroundMain: '',
    backgroundSecondary: '',
    border1: '',
    border2: '',
    border3: '',
    badgeBg1: '',
    tooltipBg: '',
    theadBg: '',
    buttonBg1: '',
  },
  text: {
    heading: '',
    headingSecondary: '',
    body: '',
    header: '',
    secondary: '',
    secondaryHover: '',
  },
}

export type Theme = typeof themeContractValues

export const themeVars = createGlobalThemeContract(
  themeContractValues,
  (_, path) => `ap-${path.join('-')}`
)

export const darkTheme: Theme = {
  colors: {
    link: '#3498db',
    linkHover: '#1d6fa5',
    backgroundMain: '#00060D',
    backgroundSecondary: '#000',
    border1: '#e7eaf3',
    border2: '#e7eaf3c0',
    border3: '#d5dae2',
    badgeBg1: 'rgba(119, 131, 143,.1)',
    tooltipBg: '#21325b',
    theadBg: '#f8fafd',
    buttonBg1: '#3498db1a',
  },
  text: {
    heading: '#4a4f55',
    headingSecondary: '#4a4f55cc',
    body: '#1e2022',
    header: '#6c757e',
    secondary: '#77838f',
    secondaryHover: '#545d66',
  },
}

export const lightTheme: Theme = {
  colors: {
    link: '#3498db',
    linkHover: '#1d6fa5',
    backgroundMain: '#fff',
    backgroundSecondary: '#fff',
    border1: '#e7eaf3',
    border2: '#e7eaf3c0',
    border3: '#d5dae2',
    badgeBg1: 'rgba(119,131,143,.1)',
    tooltipBg: '#21325b',
    theadBg: '#f8fafd',
    buttonBg1: '#3498db1a',
  },
  text: {
    heading: '#4a4f55',
    headingSecondary: '#4a4f55cc',
    body: '#1e2022',
    header: '#6c757e',
    secondary: '#77838f',
    secondaryHover: '#545d66',
  },
}

export const vars = createGlobalTheme(':root', {
  breakpoints: {
    sm: '1080px',
    lg: '1400px',
  },
  sizes: {
    body: '1200px',
  },
  colors: {
    ...themeVars.colors,
    badgeWarning: '#db9a04',
    primary: '#3498db',
    bannerBg: '#21325b',
    badgeBg: 'rgba(52, 152, 219,.1)',
    paginationDisable: '#8c98a4',
    bgSuccess: 'rgba(0, 201, 167,.1)',
    bgError: 'rgba(222, 68, 55,.1)',
  },
  text: {
    ...themeVars.text,
    success: '#00c9a7',
    error: '#de4437',
  },
  shadows: {
    shadow1: '0 8px 20px rgb(52 152 219 / 8%)',
    shadow2: '0 1px 10px rgb(151 164 175 / 10%)',
    shadow3: '0 0.5rem 1.2rem rgb(189 197 209 / 20%)',
    shadow4: '0 4px 11px rgb(52 152 219 / 35%)',
    searchShadow1: '0 6px 24px 0 rgba(140, 152, 164,.125)',
  },
})
