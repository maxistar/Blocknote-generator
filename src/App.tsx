import { BookOpen } from 'lucide-react';
import PatternForm from './components/PatternForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-800">
              Blocknote Pattern Generator
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create custom printable patterns for your blocknotes. Generate lines,
            grids, or dots optimized for A6 format sheets.
          </p>
        </header>

        <main className="flex justify-center">
          <PatternForm />
        </main>

        <footer className="text-center mt-16 text-gray-500 text-sm">
          <p>
            Print on A4 paper and cut twice to create A6 sheets for your custom
            blocknote
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
