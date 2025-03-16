import { createElement } from '../utils/helpers/createElement';
import { LSControl } from '../utils/lsControl';
import type { Todo } from '../types/todo-type';
export class Wheel {
  private readonly wheelContainer: HTMLElement;

  constructor() {
    this.wheelContainer = createElement({ tag: 'div', classes: ['decision-wheel__wrapper'] });
    this.wheelContainer.append(this.createCanvas());
  }

  public render(): HTMLElement {
    return this.wheelContainer;
  }

  private createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.className = 'decision-wheel';

    canvas.width = 500;
    canvas.height = 500;

    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');

    if (context) {
      this.drawWheel(context, canvas);
    }

    return canvas;
  }

  private getSegmentsArray(listArray: Todo[]): Todo[] {
    const totalWeight = listArray.reduce((acc, item) => acc + +item.weight, 0);
    return listArray
      .map((item): Todo => {
        return (item = {
          id: item.id,
          title: item.title,
          weight: (+item.weight / totalWeight) * (2 * Math.PI),
        });
      })
      .sort(() => Math.random() - 0.5);
  }

  private generateColor(): string {
    const letters = '0123456789ABCDEF';
    const colorLength = 6;
    let color = '#';
    for (let i = 0; i < colorLength; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private getSlicedString(string: string): string {
    const maxLengthString = 15;
    return string.length > maxLengthString ? string.slice(0, maxLengthString) + ` ...` : string;
  }

  private drawWheel(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const radius = (canvas.width / 2) * 0.95;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const centerWheelRadius = radius * 0.1;
    const pointerHeight = radius * 0.2;
    const pointerWidth = radius * 0.15;
    const fontSize = radius * 0.075;

    const items = LSControl.getListForRender();
    const angles = this.getSegmentsArray(items);
    let startAngle = -Math.PI / 2;

    // Segments
    angles.forEach((item) => {
      const endAngle = startAngle + +item.weight;
      const textAngle = (startAngle + endAngle) / 2;
      const textX = centerX + radius * 0.9 * Math.cos(textAngle);
      const textY = centerY + radius * 0.9 * Math.sin(textAngle);
      const segmentHeight = (radius * (endAngle - startAngle)) / Math.PI;

      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius, startAngle, endAngle);
      context.fillStyle = `${this.generateColor()}`;
      context.fill();
      context.lineWidth = 3;
      context.strokeStyle = '#ffffff';
      context.stroke();
      context.closePath();

      context.save();
      context.beginPath();
      context.translate(textX, textY);
      context.rotate(textAngle + Math.PI);
      context.textAlign = 'start';
      context.font = `${fontSize}px Times New Roman`;
      context.fillStyle = '#ffffff';

      if (fontSize > segmentHeight * 0.85) {
        context.fillText(``, 0, 0);
      } else {
        context.fillText(`${this.getSlicedString(item.title)}`, 0, fontSize / 6);
      }

      context.closePath();
      context.restore();

      startAngle = endAngle;
    });

    // Center
    context.beginPath();
    context.arc(centerX, centerY, centerWheelRadius, 0, Math.PI * 2);
    context.fillStyle = '#f7b75b';
    context.fill();
    context.lineWidth = 3;
    context.stroke();
    context.closePath();

    // Pointer
    context.beginPath();
    context.moveTo(centerX, pointerHeight);
    context.lineTo(centerX - pointerWidth / 2, 0);
    context.lineTo(centerX + pointerWidth / 2, 0);
    context.closePath();
    context.fillStyle = '#f7b75b';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = '#ffffff';
    context.stroke();
  }
}
