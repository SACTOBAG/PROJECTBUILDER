import { useState, useEffect } from 'react';
import { ShoppingBasket, Plus, AlertTriangle, Clock, Trash2, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

const today = new Date().toISOString().split('T')[0];

function daysUntil(dateStr) {
  if (!dateStr) return Infinity;
  const diff = (new Date(dateStr) - new Date(today)) / (1000 * 60 * 60 * 24);
  return Math.ceil(diff);
}

const DEMO_USER = 'a1000000-0000-0000-0000-000000000001';

export default function Pantry() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ingredient_id: '', quantity_remaining: '', expiration_date: '', low_stock_threshold: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    Promise.all([
      api.getPantry(DEMO_USER),
      api.getIngredients(),
    ])
      .then(([pantryRes, ingRes]) => {
        setItems((pantryRes.data || []).map((p) => ({
          id: p.pantry_id,
          name: p.ingredients?.name || 'Unknown',
          unit_type: p.ingredients?.unit_type || '',
          quantity_remaining: p.quantity_remaining,
          expiration_date: p.expiration_date,
          low_stock_threshold: p.low_stock_threshold || 0,
        })));
        setIngredients(ingRes.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const validate = () => {
    const e = {};
    if (!form.ingredient_id) e.ingredient_id = 'Select an ingredient';
    if (!form.quantity_remaining || isNaN(form.quantity_remaining)) e.quantity_remaining = 'Valid quantity is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const res = await api.addPantryItem({
        user_id: DEMO_USER,
        ingredient_id: form.ingredient_id,
        quantity_remaining: form.quantity_remaining,
        expiration_date: form.expiration_date || null,
        low_stock_threshold: Number(form.low_stock_threshold) || 0,
      });
      const ing = ingredients.find((i) => i.ingredient_id === form.ingredient_id);
      setItems([{
        id: res.data.pantry_id,
        name: ing?.name || 'Unknown',
        unit_type: ing?.unit_type || '',
        quantity_remaining: form.quantity_remaining,
        expiration_date: form.expiration_date,
        low_stock_threshold: Number(form.low_stock_threshold) || 0,
      }, ...items]);
      setForm({ ingredient_id: '', quantity_remaining: '', expiration_date: '', low_stock_threshold: '' });
      setShowForm(false);
      setErrors({});
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  const handleDelete = async (id) => {
    await api.deletePantryItem(id).catch(() => {});
    setItems(items.filter((i) => i.id !== id));
  };

  const expiringSoon = items.filter((i) => daysUntil(i.expiration_date) <= 3 && daysUntil(i.expiration_date) > 0).length;
  const expired = items.filter((i) => daysUntil(i.expiration_date) <= 0).length;
  const lowStock = items.filter((i) => Number(i.quantity_remaining) <= i.low_stock_threshold).length;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Digital Pantry</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 rounded-full bg-coffee-500 px-4 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-coffee-600"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Ingredient
        </button>
      </div>

      {/* Summary badges */}
      {(expiringSoon > 0 || expired > 0 || lowStock > 0) && (
        <div className="flex flex-wrap gap-2">
          {expired > 0 && (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
              {expired} expired
            </span>
          )}
          {expiringSoon > 0 && (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
              {expiringSoon} expiring soon
            </span>
          )}
          {lowStock > 0 && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
              {lowStock} low stock
            </span>
          )}
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <form onSubmit={handleAdd} className="rounded-xl border border-coffee-200 bg-white p-4 shadow-sm space-y-3">
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">Ingredient *</label>
            <select value={form.ingredient_id} onChange={(e) => setForm({ ...form, ingredient_id: e.target.value })}
              className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none">
              <option value="">Select ingredient</option>
              {ingredients.map((ing) => (
                <option key={ing.ingredient_id} value={ing.ingredient_id}>{ing.name} ({ing.unit_type})</option>
              ))}
            </select>
            {errors.ingredient_id && <p className="mt-1 text-xs text-red-500">{errors.ingredient_id}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">Quantity *</label>
            <input type="number" value={form.quantity_remaining} onChange={(e) => setForm({ ...form, quantity_remaining: e.target.value })}
              placeholder="250" className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none" />
            {errors.quantity_remaining && <p className="mt-1 text-xs text-red-500">{errors.quantity_remaining}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-coffee-600 mb-1">Expiration Date</label>
              <input type="date" value={form.expiration_date} onChange={(e) => setForm({ ...form, expiration_date: e.target.value })}
                className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-coffee-600 mb-1">Low Stock Alert</label>
              <input type="number" value={form.low_stock_threshold} onChange={(e) => setForm({ ...form, low_stock_threshold: e.target.value })}
                placeholder="50" className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none" />
            </div>
          </div>
          <button type="submit" className="w-full rounded-full bg-coffee-500 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-coffee-600">
            Add to Pantry
          </button>
        </form>
      )}

      {/* Item list */}
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-coffee-400" /></div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-coffee-300 bg-white p-10 text-center">
          <ShoppingBasket className="mb-3 h-10 w-10 text-coffee-300" />
          <p className="text-sm text-coffee-400">Your pantry is empty. Add ingredients to start tracking.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((item) => {
            const days = daysUntil(item.expiration_date);
            const isExpired = days <= 0;
            const isExpiring = days > 0 && days <= 3;
            const isLow = Number(item.quantity_remaining) <= item.low_stock_threshold;
            return (
              <div key={item.id} className={`rounded-xl border bg-white p-4 shadow-sm ${isExpired ? 'border-red-300' : 'border-coffee-200'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <p className="text-xs text-coffee-400">{item.quantity_remaining} {item.unit_type}</p>
                  </div>
                  <button onClick={() => handleDelete(item.id)} className="text-coffee-300 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {isExpired && (
                    <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
                      <Clock className="h-3 w-3" /> Expired
                    </span>
                  )}
                  {isExpiring && (
                    <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                      <Clock className="h-3 w-3" /> Expires in {days} day{days !== 1 ? 's' : ''}
                    </span>
                  )}
                  {isLow && (
                    <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                      <AlertTriangle className="h-3 w-3" /> Low stock
                    </span>
                  )}
                  {item.expiration_date && !isExpired && !isExpiring && (
                    <span className="text-xs text-coffee-400">Exp: {item.expiration_date}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
