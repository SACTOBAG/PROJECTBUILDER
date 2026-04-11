import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Coffee, ChevronRight, ChevronLeft } from 'lucide-react';

const METHODS = [
  { id: 'french-press', name: 'French Press' },
  { id: 'pour-over', name: 'Pour Over' },
  { id: 'aeropress', name: 'AeroPress' },
  { id: 'cold-brew', name: 'Cold Brew' },
];

export default function BrewGuide() {
  const { methodId } = useParams();
  const [selected, setSelected] = useState(methodId || null);

  if (!selected) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Choose a Brewing Method</h2>
        <div className="grid gap-3">
          {METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(m.id)}
              className="flex items-center justify-between rounded-xl border border-coffee-200 bg-white p-4 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <Coffee className="h-5 w-5 text-coffee-500" />
                <span className="font-medium">{m.name}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-coffee-300" />
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <button
        onClick={() => setSelected(null)}
        className="flex items-center gap-1 text-sm text-coffee-400 hover:text-coffee-500"
      >
        <ChevronLeft className="h-4 w-4" /> All methods
      </button>
      <h2 className="text-xl font-bold capitalize">
        {selected.replace('-', ' ')} Guide
      </h2>
      <p className="text-sm text-coffee-400">
        Detailed step-by-step tutorial coming soon. This page will pull steps from the database and guide you through each one with timers and tips.
      </p>
    </section>
  );
}
