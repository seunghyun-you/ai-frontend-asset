'use client';
import { ButtonProps } from '@chakra-ui/react';
// import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { Button } from '@chakra-ui/react';

// type LinkProps = ButtonProps & NextLinkProps;

let bgButton = 'linear-gradient(135deg, #868CFF 0%, #4318FF 100%)';

export default function Link({ href, children, ...props }: any) {
  return (
      <Button as="a" variant="a" {...props}>
          {children}
      </Button>
    // <NextLink href={href} passHref legacyBehavior>
    //   <Button as="a" variant="a" {...props}>
    //     {children}
    //   </Button>
    // </NextLink>
  );
}

// export default Link;
