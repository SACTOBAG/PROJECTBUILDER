import { ChefHat } from 'lucide-react';

export default function Recipes() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Recipes</h2>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-coffee-300 bg-white p-10 text-center">
        <ChefHat className="mb-3 h-10 w-10 text-coffee-300" />
        <p className="text-sm text-coffee-400">
          Discover community recipes or create your own. Share, review, and find healthier swaps.
        </p>
        <button className="mt-4 rounded-full bg-coffee-500 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-coffee-600">
          Create Recipe
        </button>
      </div>
    </section>
  );
}
