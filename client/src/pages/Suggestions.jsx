import { useState } from 'react';
import { Search, Filter, Bookmark, ArrowRightLeft, Coffee } from 'lucide-react';

const MOCK_RECIPES = [
  {
    id: 1,
    title: 'Classic French Press',
    tags: ['bold', 'full-body', 'easy'],
    ingredients: ['Colombian Supremo Beans', 'Water'],
    swap: null,
  },
  {
    id: 2,
    title: 'Iced Vanilla Latte',
    tags: ['sweet', 'iced', 'milk-based'],
    ingredients: ['Espresso', 'Whole Milk', 'Vanilla Syrup', 'Ice'],
    swap: { original: 'Whole Milk', suggestion: 'Oat Milk', reason: 'Lower calories, similar creamy texture' },
  },
  {
    id: 3,
    title: 'Pour Over V60',
    tags: ['clean', 'bright', 'nuanced'],
    ingredients: ['Guatemalan Antigua Beans', 'Water'],
    swap: null,
  },
  {
    id: 4,
    title: 'Mocha Cappuccino',
    tags: ['sweet', 'chocolate', 'milk-based'],
    ingredients: ['Espresso', 'Whole Milk', 'Chocolate Syrup'],
    swap: { original: 'Chocolate Syrup', suggestion: 'Cacao Powder + Honey', reason: 'Less sugar, natural sweetness' },
  },
  {
    id: 5,
    title: 'Cold Brew Concentrate',
    tags: ['smooth', 'low-acid', 'bold'],
    ingredients: ['Ethiopian Yirgacheffe Beans', 'Cold Water'],
    swap: null,
  },
];

const ALL_TAGS = ['bold', 'sweet', 'iced', 'milk-based', 'clean', 'smooth', 'easy', 'chocolate', 'low-acid', 'bright', 'nuanced', 'full-body'];

export default function Suggestions() {
  const [search, setSearch] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [saved, setSaved] = useState([]);
  const [showSwap, setShowSwap] = useState(null);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleSave = (id) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filtered = MOCK_RECIPES.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
    const matchesTags = activeTags.length === 0 || activeTags.some((t) => r.tags.includes(t));
    return matchesSearch && matchesTags;
  });

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Drink Suggestions</h2>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-coffee-300" />
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-coffee-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm focus:border-coffee-400 focus:outline-none"
        />
      </div>

      {/* Filters */}
      <div>
        <div className="flex items-center gap-1 mb-2">
          <Filter className="h-4 w-4 text-coffee-400" />
          <span className="text-xs font-semibold text-coffee-500">Apply Filters</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALL_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                activeTags.includes(tag)
                  ? 'bg-coffee-500 text-white'
                  : 'bg-coffee-100 text-coffee-600 hover:bg-coffee-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-3">
        {filtered.length === 0 && (
          <p className="text-center text-sm text-coffee-400 py-8">No recipes match your filters.</p>
        )}
        {filtered.map((recipe) => (
          <div key={recipe.id} className="rounded-xl border border-coffee-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-coffee-500" />
                <h3 className="font-semibold text-sm">{recipe.title}</h3>
              </div>
              <button onClick={() => toggleSave(recipe.id)} title="Save for later">
                <Bookmark
                  className={`h-5 w-5 transition ${
                    saved.includes(recipe.id) ? 'fill-coffee-500 text-coffee-500' : 'text-coffee-300'
                  }`}
                />
              </button>
            </div>

            <div className="mt-2 flex flex-wrap gap-1">
              {recipe.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-coffee-50 px-2 py-0.5 text-xs text-coffee-500">
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-2 text-xs text-coffee-400">
              Ingredients: {recipe.ingredients.join(', ')}
            </p>

            {/* Ingredient Swap */}
            {recipe.swap && (
              <div className="mt-3">
                <button
                  onClick={() => setShowSwap(showSwap === recipe.id ? null : recipe.id)}
                  className="flex items-center gap-1 text-xs font-medium text-green-600 hover:text-green-700"
                >
                  <ArrowRightLeft className="h-3.5 w-3.5" />
                  Healthier swap available
                </button>
                {showSwap === recipe.id && (
                  <div className="mt-2 rounded-lg bg-green-50 border border-green-200 p-3">
                    <p className="text-xs text-green-800">
                      <span className="font-semibold">Swap:</span> {recipe.swap.original} → {recipe.swap.suggestion}
                    </p>
                    <p className="text-xs text-green-600 mt-1">{recipe.swap.reason}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Find Similar */}
      {saved.length > 0 && (
        <div className="rounded-xl border border-coffee-200 bg-coffee-50 p-4">
          <h3 className="text-sm font-semibold text-coffee-600">Find Similar Drinks</h3>
          <p className="mt-1 text-xs text-coffee-400">
            Based on your {saved.length} saved recipe(s), try exploring recipes with similar tags and flavor profiles.
          </p>
        </div>
      )}
    </section>
  );
}
