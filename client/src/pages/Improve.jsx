import { useState } from 'react';
import { AlertCircle, Thermometer, CircleDot, CheckCircle } from 'lucide-react';

const ISSUES = [
  { value: 'bitter', label: 'Too Bitter' },
  { value: 'sour', label: 'Too Sour / Acidic' },
  { value: 'weak', label: 'Too Weak / Watery' },
  { value: 'strong', label: 'Too Strong / Intense' },
  { value: 'balanced', label: 'Just Right' },
];

function getSuggestions(issue) {
  switch (issue) {
    case 'bitter':
      return {
        taste: 'Your coffee is over-extracted, producing harsh bitter notes.',
        grind: 'Coarsen your grind by one step (e.g., medium → medium-coarse).',
        temp: 'Lower water temperature by 2-3°F.',
        time: 'Reduce brew time by 15-20 seconds.',
      };
    case 'sour':
      return {
        taste: 'Your coffee is under-extracted, leaving sour/acidic flavors.',
        grind: 'Fine your grind by one step (e.g., medium → medium-fine).',
        temp: 'Increase water temperature by 2-3°F.',
        time: 'Extend brew time by 15-20 seconds.',
      };
    case 'weak':
      return {
        taste: 'Not enough extraction or too little coffee for the water used.',
        grind: 'Fine your grind slightly for more surface area.',
        temp: 'Keep temperature steady or raise by 1-2°F.',
        dose: 'Increase coffee dose by 1-2 grams.',
      };
    case 'strong':
      return {
        taste: 'Too much extraction or too much coffee relative to water.',
        grind: 'Coarsen your grind slightly.',
        temp: 'No change needed.',
        dose: 'Reduce coffee dose by 1-2 grams.',
      };
    case 'balanced':
      return {
        taste: 'Your brew is well-balanced — great job!',
        grind: 'No changes needed.',
        temp: 'No changes needed.',
        message: 'Keep using the same parameters for consistent results.',
      };
    default:
      return null;
  }
}

export default function Improve() {
  const [selectedIssue, setSelectedIssue] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const suggestions = submitted ? getSuggestions(selectedIssue) : null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedIssue) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedIssue('');
    setSubmitted(false);
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Improve Coffee</h2>
      <p className="text-sm text-coffee-400">
        Tell us what went wrong with your last brew and we'll suggest specific changes.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input Issue */}
          <div>
            <label className="block text-sm font-semibold text-coffee-600 mb-2">
              <AlertCircle className="inline h-4 w-4 mr-1" />
              What was the issue?
            </label>
            <div className="grid gap-2">
              {ISSUES.map((issue) => (
                <label
                  key={issue.value}
                  className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${
                    selectedIssue === issue.value
                      ? 'border-coffee-500 bg-coffee-50'
                      : 'border-coffee-200 bg-white hover:border-coffee-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="issue"
                    value={issue.value}
                    checked={selectedIssue === issue.value}
                    onChange={(e) => setSelectedIssue(e.target.value)}
                    className="accent-coffee-500"
                  />
                  <span className="text-sm font-medium">{issue.label}</span>
                </label>
              ))}
            </div>
            {!selectedIssue && (
              <p className="mt-1 text-xs text-red-400">Please select an issue to get suggestions.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!selectedIssue}
            className="w-full rounded-full bg-coffee-500 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-coffee-600 disabled:opacity-40"
          >
            Get Suggestions
          </button>
        </form>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl border border-coffee-200 bg-white p-5 shadow-sm space-y-4">
            {/* Taste Fix */}
            {suggestions.taste && (
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 h-5 w-5 text-orange-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-coffee-700">Taste Diagnosis</p>
                  <p className="text-sm text-coffee-500">{suggestions.taste}</p>
                </div>
              </div>
            )}

            {/* Grind Change */}
            {suggestions.grind && (
              <div className="flex items-start gap-3">
                <CircleDot className="mt-0.5 h-5 w-5 text-coffee-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-coffee-700">Grind Change</p>
                  <p className="text-sm text-coffee-500">{suggestions.grind}</p>
                </div>
              </div>
            )}

            {/* Temperature Change */}
            {suggestions.temp && (
              <div className="flex items-start gap-3">
                <Thermometer className="mt-0.5 h-5 w-5 text-red-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-coffee-700">Temperature Change</p>
                  <p className="text-sm text-coffee-500">{suggestions.temp}</p>
                </div>
              </div>
            )}

            {/* Dose / Time */}
            {(suggestions.dose || suggestions.time) && (
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-coffee-700">Additional Adjustment</p>
                  <p className="text-sm text-coffee-500">{suggestions.dose || suggestions.time}</p>
                </div>
              </div>
            )}

            {suggestions.message && (
              <div className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-green-500 shrink-0" />
                <div>
                  <p className="text-sm text-green-700 font-medium">{suggestions.message}</p>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleReset}
            className="w-full rounded-full bg-coffee-100 py-2.5 text-sm font-semibold text-coffee-600 transition hover:bg-coffee-200"
          >
            Try Another Issue
          </button>
        </div>
      )}
    </section>
  );
}
