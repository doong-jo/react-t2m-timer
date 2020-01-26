import * as d3 from 'd3';

interface PositionProps {
  x: string | number;
  y: string | number;
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
  private svgCanvas: SVGSVGElement | null;
  private timeTicks: number[];

  constructor(svgCanvas: SVGSVGElement | null) {
    this.svgCanvas = svgCanvas;
    this.timeTicks = [0, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5];
  }

  setSvgCanvas(svgCanvas: SVGSVGElement | null): void {
    this.svgCanvas = svgCanvas;
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

  drawColumn({
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
      .attr('fill', fill);
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

  draw(svgCanvas: SVGSVGElement | null): void {
    this.svgCanvas = svgCanvas;

    // outside frame
    this.drawFrame({
      x: 0,
      y: 0,
      width: '100%',
      height: '100%',
      rx: 48,
      ry: 48,
      fill: '#333',
    });

    // inside frame
    this.drawFrame({
      x: '10%',
      y: '10%',
      width: '80%',
      height: '80%',
      rx: 32,
      ry: 32,
      fill: 'white',
    });

    // center column
    this.drawColumn({
      x: '50%',
      y: '50%',
      r: '6%',
      fill: '#222',
    });

    // center tick
    this.drawFrame({
      x: '50%',
      y: '49%',
      width: '10%',
      height: '1%',
      rx: 16,
      ry: 16,
      fill: '#222',
    });

    // time
    this.drawText({
      x: '50%',
      y: '99%',
      fontSize: '5rem',
      textAnchor: 'middle',
      fill: '#FFF',
      text: '01:00:00',
    });
  }
}

const timerDrawer = new TimerDrawer(null);

export default timerDrawer;
