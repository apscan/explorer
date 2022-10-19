import { BoxProps } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { ReactComponent as ArrowNarrowUp } from 'assets/icons/arrow-narrow-up.svg'
import { Box } from 'components/container'
import { Icon } from 'components/Icon'
import { Link } from 'components/link'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useState } from 'react'

const itemVariants: Variants = {
  open: { height: 'auto' },
  closed: { height: 0, overflow: 'hidden' },
}

export const SeeMore = ({ children, ...props }: BoxProps) => {
  const [collapse, setCollapse] = useState(true)

  return (
    <>
      <AnimatePresence initial={false}>
        {!collapse && (
          <motion.div
            transition={{ type: 'ease', duration: 0.35 }}
            initial="closed"
            variants={itemVariants}
            animate="open"
            exit="closed"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <Link
        as={Box}
        css={css`
          display: inline-flex;
          align-items: center;
          padding: 16px 0;
          user-select: none;
        `}
        onClick={() => setCollapse(!collapse)}
        {...(props as any)}
      >
        Click to see {collapse ? 'More' : 'Less'}
        <Icon
          css={css`
            margin-left: 4px;
            transition: 0.2s ease-in-out;
            ${collapse &&
            css`
              transform: rotate(-180deg);
            `}
          `}
          height="16px"
          as={ArrowNarrowUp}
        />
      </Link>
    </>
  )
}
