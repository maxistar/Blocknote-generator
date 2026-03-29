import { useEffect, useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { PatternConfig, PatternType, defaultConfigs } from '../utils/patternTypes';
import { generatePDF } from '../utils/pdfGenerator';

export default function PatternForm() {
  const [patternType, setPatternType] = useState<PatternType>('lines');
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [config, setConfig] = useState<PatternConfig>(defaultConfigs.lines);
  const [dividerColor, setDividerColor] = useState('#cccccc');
  const [showCuttingRulers, setShowCuttingRulers] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    setConfig(defaultConfigs[patternType]);
  }, [patternType]);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const pdf = generatePDF({
        numberOfPages,
        config,
        dividerColor,
        showCuttingRulers,
      });

      pdf.save(`blocknote-${patternType}-${numberOfPages}pages.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="pattern-type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Pattern Type
          </label>
          <select
            id="pattern-type"
            value={patternType}
            onChange={(e) => setPatternType(e.target.value as PatternType)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          >
            <option value="lines">Lines (Ruled)</option>
            <option value="grid">Grid (Squares)</option>
            <option value="dots">Dots (Dot Grid)</option>
            <option value="blank">Blank</option>
            <option value="kanji">Kanji Practice (Genkō style)</option>
            <option value="crosses">Handwriting Crosses (slanted)</option>
          </select>
        </div>

        {patternType === 'lines' && (
          <div>
            <label
              htmlFor="line-spacing"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Line spacing (mm)
            </label>
            <input
              id="line-spacing"
              type="number"
              min="3"
              max="20"
              step="0.5"
              value={config.spacing}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  spacing: Math.max(3, parseFloat(e.target.value) || prev.spacing),
                }))
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>
        )}

        {patternType !== 'blank' && (
          <div>
            <label
              htmlFor="pattern-color"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Pattern color
            </label>
            <input
              id="pattern-color"
              type="color"
              value={config.color}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  color: e.target.value,
                }))
              }
              className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
            />
          </div>
        )}

        <label className="flex items-center gap-2 text-sm text-gray-700 select-none">
          <input
            type="checkbox"
            checked={showCuttingRulers}
            onChange={(e) => setShowCuttingRulers(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Show cutting rulers</span>
        </label>

        <div>
          <label
            htmlFor="divider-color"
            className={`block text-sm font-medium mb-2 ${showCuttingRulers ? 'text-gray-700' : 'text-gray-400'}`}
          >
            Divider color
          </label>
          <input
            id="divider-color"
            type="color"
            value={dividerColor}
            onChange={(e) => setDividerColor(e.target.value)}
            disabled={!showCuttingRulers}
            className={`h-10 w-20 border border-gray-300 rounded ${showCuttingRulers ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
          />
          <p className="text-xs text-gray-500 mt-1">
            Divider color is active only when cutting rulers are enabled.
          </p>
        </div>

        <div>
          <label
            htmlFor="number-of-pages"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Number of Pages
          </label>
          <input
            id="number-of-pages"
            type="number"
            min="1"
            max="100"
            value={numberOfPages}
            onChange={(e) =>
              setNumberOfPages(Math.max(1, parseInt(e.target.value) || 1))
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <p className="text-xs text-gray-500 mt-1">
            Each A4 page contains 4 A6 sheets
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileDown className="w-5 h-5" />
              Generate PDF
            </>
          )}
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-800 mb-2">
          Instructions:
        </h3>
        <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
          <li>Select your preferred pattern type</li>
          <li>Adjust pattern/divider settings</li>
          <li>Choose the number of A4 pages to print</li>
          <li>Click "Generate PDF" to download</li>
          <li>Print the PDF on A4 paper</li>
          <li>Cut each sheet in half twice to get A6 sheets</li>
        </ol>
      </div>
    </div>
  );
}
