import { ReactNode } from 'react'

import { LinkProps, Card as UICard } from '@nextui-org/react'

interface CardProps extends Pick<LinkProps, 'href'> {
  children: ReactNode
}

export const Card = ({ children, ...props }: CardProps) => {
  return (
    <UICard
      as="a"
      isHoverable
      css={{
        p: '$10',
        alignItems: 'flex-start',
        textAlign: 'left',
        '@hover': {
          borderColor: '$primaryBorder'
        },
        transition: '$card',
        '@xs': {
          flexBasis: 'auto'
        },
        '@sm': {
          flexBasis: '45%'
        }
      }}
      {...props}
    >
      {children}
    </UICard>
  )
}
