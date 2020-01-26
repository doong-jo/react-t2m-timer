import React, { ReactElement, useState, useRef, useEffect } from 'react';

import * as S from './style';
import { Button } from 'components';
import timerDrawer from 'TimerDrawer';

interface Props {
  mode?: string;
  tick?: number;
}

function Timer({ mode, tick }: Props): ReactElement {
  const [isStarted, setIsStarted] = useState(true);
  const [, setIsPause] = useState(false);

  const canvasRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    timerDrawer.draw(canvasRef.current);
  }, []);
  return (
    <S.Container>
      <svg width={'60vh'} height={'60vh'} ref={canvasRef}></svg>
      <S.ButtonContainer>
        {!isStarted ? (
          <>
            <Button
              onClick={(event): void => {
                setIsStarted(true);
                setIsPause(false);
              }}
              width={'49%'}
              height={'10vh'}
            >
              RESET
            </Button>
            <Button
              onClick={(event): void => {
                setIsPause(true);
              }}
              width={'49%'}
              height={'10vh'}
            >
              PAUSE
            </Button>
          </>
        ) : (
          <Button
            onClick={(event): void => {
              setIsStarted(false);
              setIsPause(false);
            }}
            width={'100%'}
            height={'10vh'}
          >
            START
          </Button>
        )}
      </S.ButtonContainer>
    </S.Container>
  );
}

export default Timer;
