import React from "react";
import styled from "styled-components/macro";

import { WEIGHTS } from "../../constants";

const FillNavLink = ({ href, children, ...delegated }) => {
  return (
    <LinkWrapper href={href} {...delegated}>
      <Link>{children}</Link>
      <HoverLink>{children}</HoverLink>
    </LinkWrapper>
  );
};

const LinkWrapper = styled.a`
  position: relative;
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
  display: inline-block;
`;

const HoverLink = styled.span`
  overflow: hidden;
  position: absolute;
  left: 0;
  width: 0;
  font-weight: bold;
  transition: width 200ms;
  display: inline-block;
  ${LinkWrapper}:hover & {
    width: 100%;
  }
`;
export default FillNavLink;
