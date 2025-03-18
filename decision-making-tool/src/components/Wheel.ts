import { createElement } from '../utils/helpers/createElement';
import { LSControl } from '../utils/lsControl';

import { getSlicedString } from '../utils/slicedString';
import { generateArrayColor } from '../utils/colorRandomize';

import type { Todo } from '../types/todo-type';
import type { ControlCallback } from '../types/control-type';

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
  private animationId: number;
  private animationTime: number;

  constructor() {
    this.renderList = LSControl.getListForRender();

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'decision-wheel';
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.context = this.canvas.getContext('2d');
    this.centerX = this.canvas.width / 2;
    this.centerY = this.canvas.height / 2;

    this.pointerCanvas = document.createElement('canvas');
    this.pointerCanvas.width = 500;
    this.pointerCanvas.height = 500;
    this.pointerContext = this.pointerCanvas.getContext('2d');
    this.pointerCanvas.className = 'decision-pointer';

    this.wheelContainer = createElement({
      tag: 'div',
      classes: ['decision-wheel__wrapper'],
    });
    this.wheelContainer.append(this.canvas, this.pointerCanvas);

    this.startAngle = -Math.PI / 2;
    this.segmentColors = [];
    this.animationId = 0;
    this.animationTime = 5000;

    this.generateInitialColors(this.renderList);
    this.initialDrow();
  }

  public render(): HTMLElement {
    console.log('test');
    return this.wheelContainer;
  }

  public runAnimation(controlObject: ControlCallback): void {
    this.animationTime = controlObject.duration * 1000;
    this.animate();

    setTimeout(() => {
      cancelAnimationFrame(this.animationId);
      if (controlObject.isSoundOn) {
        const sound = new Audio('./assets/sounds/finish.mp3');
        sound.play();
      }
    }, this.animationTime);
  }

  private initialDrow(): void {
    this.clearCanvas();
    this.drawWheel();
    this.drawPointer();
  }

  private animate(): void {
    this.startAngle += 0.01;

    if (this.startAngle >= Math.PI * 2) {
      this.startAngle = 0;
    }

    this.drawWheel();
    this.animationId = requestAnimationFrame(() => this.animate());
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
    if (!this.context) {
      return;
    }

    const radius = (this.canvas.width / 2) * 0.95;
    const centerWheelRadius = radius * 0.1;
    const fontSize = radius * 0.075;
    const segments = this.getSegmentsArray(this.renderList);

    // Segments
    segments.forEach((item, index) => {
      if (!this.context) {
        return;
      }

      const endAngle = this.startAngle + +item.weight;
      const textAngle = (this.startAngle + endAngle) / 2;
      const textX = this.centerX + radius * 0.9 * Math.cos(textAngle);
      const textY = this.centerY + radius * 0.9 * Math.sin(textAngle);
      const segmentHeight = (radius * (endAngle - this.startAngle)) / Math.PI;

      this.context.beginPath();
      this.context.moveTo(this.centerX, this.centerY);
      this.context.arc(this.centerX, this.centerY, radius, this.startAngle, endAngle);
      this.context.fillStyle = this.segmentColors[index];
      this.context.fill();
      this.context.lineWidth = 3;
      this.context.strokeStyle = '#ffffff';
      this.context.stroke();
      this.context.closePath();

      // SegmentTextContent
      this.context.save();
      this.context.beginPath();
      this.context.translate(textX, textY);
      this.context.rotate(textAngle + Math.PI);
      this.context.textAlign = 'start';
      this.context.font = `${fontSize}px Times New Roman`;
      this.context.fillStyle = '#ffffff';

      if (fontSize > segmentHeight * 0.85) {
        this.context.fillText('', 0, 0);
      } else {
        this.context.fillText(`${getSlicedString(item.title)}`, 0, fontSize / 6);
      }

      this.context.closePath();
      this.context.restore();

      this.startAngle = endAngle;
    });

    // Center
    this.context.beginPath();
    this.context.arc(this.centerX, this.centerY, centerWheelRadius, 0, Math.PI * 2);
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
