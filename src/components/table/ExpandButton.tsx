import { BoxProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { ReactComponent as Expand } from 'assets/icons/expand.svg'
import { ReactComponent as ExpandAll } from 'assets/icons/expand-all.svg'
import { BaseButton } from 'components/buttons'
import { Icon } from 'components/Icon'
import { motion, Variants } from 'framer-motion'
import React from 'react'
import { vars } from 'theme/theme.css'
import { Tooltip } from 'components/Tooltip'

const itemVariants: Variants = {
  collapsed: {},
  expanded: { transform: 'rotate(90deg)' },
}

export const ExpandButton = ({
  fallback,
  isDisabled,
  expanded,
  expandAll,
  ...props
}: { fallback?: React.ReactNode; isDisabled?: boolean; expanded: boolean; expandAll?: boolean } & BoxProps) => {
  if (isDisabled) return <>{fallback}</>

  return (
    <Tooltip label={!expanded ? (expandAll ? 'Expand All' : 'Expand') : expandAll ? 'Collapse All' : 'Collapse'}>
      <BaseButton
        css={css`
          cursor: pointer;
          border-radius: 4px;
          color: ${vars.text.heading};
          padding: 0 6px;
          height: 20px;
          min-width: auto;
        `}
        {...(props as any)}
      >
        <motion.div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          variants={itemVariants}
          animate={expanded ? 'expanded' : 'collapsed'}
        >
          <Icon
            css={css`
              width: 16px;
              height: 16px;
            `}
            as={expandAll ? ExpandAll : Expand}
          />
        </motion.div>
      </BaseButton>
    </Tooltip>
  )
}
