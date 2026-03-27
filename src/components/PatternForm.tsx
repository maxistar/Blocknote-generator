import { useState } from 'react';
import { FileDown, Loader2 } from 'lucide-react';
import { PatternType, defaultConfigs } from '../utils/patternTypes';
import { generatePDF } from '../utils/pdfGenerator';

export default function PatternForm() {
  const [patternType, setPatternType] = useState<PatternType>('lines');
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [showCuttingRulers, setShowCuttingRulers] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);

    try {
      const config = defaultConfigs[patternType];
      const pdf = generatePDF({
        numberOfPages,
        config,
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
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Generate Custom Blocknote
      </h2>

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
          </select>
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

        <label className="flex items-center gap-2 text-sm text-gray-700 select-none">
          <input
            type="checkbox"
            checked={showCuttingRulers}
            onChange={(e) => setShowCuttingRulers(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Show cutting rulers</span>
        </label>

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
          <li>Choose the number of A4 pages to print</li>
          <li>Click "Generate PDF" to download</li>
          <li>Print the PDF on A4 paper</li>
          <li>Cut each sheet in half twice to get A6 sheets</li>
        </ol>
      </div>
    </div>
  );
}
