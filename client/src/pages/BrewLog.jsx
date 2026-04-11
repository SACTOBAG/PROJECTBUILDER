import { ClipboardList } from 'lucide-react';

export default function BrewLog() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Brew Log</h2>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-coffee-300 bg-white p-10 text-center">
        <ClipboardList className="mb-3 h-10 w-10 text-coffee-300" />
        <p className="text-sm text-coffee-400">
          Your brew history will appear here. Log a brew to get started!
        </p>
        <button className="mt-4 rounded-full bg-coffee-500 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-coffee-600">
          Log a Brew
        </button>
      </div>
    </section>
  );
}
