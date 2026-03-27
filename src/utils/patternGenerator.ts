import jsPDF from 'jspdf';
import { PatternConfig } from './patternTypes';

const A6_WIDTH = 105;
const A6_HEIGHT = 148.5;
const MARGIN = 5;

export function drawPattern(
  pdf: jsPDF,
  x: number,
  y: number,
  config: PatternConfig,
  options: { drawSheetBorder?: boolean } = {}
) {
  const width = A6_WIDTH;
  const height = A6_HEIGHT;

  pdf.setDrawColor(config.color);
  pdf.setLineWidth(config.lineWidth);

  switch (config.type) {
    case 'lines':
      drawLines(pdf, x, y, width, height, config);
      break;
    case 'grid':
      drawGrid(pdf, x, y, width, height, config);
      break;
    case 'dots':
      drawDots(pdf, x, y, width, height, config);
      break;
    case 'blank':
      break;
  }

  if (options.drawSheetBorder ?? true) {
    pdf.setDrawColor('#000000');
    pdf.setLineWidth(0.1);
    pdf.rect(x, y, width, height);
  }
}

function drawLines(
  pdf: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  config: PatternConfig
) {
  let currentY = y + MARGIN;

  while (currentY < y + height - MARGIN) {
    pdf.line(x + MARGIN, currentY, x + width - MARGIN, currentY);
    currentY += config.spacing;
  }
}

function drawGrid(
  pdf: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  config: PatternConfig
) {
  let currentY = y + MARGIN;
  while (currentY < y + height - MARGIN) {
    pdf.line(x + MARGIN, currentY, x + width - MARGIN, currentY);
    currentY += config.spacing;
  }

  let currentX = x + MARGIN;
  while (currentX < x + width - MARGIN) {
    pdf.line(currentX, y + MARGIN, currentX, y + height - MARGIN);
    currentX += config.spacing;
  }
}

function drawDots(
  pdf: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  config: PatternConfig
) {
  let currentY = y + MARGIN;

  while (currentY < y + height - MARGIN) {
    let currentX = x + MARGIN;
    while (currentX < x + width - MARGIN) {
      pdf.circle(currentX, currentY, config.lineWidth, 'F');
      currentX += config.spacing;
    }
    currentY += config.spacing;
  }
}
