import React, { ReactElement } from 'react';

import * as S from './style';

function Footer(): ReactElement {
  return (
    <S.Container>
      <S.Content>
        Made by <a href="https://github.com/doong-jo">doong-jo</a>
      </S.Content>
    </S.Container>
  );
}

export default Footer;
