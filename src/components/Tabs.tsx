import styled from '@emotion/styled'
import { Tabs as ATabs } from 'antd'
import 'antd/lib/tabs/style/index.css'
import { vars } from 'theme/theme.css'

export const Tabs = styled(ATabs)`
  font-feature-settings: 'ss01', 'case', 'calt' off;
  font-variant: none;
  font-weight: 500;
  color: ${vars.text.headingSecondary};

  &.ant-tabs-top > .ant-tabs-nav,
  &.ant-tabs-bottom > .ant-tabs-nav,
  &.ant-tabs-top > div > .ant-tabs-nav,
  &.ant-tabs-bottom > div > .ant-tabs-nav {
    margin: 0;
  }

  &.ant-tabs-large > .ant-tabs-nav .ant-tabs-tab {
    padding: 12px 12px;
  }
  & .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: ${vars.colors.link};
  }

  & .ant-tabs-ink-bar {
    background: ${vars.colors.link};
  }

  &.ant-tabs > div > .ant-tabs-nav .ant-tabs-nav-add:hover {
    color: ${vars.colors.link};
  }

  .ant-tabs-tab:hover {
    color: ${vars.colors.link};
  }
`

export const TabPane = styled(ATabs.TabPane)``
