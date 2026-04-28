import { useState, useEffect } from 'react';
import { User, Star, Eye, Share2, Bookmark, Settings, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

const DEMO_USER = 'a1000000-0000-0000-0000-000000000001';

function StarRating({ value, onChange, readonly = false }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(s)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'}`}
        >
          <Star
            className={`h-4 w-4 ${
              s <= Math.round(value)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-coffee-200'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export default function Share() {
  const [tab, setTab] = useState('browse');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState([]);
  const [userRatings, setUserRatings] = useState({});
  const [accountForm, setAccountForm] = useState({ name: '', email: '' });
  const [shareForm, setShareForm] = useState({ title: '', instructions: '', viewing_status: 'public' });
  const [shareErrors, setShareErrors] = useState({});

  useEffect(() => {
    api.getRecipes()
      .then((res) => setRecipes((res.data || []).map((r) => ({
        id: r.recipe_id,
        title: r.title,
        author: r.user_id?.slice(0, 8) || 'Unknown',
        stars: 0,
        ratingCount: 0,
      }))))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const toggleSave = (id) => {
    setSaved((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const validateShare = () => {
    const errors = {};
    if (!shareForm.title.trim()) errors.title = 'Title is required';
    if (!shareForm.instructions.trim()) errors.instructions = 'Instructions are required';
    setShareErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShareSubmit = async (e) => {
    e.preventDefault();
    if (!validateShare()) return;
    try {
      const res = await api.createRecipe({
        user_id: DEMO_USER,
        title: shareForm.title,
        instructions: shareForm.instructions,
        viewing_status: shareForm.viewing_status,
      });
      const r = res.data;
      setRecipes([{ id: r.recipe_id, title: r.title, author: 'You', stars: 0, ratingCount: 0 }, ...recipes]);
      setShareForm({ title: '', instructions: '', viewing_status: 'public' });
      setTab('browse');
    } catch (err) {
      setShareErrors({ submit: err.message });
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Share With Others</h2>

      {/* Tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {[
          { key: 'browse', label: 'Public Recipes', icon: Eye },
          { key: 'share', label: 'Share Recipe', icon: Share2 },
          { key: 'saved', label: 'Saved', icon: Bookmark },
          { key: 'account', label: 'Account', icon: Settings },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition ${
              tab === key ? 'bg-coffee-500 text-white' : 'bg-coffee-100 text-coffee-600'
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Browse / View Public Recipes */}
      {tab === 'browse' && (loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-coffee-400" /></div>
      ) : (
        <div className="grid gap-3">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="rounded-xl border border-coffee-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{recipe.title}</h3>
                  <p className="text-xs text-coffee-400">by {recipe.author}</p>
                </div>
                <button onClick={() => toggleSave(recipe.id)} title="Save recipe">
                  <Bookmark className={`h-5 w-5 transition ${
                    saved.includes(recipe.id) ? 'fill-coffee-500 text-coffee-500' : 'text-coffee-300'
                  }`} />
                </button>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <StarRating
                  value={userRatings[recipe.id] ?? recipe.stars}
                  onChange={(val) => {
                    setUserRatings((prev) => ({ ...prev, [recipe.id]: val }));
                    api.rateRecipe(recipe.id, { user_id: DEMO_USER, stars: val }).catch(() => {});
                  }}
                />
                <span className="text-xs text-coffee-400">
                  ({recipe.ratingCount} rating{recipe.ratingCount !== 1 ? 's' : ''})
                </span>
              </div>
              {userRatings[recipe.id] && (
                <p className="mt-1 text-xs text-green-600">You rated this {userRatings[recipe.id]} star(s)</p>
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Share Recipe */}
      {tab === 'share' && (
        <form onSubmit={handleShareSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">Recipe Title *</label>
            <input
              type="text"
              value={shareForm.title}
              onChange={(e) => setShareForm({ ...shareForm, title: e.target.value })}
              className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none"
              placeholder="e.g. My Morning Latte"
            />
            {shareErrors.title && <p className="mt-1 text-xs text-red-500">{shareErrors.title}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">Instructions *</label>
            <textarea
              rows={4}
              value={shareForm.instructions}
              onChange={(e) => setShareForm({ ...shareForm, instructions: e.target.value })}
              className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none"
              placeholder="Step-by-step instructions..."
            />
            {shareErrors.instructions && <p className="mt-1 text-xs text-red-500">{shareErrors.instructions}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">Visibility</label>
            <select
              value={shareForm.viewing_status}
              onChange={(e) => setShareForm({ ...shareForm, viewing_status: e.target.value })}
              className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none"
            >
              <option value="public">Public — anyone can see</option>
              <option value="private">Private — only you</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-coffee-500 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-coffee-600"
          >
            Share Recipe
          </button>
        </form>
      )}

      {/* Saved Recipes */}
      {tab === 'saved' && (
        <div>
          {saved.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <Bookmark className="mb-3 h-10 w-10 text-coffee-300" />
              <p className="text-sm text-coffee-400">No saved recipes yet. Browse and tap the bookmark icon to save.</p>
            </div>
          ) : (
            <div className="grid gap-3">
              {recipes.filter((r) => saved.includes(r.id)).map((recipe) => (
                <div key={recipe.id} className="rounded-xl border border-coffee-200 bg-white p-4 shadow-sm flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{recipe.title}</h3>
                    <p className="text-xs text-coffee-400">by {recipe.author}</p>
                  </div>
                  <button onClick={() => toggleSave(recipe.id)} className="text-xs text-red-400 hover:text-red-500">
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Account — Create / Edit */}
      {tab === 'account' && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert('Account saved! (mock)');
          }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-coffee-200">
              <User className="h-6 w-6 text-coffee-500" />
            </div>
            <div>
              <p className="text-sm font-semibold">Your Account</p>
              <p className="text-xs text-coffee-400">Create or edit your profile</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">Name</label>
            <input
              type="text"
              value={accountForm.name}
              onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
              className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">Email</label>
            <input
              type="email"
              value={accountForm.email}
              onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
              className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-coffee-500 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-coffee-600"
          >
            Save Account
          </button>
        </form>
      )}
    </section>
  );
}
