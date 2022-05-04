import styled from "styled-components";
import { Link } from "react-router-dom";

export const FormInputs = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const ListWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
  justify-items: center;
  min-height: 100px;
  width: 100%;

  @media (min-width: 1024px) {
    max-width: 1000px;
    grid-template-columns: 1fr 1fr;
    gap: 20px 20px;
  }
`;

export const Info = styled.div`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
`;

export const Card = styled(Link)`
  width: 90%;
  max-width: 480px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  user-select: none;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-height: 280px;
  object-fit: cover;
`;

export const Caption = styled.p`
  font-size: 2.3rem;
  padding: 8px;
`;
