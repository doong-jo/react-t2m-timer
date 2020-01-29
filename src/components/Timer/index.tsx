import React, { ReactElement, useState, useRef, useEffect } from 'react';

import * as S from './style';

import { START, PAUSE, RESET, RESUME } from 'commons/string';
import { Button } from 'components';
import timerDrawer from './drawer';
import { TIMER_CANVAS_SIZE, TIMER_BUTTON_SIZE } from 'commons/dimen';

function Timer(): ReactElement {
  const [isStarted, setIsStarted] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const canvasRef = useRef<SVGSVGElement | null>(null);

  function handlerResetClicked(): void {
    setIsStarted(true);
    setIsPause(false);
    timerDrawer.reset();
    timerDrawer.draw(canvasRef.current);
  }

  function handlerPauseClicked(): void {
    setIsPause(!isPause);
    if (isPause) {
      timerDrawer.start();
      return;
    }

    timerDrawer.pause();
  }

  function handlerStartClicked(): void {
    setIsStarted(false);
    setIsPause(false);
    timerDrawer.start();
  }

  useEffect(() => {
    timerDrawer.draw(canvasRef.current);
  }, []);

  window.onresize = (): void => {
    timerDrawer.draw(canvasRef.current);
  };

  return (
    <S.Container>
      <svg
        width={TIMER_CANVAS_SIZE.width}
        height={TIMER_CANVAS_SIZE.height}
        ref={canvasRef}
      ></svg>
      <S.ButtonContainer>
        {!isStarted ? (
          <>
            <Button onClick={handlerResetClicked} {...TIMER_BUTTON_SIZE}>
              {RESET}
            </Button>

            <Button onClick={handlerPauseClicked} {...TIMER_BUTTON_SIZE}>
              {isPause ? RESUME : PAUSE}
            </Button>
          </>
        ) : (
          <Button
            onClick={handlerStartClicked}
            width={'100%'}
            height={TIMER_BUTTON_SIZE.height}
          >
            {START}
          </Button>
        )}
      </S.ButtonContainer>
    </S.Container>
  );
}

export default Timer;
