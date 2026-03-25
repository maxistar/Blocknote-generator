import jsPDF from 'jspdf';
import { PatternConfig } from './patternTypes';
import { drawPattern } from './patternGenerator';

export interface GenerateOptions {
  numberOfPages: number;
  config: PatternConfig;
}

export function generatePDF(options: GenerateOptions): jsPDF {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  for (let i = 0; i < options.numberOfPages; i++) {
    if (i > 0) {
      pdf.addPage();
    }

    drawPattern(pdf, 0, 0, options.config);
    drawPattern(pdf, 105, 0, options.config);
    drawPattern(pdf, 0, 148.5, options.config);
    drawPattern(pdf, 105, 148.5, options.config);

    pdf.setDrawColor('#cccccc');
    pdf.setLineWidth(0.3);
    pdf.setLineDash([2, 2]);
    pdf.line(105, 0, 105, 297);
    pdf.line(0, 148.5, 210, 148.5);
    pdf.setLineDash([]);
  }

  return pdf;
}
