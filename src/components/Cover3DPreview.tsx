import { useState, type CSSProperties } from 'react';
import { StlViewer } from 'react-stl-viewer';

const viewerStyle: CSSProperties = {
  width: '100%',
  height: '380px',
  background: '#f8fafc',
  borderRadius: '12px',
  border: '1px solid #e2e8f0',
};

const MODELS = [
  { label: 'Front cover', file: 'notebook_cover.stl' },
  { label: 'Back cover', file: 'notebook_cover_back.stl' },
];

export default function Cover3DPreview() {
  const [selected, setSelected] = useState(MODELS[0]);

  return (
    <section className="max-w-3xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        3D preview: notebook covers
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Download STL files directly and preview the model before printing.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {MODELS.map((model) => (
          <button
            key={model.file}
            type="button"
            onClick={() => setSelected(model)}
            className={`px-3 py-1.5 rounded-md text-sm border ${
              selected.file === model.file
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500'
            }`}
          >
            {model.label}
          </button>
        ))}
      </div>

      <StlViewer
        url={`./models/${selected.file}`}
        style={viewerStyle}
        orbitControls
        shadows
        modelProps={{ color: '#2563eb', scale: 1 }}
        cameraProps={{
          initialPosition: { latitude: 0.9, longitude: 0.4, distance: 2.8 },
        }}
      />

      <div className="mt-4 text-sm">
        <a
          className="text-blue-600 hover:text-blue-700 underline"
          href={`./models/${selected.file}`}
          download
        >
          Download {selected.label} STL
        </a>
      </div>
    </section>
  );
}
