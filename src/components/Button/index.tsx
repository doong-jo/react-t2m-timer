import React, { ReactElement } from 'react';

import * as S from './style';

export interface Props {
  width: string;
  height: string;
  children: string | ReactElement;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function Button({ onClick, width, height, children }: Props): ReactElement {
  return (
    <S.Button onClick={onClick} width={width} height={height}>
      {children}
    </S.Button>
  );
}

export default Button;
