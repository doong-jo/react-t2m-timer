import * as d3 from 'd3';
import { Timer } from 'easytimer.js';

import { calculateDegreeToRadian } from 'utils';
import defaultStyle from 'commons/style/themes/default';

const { palette } = defaultStyle;

interface PositionProps {
  x: string;
  y: string;
}

interface SizeProps {
  width: string | number;
  height: string | number;
}

interface CircleProps {
  r: string | number;
}

interface RectangleProps {
  rx: string | number;
  ry: string | number;
}

interface ColorProps {
  fill: string;
}

interface TextProps {
  fontSize: string;
  textAnchor: string;
  text: string;
}

class TimerDrawer {
  private readonly timeTicks: number[] = [
    0,
    55,
    50,
    45,
    40,
    35,
    30,
    25,
    20,
    15,
    10,
    5,
  ];
  private readonly tickAngle: number = 360 / 3600;
  private readonly center = { x: 50, y: 50 };

  private svgCanvas: SVGSVGElement | null;
  private angle: number;
  private countdownText: string;
  private readonly timer: Timer = new Timer();

  constructor() {
    this.svgCanvas = null;
    this.angle = 0;
    this.countdownText = this.timer.getTimeValues().toString();
  }

  start(): void {
    this.timer.start({
      countdown: true,
      startValues: [0, 0, 0, 1, 0],
      callback: this.tickCallback.bind(this),
    });
  }

  pause(): void {
    this.timer.pause();
    document.title = `⏸ ${this.countdownText}`;
  }

  reset(): void {
    this.angle = 0;
    this.timer.stop();
    const startValues = this.timer.getConfig().startValues;
    if (!startValues) return;

    this.countdownText = this.timer.getTimeValues().toString();
    document.title = ` ⏹ ${this.countdownText}`;
  }

  tickCallback(timer: Timer): void {
    this.angle += this.tickAngle;
    this.countdownText = timer.getTimeValues().toString();
    this.draw(this.svgCanvas);
    document.title = `${this.countdownText} ⏰`;

    if (this.countdownText === '00:00:00') {
      document.title = `✅ Timer is done`;
    }
  }

  drawFrame({
    x,
    y,
    width,
    height,
    rx,
    ry,
    fill,
  }: PositionProps & SizeProps & RectangleProps & ColorProps): void {
    d3.select(this.svgCanvas)
      .append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      .attr('rx', rx)
      .attr('ry', ry)
      .attr('fill', fill);
  }

  drawCircle({
    x,
    y,
    r,
    fill,
  }: PositionProps & CircleProps & ColorProps): void {
    d3.select(this.svgCanvas)
      .append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', r)
      .attr('fill', fill)
      .style('stroke', 'black')
      .style('stroke-width', '2');
  }

  drawText({
    x,
    y,
    fontSize,
    textAnchor,
    fill,
    text,
  }: PositionProps & ColorProps & TextProps): void {
    d3.select(this.svgCanvas)
      .append('text')
      .text(text)
      .attr('x', x)
      .attr('y', y)
      .attr('font-size', fontSize)
      .attr('text-anchor', textAnchor)
      .attr('fill', fill);
  }

  drawTick({
    x,
    y,
    width,
    height,
    rx,
    ry,
    fill,
  }: PositionProps & SizeProps & RectangleProps & ColorProps): void {
    d3.select(this.svgCanvas)
      .append('rect')
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height)
      .attr('rx', rx)
      .attr('ry', ry)
      .attr('fill', fill);
  }

  drawTicks(): void {
    const { sin, cos } = Math;
    const addAngle = Math.floor(360 / 12);

    for (let degree = 0; degree < 360; degree += addAngle) {
      const radian = calculateDegreeToRadian(degree);
      const xSin = sin(radian);
      const yCos = cos(radian);

      this.drawTick({
        x: `${this.center.x + (this.center.x - 20) * xSin - 0.5}%`,
        y: `${this.center.y + (this.center.y - 20) * -yCos - 0.5}%`,
        width: '1%',
        height: '1%',
        rx: 5,
        ry: 5,
        fill: palette.grayscale[0],
      });
    }
  }

  drawTimes(): void {
    const { sin, cos } = Math;
    const addAngle = Math.floor(360 / 12);

    let timeIndex = 0;
    for (let degree = 0; degree < 360; degree += addAngle) {
      const radian = calculateDegreeToRadian(degree);
      const xSin = sin(radian);
      const yCos = cos(radian);
      const { x: centerX, y: centerY } = this.center;

      this.drawText({
        x: `${centerX + (centerX - 15) * xSin}%`,
        y: `${centerY + (centerY - 15) * -yCos + 2}%`,
        fontSize: '4vmin',
        textAnchor: 'middle',
        text: `${this.timeTicks[timeIndex++]}`,
        fill: palette.grayscale[1],
      });
    }
  }

  drawLeftZone(): void {
    const { x, y } = this.center;
    const leftZone = d3
      .select(this.svgCanvas)
      .append('g')
      .style('transform', `translate(${x}%, ${y}%)`);

    const canvasNode = d3.select(this.svgCanvas).node();
    if (canvasNode === null) return;
    const { height } = canvasNode.getBoundingClientRect();
    const arc = d3
      .arc()
      .innerRadius(height * 0.05)
      .outerRadius(height * 0.1 * 2.8)
      .startAngle(0)
      .endAngle(calculateDegreeToRadian(this.angle));

    leftZone
      .append('path')
      .attr('fill', palette.white)
      .attr('class', 'arc')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .attr('d', arc as any)
      .style('stroke', 'black')
      .style('stroke-width', '2');
  }

  draw(svgCanvas: SVGSVGElement | null): void {
    this.svgCanvas = svgCanvas;
    const { x: centerX, y: centerY } = this.center;

    // outside frame
    this.drawFrame({
      x: '0',
      y: '0',
      width: '100%',
      height: '100%',
      rx: 48,
      ry: 48,
      fill: palette.black,
    });

    // inside frame
    this.drawFrame({
      x: '10%',
      y: '10%',
      width: '80%',
      height: '80%',
      rx: 32,
      ry: 32,
      fill: palette.white,
    });

    // time
    this.drawText({
      x: `${centerX}%`,
      y: '99%',
      fontSize: '5vmin',
      textAnchor: 'middle',
      fill: palette.white,
      text: this.countdownText,
    });

    // background red circle
    this.drawCircle({
      x: `${centerX}%`,
      y: `${centerY}%`,
      r: '28%',
      fill: palette.primary,
    });
    this.drawLeftZone();

    // center column
    this.drawCircle({
      x: `${centerX}%`,
      y: `${centerY}%`,
      r: '6%',
      fill: palette.grayscale[1],
    });

    this.drawTicks();
    this.drawTimes();
  }
}

const timerDrawer = new TimerDrawer();

export default timerDrawer;
