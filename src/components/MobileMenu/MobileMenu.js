/* eslint-disable no-unused-vars */
import React from "react";
import styled, { keyframes } from "styled-components/macro";

import { WEIGHTS } from "../../constants";

import UnstyledButton from "../UnstyledButton";
import Icon from "../Icon";
import VisuallyHidden from "../VisuallyHidden";

const navLinkList = [
  { href: "/sale", content: "Sale" },
  { href: "/new", content: "New Releases" },
  { href: "/men", content: "Men" },
  { href: "/women", content: "Women" },
  { href: "/kids", content: "Kids" },
  { href: "/collections", content: "Collections" },
];

const MobileMenu = ({ isOpen, onDismiss }) => {
  React.useEffect(() => {
    function handleKeydown(ev) {
      if (ev.key === "Escape") {
        onDismiss();
      }
    }
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
  const { backdropStyles, modalStyles } = getTransitionStyles(isOpen);
  const contentDelay = isOpen ? 300 : 600;
  const footerDelay = contentDelay + (navLinkList.length + 1) * 100;

  return (
    <Overlay
      isOpen={isOpen}
      onDismiss={onDismiss}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      <Backdrop style={{ opacity: isOpen ? 1 : 0, ...backdropStyles }} />
      <Content
        aria-label="Menu"
        style={{
          transform: isOpen
            ? "translateX(0%)  rotateY(0deg) "
            : "translateX(35%) rotateY(-75deg) ",
          ...modalStyles,
        }}
      >
        <CloseButton onClick={onDismiss}>
          <Icon id="close" />
          <VisuallyHidden>Dismiss menu</VisuallyHidden>
        </CloseButton>
        <Filler />
        <Nav>
          {navLinkList.map((navLink, i) => {
            const delay = contentDelay + i * 100;
            return (
              <NavLink
                key={`${navLink.content}-${i}`}
                href={navLink.href}
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(12px)",
                  transitionDelay: `${delay}ms`,
                }}
              >
                {navLink.content}
              </NavLink>
            );
          })}
        </Nav>
        <Footer
          style={{
            opacity: isOpen ? 1 : 0,
            transitionDelay: `${footerDelay}ms`,
          }}
        >
          <SubLink href="/terms">Terms and Conditions</SubLink>
          <SubLink href="/privacy">Privacy Policy</SubLink>
          <SubLink href="/contact">Contact Us</SubLink>
        </Footer>
      </Content>
    </Overlay>
  );
};

function getTransitionStyles(isOpen) {
  return {
    backdropStyles: {
      transition: "opacity",
      transitionDuration: isOpen ? "600ms" : "600ms",
      transitionDelay: isOpen ? "0ms" : "100ms",
    },
    modalStyles: {
      transition: "transform",
      transitionDuration: isOpen ? "400ms" : "600ms",
      transitionDelay: isOpen ? "250ms" : "0ms",
      transitionTimingFunction: isOpen
        ? "cubic-bezier(0,2.07,.83,.67)"
        : "cubic-bezier(0,1.17,1,.01)",
    },
  };
}

const Overlay = styled.div`
  perspective: "150px";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: var(--color-backdrop);
`;

const Content = styled.div`
  --overfill: 16px;
  transform-origin: center right;
  position: absolute;
  right: 0px;
  background: white;
  margin-right: calc(var(--overfill) * -1);
  width: calc(300px + var(--overfill));
  height: 100%;
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled(UnstyledButton)`
  position: absolute;
  top: 10px;
  right: var(--overfill);
  padding: 16px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavLink = styled.a`
  transition: opacity 200ms ease-in, transform 200ms ease-in;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};
  text-decoration: none;
  font-size: 1.125rem;
  text-transform: uppercase;

  &:first-of-type {
    color: var(--color-secondary);
  }
`;

const Filler = styled.div`
  flex: 1;
`;
const Footer = styled.footer`
  transition: opacity 250ms ease-in;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 14px;
  justify-content: flex-end;
`;

const SubLink = styled.a`
  color: var(--color-gray-700);
  font-size: 0.875rem;
  text-decoration: none;
`;

export default MobileMenu;
