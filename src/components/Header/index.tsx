import React, { ReactElement } from 'react';

import * as S from './style';
import { APP_NAME } from 'commons/string';

function Header(): ReactElement {
  return (
    <S.Container>
      <S.Title>{APP_NAME}</S.Title>
      <iframe
        src="https://ghbtns.com/github-btn.html?user=doong-jo&repo=react-t2m-timer&type=star&count=true&size=large"
        title={'GitHub'}
        scrolling={'0'}
        width={'160px'}
        height={'30px'}
        frameBorder={'0'}
      ></iframe>
    </S.Container>
  );
}

export default Header;
