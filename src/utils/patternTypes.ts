export type PatternType = 'lines' | 'grid' | 'dots' | 'blank' | 'kanji' | 'crosses';

export interface PatternConfig {
  type: PatternType;
  spacing: number;
  color: string;
  lineWidth: number;
}

export const defaultConfigs: Record<PatternType, PatternConfig> = {
  lines: {
    type: 'lines',
    spacing: 7,
    color: '#d0d0d0',
    lineWidth: 0.2,
  },
  grid: {
    type: 'grid',
    spacing: 5,
    color: '#d0d0d0',
    lineWidth: 0.2,
  },
  dots: {
    type: 'dots',
    spacing: 5,
    color: '#a0a0a0',
    lineWidth: 0.5,
  },
  blank: {
    type: 'blank',
    spacing: 0,
    color: '#ffffff',
    lineWidth: 0,
  },
  kanji: {
    type: 'kanji',
    spacing: 10,
    color: '#cfcfcf',
    lineWidth: 0.2,
  },
  crosses: {
    type: 'crosses',
    spacing: 7,
    color: '#c7c7c7',
    lineWidth: 0.18,
  },
};
