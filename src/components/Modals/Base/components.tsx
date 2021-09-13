import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: var(--modal-bg-color);
  z-index: 50;
`

export const Wrapper = styled.div`
  width: 100%;
  padding: 32px;
  display: flex;
  justify-content: center;
`
