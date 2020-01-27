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
  box-shadow: 0px 0px 0px 0px;
  color: ${palette('black')};
  font-size: 4rem;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  transition: box-shadow ease 0.2s;

  &:hover {
    box-shadow: 0px 5px 4px 1px;
  }

  &:active {
    box-shadow: 0px 0px 0px 0px;
  }
`;
