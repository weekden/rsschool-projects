import { createElement } from '../utils/helpers/createElement';
import { LSControl } from '../utils/lsControl';
import type { Todo } from '../types/todo-type';

export class Wheel {
  private readonly wheelContainer: HTMLElement;
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D | null;
  private readonly renderList: Todo[];
  private startAngle: number = -Math.PI / 2;
  private segmentColors: string[] = [];
  private animationId: number = 0;

  constructor() {
    this.renderList = LSControl.getListForRender();
    this.canvas = document.createElement('canvas');
    this.canvas.className = 'decision-wheel';
    this.canvas.width = 500;
    this.canvas.height = 500;

    this.context = this.canvas.getContext('2d');
    this.wheelContainer = createElement({ tag: 'div', classes: ['decision-wheel__wrapper'] });
    this.wheelContainer.append(this.canvas);

    this.generateInitialColors(this.renderList);
    this.drawWheel();

    this.wheelContainer.addEventListener('click', () => {
      this.runAnimation();
    });
  }

  public render(): HTMLElement {
    return this.wheelContainer;
  }

  public runAnimation(): void {
    this.animate();

    setTimeout(() => {
      cancelAnimationFrame(this.animationId);
    }, 3000);
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

  private generateArryColor(length: number): string[] {
    const collorArray: string[] = [];
    const letters = '0123456789ABCDEF';
    const colorLength = 6;

    for (let i = 0; i < length; i++) {
      let color = '#';
      for (let j = 0; j < colorLength; j++) {
        color += letters[Math.floor(Math.random() * letters.length)];
      }
      collorArray.push(color);
    }

    return collorArray;
  }

  private generateInitialColors(renderList: Todo[]): void {
    this.segmentColors = this.generateArryColor(renderList.length);
  }

  private getSlicedString(string: string): string {
    const maxLengthString = 15;
    return string.length > maxLengthString ? string.slice(0, maxLengthString) + ` ...` : string;
  }

  private drawWheel(): void {
    if (!this.context) {
      return;
    }

    const radius = (this.canvas.width / 2) * 0.95;
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const centerWheelRadius = radius * 0.1;
    const pointerHeight = radius * 0.2;
    const pointerWidth = radius * 0.15;
    const fontSize = radius * 0.075;
    const segments = this.getSegmentsArray(this.renderList);

    this.canvas.width = this.canvas.width;

    // Segments
    segments.forEach((item, index) => {
      if (!this.context) return;
      const endAngle = this.startAngle + +item.weight;
      const textAngle = (this.startAngle + endAngle) / 2;
      const textX = centerX + radius * 0.9 * Math.cos(textAngle);
      const textY = centerY + radius * 0.9 * Math.sin(textAngle);
      const segmentHeight = (radius * (endAngle - this.startAngle)) / Math.PI;

      this.context.beginPath();
      this.context.moveTo(centerX, centerY);
      this.context.arc(centerX, centerY, radius, this.startAngle, endAngle);
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
        this.context.fillText(``, 0, 0);
      } else {
        this.context.fillText(`${this.getSlicedString(item.title)}`, 0, fontSize / 6);
      }

      this.context.closePath();
      this.context.restore();

      this.startAngle = endAngle;
    });

    // Center
    this.context.beginPath();
    this.context.arc(centerX, centerY, centerWheelRadius, 0, Math.PI * 2);
    this.context.fillStyle = '#f7b75b';
    this.context.fill();
    this.context.lineWidth = 3;
    this.context.stroke();
    this.context.closePath();

    // Pointer
    this.context.beginPath();
    this.context.moveTo(centerX, pointerHeight);
    this.context.lineTo(centerX - pointerWidth / 2, 0);
    this.context.lineTo(centerX + pointerWidth / 2, 0);
    this.context.closePath();
    this.context.fillStyle = '#f7b75b';
    this.context.fill();
    this.context.lineWidth = 2;
    this.context.strokeStyle = '#ffffff';
    this.context.stroke();
  }
}
