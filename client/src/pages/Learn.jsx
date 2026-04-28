import { useState } from 'react';
import { BookOpen, ChevronRight, ChevronLeft, Coffee, Clock, Lightbulb } from 'lucide-react';

const METHODS = [
  {
    id: 'french-press',
    name: 'French Press',
    type: 'method',
    description: 'Full-immersion brewing for a rich, full-bodied cup.',
    steps: [
      'Boil water to 200°F (93°C).',
      'Grind beans to a coarse consistency (like sea salt).',
      'Add 30g ground coffee to the French Press.',
      'Pour 450ml hot water over the grounds.',
      'Place lid on and steep for 4 minutes.',
      'Slowly press the plunger down and serve immediately.',
    ],
    tips: ['Use freshly roasted beans for best flavor.', 'Pre-heat the press with hot water before brewing.'],
  },
  {
    id: 'pour-over',
    name: 'Pour Over (V60)',
    type: 'method',
    description: 'A manual drip method for clean, nuanced flavors.',
    steps: [
      'Heat water to 205°F (96°C).',
      'Grind beans medium-fine (like table salt).',
      'Place filter in dripper and rinse with hot water.',
      'Add 20g coffee grounds.',
      'Bloom: pour 40ml water, wait 30-45 seconds.',
      'Pour remaining water in slow concentric circles (total 320ml, ~3 min).',
    ],
    tips: ['A gooseneck kettle gives much better pour control.', 'The bloom releases CO2 — a fresh coffee will bubble vigorously.'],
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    type: 'method',
    description: 'Versatile, pressure-based brewer for smooth, concentrated coffee.',
    steps: [
      'Heat water to 185°F (85°C).',
      'Grind beans fine.',
      'Place filter in cap and attach to the chamber.',
      'Add 17g coffee, pour 220ml water, stir 10 seconds.',
      'Wait 60 seconds.',
      'Press plunger slowly over 20-30 seconds.',
    ],
    tips: ['Try the inverted method for a longer steep.', 'Experiment with water temp — lower = smoother.'],
  },
  {
    id: 'espresso',
    name: 'Espresso Machine',
    type: 'method',
    description: 'High-pressure extraction for concentrated shots.',
    steps: [
      'Grind beans very fine (like powdered sugar).',
      'Dose 18-20g into the portafilter.',
      'Tamp evenly with ~30 lbs of pressure.',
      'Lock portafilter and start extraction.',
      'Target 25-30 seconds for a 36-40ml shot.',
      'Adjust grind if shot runs too fast or too slow.',
    ],
    tips: ['Freshness matters — use beans roasted within 2-4 weeks.', 'Purge the group head before pulling a shot.'],
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    type: 'method',
    description: 'Long-steep cold-water method for smooth, low-acid concentrate.',
    steps: [
      'Grind beans extra-coarse.',
      'Combine 100g coffee with 800ml cold water (1:8 ratio).',
      'Cover and refrigerate for 12-24 hours.',
      'Strain through a fine-mesh sieve or paper filter.',
      'Dilute concentrate 1:1 with water or milk and serve over ice.',
    ],
    tips: ['Longer steep = stronger concentrate.', 'Cold brew keeps in the fridge for up to 2 weeks.'],
  },
  {
    id: 'instant',
    name: 'Instant Coffee',
    type: 'method',
    description: 'Quick and convenient — no equipment needed.',
    steps: [
      'Boil water to 200°F.',
      'Add 1-2 teaspoons of instant coffee to your mug.',
      'Pour 8oz hot water over the coffee.',
      'Stir until fully dissolved.',
      'Add milk, sugar, or flavoring to taste.',
    ],
    tips: ['Try specialty instant brands for better quality.', 'Use slightly below boiling water to avoid bitterness.'],
  },
];

const DRINKS = [
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    type: 'drink',
    description: 'Equal parts espresso, steamed milk, and milk foam.',
    steps: [
      'Pull a double espresso shot (36ml).',
      'Steam 4oz milk to 150°F with thick, velvety foam.',
      'Pour steamed milk into espresso.',
      'Spoon foam on top (~1/3 of the cup).',
      'Optionally dust with cocoa powder.',
    ],
    tips: ['Whole milk froths best.', 'A 6oz cup is the classic cappuccino size.'],
  },
  {
    id: 'latte',
    name: 'Latte',
    type: 'drink',
    description: 'Espresso with lots of steamed milk and a thin layer of foam.',
    steps: [
      'Pull a double espresso shot.',
      'Steam 8-10oz milk to 150°F with light microfoam.',
      'Pour steamed milk slowly into the espresso.',
      'Finish with a thin layer of foam on top.',
    ],
    tips: ['Try oat milk for a naturally sweet, creamy alternative.', 'Practice latte art by pouring from 3 inches above the cup.'],
  },
  {
    id: 'americano',
    name: 'Americano',
    type: 'drink',
    description: 'Espresso diluted with hot water for a drip-coffee-like strength.',
    steps: [
      'Pull a double espresso shot.',
      'Heat 6-8oz water to 200°F.',
      'Pour hot water into a mug.',
      'Add espresso on top.',
    ],
    tips: ['Add water first for a smoother crema layer.', 'Try iced: pour espresso over ice water instead.'],
  },
];

export default function Learn() {
  const [selected, setSelected] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [tab, setTab] = useState('methods');

  const allItems = tab === 'methods' ? METHODS : DRINKS;
  const item = allItems.find((m) => m.id === selected);

  if (item) {
    return (
      <section className="space-y-4">
        <h2 className="text-xl font-bold">Learn Coffee Skills</h2>
        <button
          onClick={() => { setSelected(null); setActiveStep(0); }}
          className="flex items-center gap-1 text-sm text-coffee-400 hover:text-coffee-500"
        >
          <ChevronLeft className="h-4 w-4" /> Back to list
        </button>
        <div className="rounded-xl border border-coffee-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-bold">{item.name}</h3>
          <p className="mt-1 text-sm text-coffee-400">{item.description}</p>

          {/* Steps */}
          <div className="mt-4 space-y-3">
            {item.steps.map((step, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 rounded-lg p-3 transition ${
                  i === activeStep ? 'bg-coffee-100 border border-coffee-300' : 'bg-coffee-50'
                }`}
                onClick={() => setActiveStep(i)}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  i === activeStep ? 'bg-coffee-500 text-white' : 'bg-coffee-200 text-coffee-600'
                }`}>
                  {i + 1}
                </span>
                <p className="text-sm">{step}</p>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-4 flex justify-between">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep((s) => s - 1)}
              className="rounded-full bg-coffee-100 px-4 py-2 text-sm font-medium text-coffee-600 disabled:opacity-40"
            >
              Previous
            </button>
            <button
              disabled={activeStep === item.steps.length - 1}
              onClick={() => setActiveStep((s) => s + 1)}
              className="rounded-full bg-coffee-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
            >
              Next Step
            </button>
          </div>

          {/* Tips */}
          {item.tips && item.tips.length > 0 && (
            <div className="mt-5 rounded-lg bg-yellow-50 border border-yellow-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-700">Tips</span>
              </div>
              <ul className="space-y-1">
                {item.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-yellow-800">• {tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Learn Coffee Skills</h2>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab('methods')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            tab === 'methods' ? 'bg-coffee-500 text-white' : 'bg-coffee-100 text-coffee-600'
          }`}
        >
          Brewing Methods
        </button>
        <button
          onClick={() => setTab('drinks')}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
            tab === 'drinks' ? 'bg-coffee-500 text-white' : 'bg-coffee-100 text-coffee-600'
          }`}
        >
          Standard Drinks
        </button>
      </div>

      {/* List */}
      <div className="grid gap-3">
        {allItems.map((m) => (
          <button
            key={m.id}
            onClick={() => { setSelected(m.id); setActiveStep(0); }}
            className="flex items-center justify-between rounded-xl border border-coffee-200 bg-white p-4 shadow-sm text-left transition hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              {m.type === 'method' ? (
                <Coffee className="h-5 w-5 text-coffee-500" />
              ) : (
                <BookOpen className="h-5 w-5 text-coffee-500" />
              )}
              <div>
                <span className="font-medium">{m.name}</span>
                <p className="text-xs text-coffee-400">{m.description}</p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-coffee-300" />
          </button>
        ))}
      </div>
    </section>
  );
}
