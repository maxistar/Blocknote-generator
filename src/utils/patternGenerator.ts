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
    case 'kanji':
      drawKanjiGrid(pdf, x, y, width, height, config);
      break;
    case 'crosses':
      drawCrosses(pdf, x, y, width, height, config);
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

function drawKanjiGrid(
  pdf: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  config: PatternConfig
) {
  const cell = config.spacing;
  const startX = x + MARGIN;
  const startY = y + MARGIN;
  const endX = x + width - MARGIN;
  const endY = y + height - MARGIN;

  // Outer square grid
  pdf.setDrawColor(config.color);
  pdf.setLineWidth(config.lineWidth);

  for (let rowY = startY; rowY + cell <= endY; rowY += cell) {
    for (let colX = startX; colX + cell <= endX; colX += cell) {
      pdf.rect(colX, rowY, cell, cell);
    }
  }

  // Center guides inside each square (lighter)
  pdf.setDrawColor('#e7e7e7');
  pdf.setLineWidth(Math.max(0.1, config.lineWidth * 0.8));

  for (let rowY = startY; rowY + cell <= endY; rowY += cell) {
    for (let colX = startX; colX + cell <= endX; colX += cell) {
      const cx = colX + cell / 2;
      const cy = rowY + cell / 2;
      pdf.line(cx, rowY, cx, rowY + cell);
      pdf.line(colX, cy, colX + cell, cy);
    }
  }
}

function drawCrosses(
  pdf: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  config: PatternConfig
) {
  const spacing = config.spacing; // distance between centers (7 mm)
  const halfHorizontal = spacing * 0.35; // slightly shorter than spacing
  const halfVertical = spacing * 0.35;
  const slantOffset = spacing * 0.12; // slight right tilt for vertical stroke

  const startX = x + MARGIN + spacing / 2;
  const startY = y + MARGIN + spacing / 2;
  const endX = x + width - MARGIN - spacing / 2;
  const endY = y + height - MARGIN - spacing / 2;

  pdf.setDrawColor(config.color);
  pdf.setLineWidth(config.lineWidth);

  for (let cy = startY; cy <= endY; cy += spacing) {
    for (let cx = startX; cx <= endX; cx += spacing) {
      // Horizontal stroke
      pdf.line(cx - halfHorizontal, cy, cx + halfHorizontal, cy);

      // Slightly slanted vertical stroke (leaning right)
      pdf.line(
        cx - slantOffset,
        cy - halfVertical,
        cx + slantOffset,
        cy + halfVertical
      );
    }
  }
}
