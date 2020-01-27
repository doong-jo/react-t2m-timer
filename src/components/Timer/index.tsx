import React, { ReactElement, useState, useRef, useEffect } from 'react';

import * as S from './style';

import { START, PAUSE, RESET, RESUME } from 'commons/string';
import { Button } from 'components';
import timerDrawer from './drawer';

function Timer(): ReactElement {
  const [isStarted, setIsStarted] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const canvasRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    timerDrawer.draw(canvasRef.current);
  }, []);

  return (
    <S.Container>
      <svg width={'65vh'} height={'65vh'} ref={canvasRef}></svg>
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
              width={'49%'}
              height={'10vh'}
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
              width={'49%'}
              height={'10vh'}
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
            width={'100%'}
            height={'10vh'}
          >
            {START}
          </Button>
        )}
      </S.ButtonContainer>
    </S.Container>
  );
}

export default Timer;
