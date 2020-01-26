import styled from 'styled-components';
import { palette } from 'styled-tools';

export const Container = styled.header`
  display: flex;
  text-align: center;
  width: 100%;
  height: 5vh;
`;

export const Title = styled.h3`
  margin-right: 2rem;
  color: ${palette('grayscale', 1)};
`;
