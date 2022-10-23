import { BoxProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { BaseButton } from 'components/buttons'
import { Icon } from 'components/Icon'
import React from 'react'
import { vars } from 'theme/theme.css'
import { ReactComponent as Expand } from 'assets/icons/expand.svg'
import { AnimatePresence, motion, Variants } from 'framer-motion'

const itemVariants: Variants = {
  collapsed: {},
  expanded: { transform: 'rotate(90deg)' },
}

export const ExpandButton = ({
  fallback,
  isDisabled,
  expanded,
  ...props
}: { fallback?: React.ReactNode; isDisabled?: boolean; expanded: boolean } & BoxProps) => {
  if (isDisabled) return <>{fallback}</>

  return (
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
          as={Expand}
        />
      </motion.div>
    </BaseButton>
  )
}
