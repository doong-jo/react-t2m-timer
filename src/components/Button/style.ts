import styled from 'styled-components';
import { prop, palette } from 'styled-tools';

import { Props } from '.';

type OmitButton = Omit<Props, 'children'>;

export const Button = styled.div<OmitButton>`
  width: ${prop('width')};
  height: ${prop('height')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 2px solid ${palette('black')};
  box-shadow: 3px 3px 0px 0px;
  color: ${palette('black')};
  font-size: 4rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: box-shadow ease 0.2s;

  &:active {
    box-shadow: 0px 0px 0px 0px;
  }
`;
