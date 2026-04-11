import { ShoppingBasket } from 'lucide-react';

export default function Pantry() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Digital Pantry</h2>
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-coffee-300 bg-white p-10 text-center">
        <ShoppingBasket className="mb-3 h-10 w-10 text-coffee-300" />
        <p className="text-sm text-coffee-400">
          Track your beans, ingredients, and get expiration alerts. Add your first item below.
        </p>
        <button className="mt-4 rounded-full bg-coffee-500 px-5 py-2 text-sm font-semibold text-white shadow transition hover:bg-coffee-600">
          Add Item
        </button>
      </div>
    </section>
  );
}
