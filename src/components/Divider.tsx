import styled from '@emotion/styled'
import { Divider as ADivider } from 'antd'
import 'antd/lib/divider/style/index.css'
import { vars } from 'theme/theme.css'

export const Divider = styled(ADivider)<{ margin?: string; color?: string }>`
  margin: ${({ margin }) => margin || '0'};

  &.ant-divider-vertical {
    border-left-color: ${({ color }) => color || vars.colors.border1};
    opacity: 1;
    top: 0;
  }
`
