import React, { ReactElement, useState, useRef, useEffect } from 'react';

import * as S from './style';

import { START, PAUSE, RESET, RESUME } from 'commons/string';
import { Button } from 'components';
import timerDrawer from './drawer';

function Timer(): ReactElement {
  const [isStarted, setIsStarted] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const canvasRef = useRef<SVGSVGElement | null>(null);

  const buttonSize = {
    width: '49%',
    height: '10%',
  };

  useEffect(() => {
    timerDrawer.draw(canvasRef.current);
  }, []);

  window.onresize = (): void => {
    timerDrawer.draw(canvasRef.current);
  };

  return (
    <S.Container>
      <svg width={'60vmin'} height={'60vmin'} ref={canvasRef}></svg>
      <S.ButtonContainer>
        {!isStarted ? (
          <>
            <Button
              onClick={(): void => {
                setIsStarted(true);
                setIsPause(false);
                timerDrawer.reset();
                timerDrawer.draw(canvasRef.current);
              }}
              {...buttonSize}
            >
              {RESET}
            </Button>

            <Button
              onClick={(event): void => {
                setIsPause(!isPause);
                if (isPause) {
                  timerDrawer.start();
                  return;
                }

                timerDrawer.pause();
              }}
              {...buttonSize}
            >
              {isPause ? RESUME : PAUSE}
            </Button>
          </>
        ) : (
          <Button
            onClick={(event): void => {
              setIsStarted(false);
              setIsPause(false);
              timerDrawer.start();
            }}
            {...buttonSize}
            width={'100%'}
          >
            {START}
          </Button>
        )}
      </S.ButtonContainer>
    </S.Container>
  );
}

export default Timer;
