import styled from 'styled-components';
import { Button } from 'components/Button/style';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 1rem 3vmin;

  ${Button} {
    font-size: 5vmin;
  }
`;
