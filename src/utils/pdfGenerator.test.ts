import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { PatternConfig } from './patternTypes';

const mocked = vi.hoisted(() => ({
  drawPattern: vi.fn(),
  pdfInstances: [] as Array<{
    addPage: ReturnType<typeof vi.fn>;
    setDrawColor: ReturnType<typeof vi.fn>;
    setLineWidth: ReturnType<typeof vi.fn>;
    setLineDash: ReturnType<typeof vi.fn>;
    line: ReturnType<typeof vi.fn>;
  }>,
}));

vi.mock('./patternGenerator', () => ({
  drawPattern: mocked.drawPattern,
}));

vi.mock('jspdf', () => ({
  default: vi.fn(function jsPDFMock() {
    const instance = {
      addPage: vi.fn(),
      setDrawColor: vi.fn(),
      setLineWidth: vi.fn(),
      setLineDash: vi.fn(),
      line: vi.fn(),
    };
    mocked.pdfInstances.push(instance);
    return instance;
  }),
}));

import { generatePDF } from './pdfGenerator';

const linesConfig: PatternConfig = {
  type: 'lines',
  spacing: 7,
  color: '#d0d0d0',
  lineWidth: 0.2,
};

describe('generatePDF', () => {
  beforeEach(() => {
    mocked.drawPattern.mockClear();
    mocked.pdfInstances.length = 0;
  });

  it('draws 4 sheets per page and adds extra pages when needed', () => {
    generatePDF({ numberOfPages: 3, config: linesConfig });

    const pdf = mocked.pdfInstances[0];
    expect(pdf.addPage).toHaveBeenCalledTimes(2);
    expect(mocked.drawPattern).toHaveBeenCalledTimes(12);
  });

  it('shows cutting rulers by default', () => {
    generatePDF({ numberOfPages: 1, config: linesConfig });

    const pdf = mocked.pdfInstances[0];
    expect(pdf.line).toHaveBeenCalledWith(105, 0, 105, 297);
    expect(pdf.line).toHaveBeenCalledWith(0, 148.5, 210, 148.5);
    expect(pdf.setLineDash).toHaveBeenCalledWith([2, 2]);
  });

  it('hides rulers and sheet borders when showCuttingRulers is false', () => {
    generatePDF({ numberOfPages: 1, config: linesConfig, showCuttingRulers: false });

    const pdf = mocked.pdfInstances[0];
    expect(pdf.line).not.toHaveBeenCalled();

    for (const call of mocked.drawPattern.mock.calls) {
      expect(call[4]).toMatchObject({ drawSheetBorder: false });
    }
  });

  it('applies custom divider color to rulers and borders', () => {
    generatePDF({
      numberOfPages: 1,
      config: linesConfig,
      showCuttingRulers: true,
      dividerColor: '#ff0000',
    });

    const pdf = mocked.pdfInstances[0];
    expect(pdf.setDrawColor).toHaveBeenCalledWith('#ff0000');

    for (const call of mocked.drawPattern.mock.calls) {
      expect(call[4]).toMatchObject({ borderColor: '#ff0000' });
    }
  });

  it('passes selected pattern config through to drawPattern', () => {
    const customConfig: PatternConfig = {
      ...linesConfig,
      spacing: 11,
      color: '#112233',
    };

    generatePDF({ numberOfPages: 1, config: customConfig });

    for (const call of mocked.drawPattern.mock.calls) {
      expect(call[3]).toEqual(customConfig);
    }
  });
});
