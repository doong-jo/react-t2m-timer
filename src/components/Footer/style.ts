import styled from 'styled-components';
import { palette } from 'styled-tools';

export const Container = styled.footer`
  text-align: center;
`;

export const Content = styled.p`
  color: ${palette('grayscale', 1)};

  a {
    color: ${palette('primary')};
  }
`;
