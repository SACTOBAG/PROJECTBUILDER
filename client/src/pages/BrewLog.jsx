import { useState, useEffect } from 'react';
import { ClipboardList, Plus, Star, AlertCircle, Loader2 } from 'lucide-react';
import { api } from '../lib/api';

const DEMO_USER = 'a1000000-0000-0000-0000-000000000001';
const GRIND_OPTIONS = ['extra-coarse', 'coarse', 'medium-coarse', 'medium', 'medium-fine', 'fine', 'extra-fine'];

export default function BrewLog() {
  const [showForm, setShowForm] = useState(false);
  const [brews, setBrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    bean_type: '',
    grind_size: '',
    water_temp_f: '',
    duration: '',
    rating: 0,
    issue: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.getBrews(DEMO_USER)
      .then((res) => setBrews(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const validate = () => {
    const e = {};
    if (!form.bean_type.trim()) e.bean_type = 'Bean type is required';
    if (!form.grind_size) e.grind_size = 'Grind size is required';
    if (!form.water_temp_f || isNaN(form.water_temp_f)) e.water_temp_f = 'Valid temperature is required';
    if (!form.duration || isNaN(form.duration)) e.duration = 'Brew time (seconds) is required';
    if (form.rating < 1 || form.rating > 5) e.rating = 'Rating (1-5) is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      const brewRes = await api.createBrew({
        user_id: DEMO_USER,
        grind_size: form.grind_size,
        bean_type: form.bean_type,
        water_temp_f: Number(form.water_temp_f),
        duration: Number(form.duration),
      });
      const newBrew = brewRes.data;
      // Submit feedback (rating + issue) linked to the new brew
      if (newBrew) {
        await api.createFeedback({
          brew_id: newBrew.brew_id,
          rating: form.rating,
          taste_notes: form.issue || 'No notes',
        }).catch(() => {}); // non-critical
      }
      setBrews([{ ...newBrew, rating: form.rating, issue: form.issue || null }, ...brews]);
      setForm({ bean_type: '', grind_size: '', water_temp_f: '', duration: '', rating: 0, issue: '' });
      setShowForm(false);
      setErrors({});
    } catch (err) {
      setErrors({ submit: err.message });
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Create Brew Log</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1 rounded-full bg-coffee-500 px-4 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-coffee-600"
        >
          <Plus className="h-3.5 w-3.5" />
          New Brew
        </button>
      </div>

      {/* New Brew Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="rounded-xl border border-coffee-200 bg-white p-4 shadow-sm space-y-3">
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">Bean Type *</label>
            <input
              type="text"
              value={form.bean_type}
              onChange={(e) => setForm({ ...form, bean_type: e.target.value })}
              placeholder="e.g. Colombian Supremo"
              className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none"
            />
            {errors.bean_type && <p className="mt-1 text-xs text-red-500">{errors.bean_type}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">Grind Size *</label>
            <select
              value={form.grind_size}
              onChange={(e) => setForm({ ...form, grind_size: e.target.value })}
              className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none"
            >
              <option value="">Select grind size</option>
              {GRIND_OPTIONS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {errors.grind_size && <p className="mt-1 text-xs text-red-500">{errors.grind_size}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold text-coffee-600 mb-1">Water Temp (°F) *</label>
              <input
                type="number"
                value={form.water_temp_f}
                onChange={(e) => setForm({ ...form, water_temp_f: e.target.value })}
                placeholder="200"
                className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none"
              />
              {errors.water_temp_f && <p className="mt-1 text-xs text-red-500">{errors.water_temp_f}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-coffee-600 mb-1">Brew Time (sec) *</label>
              <input
                type="number"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                placeholder="240"
                className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none"
              />
              {errors.duration && <p className="mt-1 text-xs text-red-500">{errors.duration}</p>}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">Rate Brew Results *</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm({ ...form, rating: s })}
                >
                  <Star className={`h-6 w-6 ${s <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-coffee-200'}`} />
                </button>
              ))}
            </div>
            {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating}</p>}
          </div>

          {/* Issue tab */}
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-1">
              <AlertCircle className="inline h-3.5 w-3.5 mr-1" />
              Issue (optional)
            </label>
            <input
              type="text"
              value={form.issue}
              onChange={(e) => setForm({ ...form, issue: e.target.value })}
              placeholder="e.g. Too bitter, under-extracted..."
              className="w-full rounded-lg border border-coffee-200 bg-white px-3 py-2 text-sm focus:border-coffee-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-coffee-500 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-coffee-600"
          >
            Save Brew
          </button>
        </form>
      )}

      {errors.submit && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">{errors.submit}</div>
      )}

      {/* Brew History */}
      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-coffee-400" /></div>
      ) : brews.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-coffee-300 bg-white p-10 text-center">
          <ClipboardList className="mb-3 h-10 w-10 text-coffee-300" />
          <p className="text-sm text-coffee-400">No brews logged yet. Tap "New Brew" to get started!</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {brews.map((brew) => (
            <div key={brew.brew_id} className="rounded-xl border border-coffee-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-semibold">{brew.bean_type}</h3>
                  <p className="text-xs text-coffee-400">{brew.start_date} · {brew.grind_size} · {brew.duration}s · {brew.water_temp_f}°F</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`h-3.5 w-3.5 ${s <= brew.rating ? 'fill-yellow-400 text-yellow-400' : 'text-coffee-200'}`} />
                  ))}
                </div>
              </div>
              {brew.issue && (
                <div className="mt-2 flex items-center gap-1.5 rounded-md bg-red-50 px-2.5 py-1.5">
                  <AlertCircle className="h-3.5 w-3.5 text-red-400" />
                  <span className="text-xs text-red-600">{brew.issue}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
