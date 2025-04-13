import { createElement } from '../utils/dom/createElement';
import { LSControl } from '../utils/storage/lsControl';

import { getSlicedString } from '../utils/slicedString';
import { generateArrayColor } from '../utils/colorRandomize';

import type { Todo } from '../types/todo-type';
import type { ControlCallback } from '../types/control-type';
import type { SegmentDrawData } from '../types/wheel-type';

export class Wheel {
  private wheelContainer: HTMLElement;
  private canvas: HTMLCanvasElement;
  private pointerCanvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D | null;
  private pointerContext: CanvasRenderingContext2D | null;
  private centerX: number;
  private centerY: number;
  private renderList: Todo[];
  private startAngle: number;
  private segmentColors: string[];
  private currentRotation: number = 0;

  constructor() {
    this.renderList = LSControl.getListForRender();

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'decision-wheel';
    this.canvas.width = 400;
    this.canvas.height = 400;
    this.context = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;

    this.pointerCanvas = document.createElement('canvas');
    this.pointerCanvas.width = 400;
    this.pointerCanvas.height = 400;
    this.pointerContext = this.pointerCanvas.getContext('2d');
    this.pointerCanvas.className = 'decision-pointer';

    this.wheelContainer = createElement({
      tag: 'div',
      classes: ['decision-wheel__wrapper'],
    });
    this.wheelContainer.append(this.canvas, this.pointerCanvas);

    this.startAngle = -Math.PI / 2;
    this.segmentColors = [];

    this.generateInitialColors(this.renderList);
    this.initialDrow();
  }

  public render(): HTMLElement {
    return this.wheelContainer;
  }

  public runAnimation(controlObject: ControlCallback): void {
    const minTurn = 5;
    const maxTurn = 30;

    const randomTurn = Math.random() * (maxTurn - minTurn) + minTurn;
    const randomDegrees = randomTurn * 360;
    const targetRotation = this.currentRotation + randomDegrees;

    this.canvas.style.transition = `transform ${controlObject.duration}s ease-in-out`;
    this.canvas.style.transform = `rotate(${targetRotation}deg)`;

    setTimeout(() => {
      if (controlObject.isSoundOn) {
        new Audio('./assets/sounds/finish.mp3').play();
      }

      this.currentRotation = targetRotation % 360;

      this.canvas.style.transition = 'none';
      this.canvas.style.transform = `rotate(${this.currentRotation}deg)`;
    }, controlObject.duration * 1000);
  }

  private initialDrow(): void {
    this.clearCanvas();
    this.drawWheel();
    this.drawPointer();
  }

  private getSegmentsArray(renderList: Todo[]): Todo[] {
    const totalWeight = renderList.reduce((acc, item) => acc + +item.weight, 0);
    return renderList
      .map((item): Todo => {
        return {
          id: item.id,
          title: item.title,
          weight: (+item.weight / totalWeight) * (2 * Math.PI),
        };
      })
      .sort(() => Math.random() - 0.5);
  }

  private generateInitialColors(renderList: Todo[]): void {
    this.segmentColors = generateArrayColor(renderList.length);
  }

  private drawPointer(): void {
    if (!this.pointerContext) {
      return;
    }

    const radius = (this.canvas.width / 2) * 0.95;
    const pointerHeight = radius * 0.2;
    const pointerWidth = radius * 0.15;

    this.pointerContext.beginPath();
    this.pointerContext.moveTo(this.centerX, pointerHeight);
    this.pointerContext.lineTo(this.centerX - pointerWidth / 2, 0);
    this.pointerContext.lineTo(this.centerX + pointerWidth / 2, 0);
    this.pointerContext.closePath();
    this.pointerContext.fillStyle = '#f7b75b';
    this.pointerContext.fill();
    this.pointerContext.lineWidth = 2;
    this.pointerContext.strokeStyle = '#ffffff';
    this.pointerContext.stroke();
  }

  private drawWheel(): void {
    if (!this.context) return;

    const radius = (this.canvas.width / 2) * 0.95;
    const centerWheelRadius = radius * 0.1;
    const fontSize = radius * 0.075;
    const segments = this.getSegmentsArray(this.renderList);

    segments.forEach((segment, index) => {
      const endAngle = this.startAngle + +segment.weight;
      const textAngle = (this.startAngle + endAngle) / 2;

      const segmentData: SegmentDrawData = {
        start: this.startAngle,
        end: endAngle,
        color: this.segmentColors[index],
        title: segment.title,
        angle: textAngle,
        fontSize: fontSize,
        radius: radius,
      };

      this.drawSegment(segmentData);
      this.drawSegmentText(segmentData);

      this.startAngle = endAngle;
    });

    this.drawCenterCircle(centerWheelRadius);
  }

  private drawSegment({ start, end, color }: SegmentDrawData): void {
    if (!this.context) return;

    this.context.beginPath();
    this.context.moveTo(this.centerX, this.centerY);
    this.context.arc(this.centerX, this.centerY, (this.canvas.width / 2) * 0.95, start, end);
    this.context.fillStyle = color;
    this.context.fill();
    this.context.lineWidth = 3;
    this.context.strokeStyle = '#ffffff';
    this.context.stroke();
    this.context.closePath();
  }

  private drawSegmentText({ title, angle, fontSize, radius, start, end }: SegmentDrawData): void {
    if (!this.context || !title || angle === undefined || fontSize === undefined || radius === undefined) return;

    const textX = this.centerX + radius * 0.9 * Math.cos(angle);
    const textY = this.centerY + radius * 0.9 * Math.sin(angle);
    const segmentHeight = (radius * (end - start)) / Math.PI;

    this.context.save();
    this.context.beginPath();
    this.context.translate(textX, textY);
    this.context.rotate(angle + Math.PI);
    this.context.textAlign = 'start';
    this.context.font = `${fontSize}px Times New Roman`;
    this.context.fillStyle = '#ffffff';

    const text = fontSize > segmentHeight * 0.85 ? '' : getSlicedString(title);
    this.context.fillText(text, 0, fontSize / 6);

    this.context.closePath();
    this.context.restore();
  }

  private drawCenterCircle(radius: number): void {
    if (!this.context) return;

    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, radius, 0, Math.PI * 2);
    this.context.fillStyle = '#f7b75b';
    this.context.fill();
    this.context.lineWidth = 3;
    this.context.stroke();
    this.context.closePath();
  }

  private clearCanvas(): void {
    this.canvas.width = this.canvas.width;
  }
}
