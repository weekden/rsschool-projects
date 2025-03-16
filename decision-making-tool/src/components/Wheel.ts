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
    return listArray.map((item): Todo => {
      return (item = {
        id: item.id,
        title: item.title,
        weight: (+item.weight / totalWeight) * (2 * Math.PI),
      });
    });
  }

  private drawWheel(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
    const radius = (canvas.width / 2) * 0.95;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const centerWheelRadius = radius * 0.1;
    const pointerHeight = radius * 0.2;
    const pointerWidth = radius * 0.15;

    const items = LSControl.getListForRender();
    const angles = this.getSegmentsArray(items);
    let startAngle = 0;
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF33A1'];

    // Segments
    angles.forEach((item) => {
      const endAngle = startAngle + +item.weight;

      context.beginPath();
      context.moveTo(centerX, centerY);
      context.arc(centerX, centerY, radius, startAngle, endAngle);
      context.closePath();
      context.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      context.fill();
      context.stroke();

      startAngle = endAngle;
    });

    // Center
    context.beginPath();
    context.arc(centerX, centerY, centerWheelRadius, 0, Math.PI * 2);
    context.fillStyle = '#236C6A';
    context.fill();
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
    context.stroke();
  }
}
