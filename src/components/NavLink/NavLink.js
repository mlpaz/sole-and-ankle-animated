import React from "react";
import styled from "styled-components/macro";

import { WEIGHTS } from "../../constants";

const NavLink = ({ href, children, ...delegated }) => {
  return (
    <LinkWrapper href={href} {...delegated}>
      <Link>{children}</Link>
      <HoverLink>{children}</HoverLink>
    </LinkWrapper>
  );
};

const LinkWrapper = styled.a`
  display: flex;
  flex-direction: column;
  height: 2rem;
  overflow: hidden;
  font-size: 1.125rem;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};

  &:first-of-type {
    color: var(--color-secondary);
  }
`;
const Link = styled.span`
  transition: transform 200ms;
  ${LinkWrapper}:hover & {
    transform: translateY(-100%);
  }
  display: inline-block;
`;

const HoverLink = styled.span`
  font-weight: ${WEIGHTS.bold};
  transition: transform 300ms;
  display: inline-block;
  ${LinkWrapper}:hover & {
    transform: translateY(-100%);
  }
`;
export default NavLink;
