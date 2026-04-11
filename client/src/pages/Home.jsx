import { Link } from 'react-router-dom';
import {
  BookOpen,
  ClipboardList,
  ShoppingBasket,
  ChefHat,
  CalendarDays,
  Sparkles,
} from 'lucide-react';

const cards = [
  {
    to: '/brew',
    icon: BookOpen,
    title: 'Brew Guide',
    desc: 'Step-by-step tutorials for every method.',
  },
  {
    to: '/log',
    icon: ClipboardList,
    title: 'Brew Log',
    desc: 'Track brews, ratios, and flavor notes.',
  },
  {
    to: '/pantry',
    icon: ShoppingBasket,
    title: 'Digital Pantry',
    desc: 'Manage beans, stock, and expiration dates.',
  },
  {
    to: '/recipes',
    icon: ChefHat,
    title: 'Recipes',
    desc: 'Discover and share custom recipes.',
  },
  {
    to: '/planner',
    icon: CalendarDays,
    title: 'Weekly Planner',
    desc: 'Plan your drinks for the week.',
  },
];

export default function Home() {
  return (
    <section className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-coffee-400 to-coffee-600 p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-medium uppercase tracking-wide opacity-90">
            Smart Adjust
          </span>
        </div>
        <h2 className="text-2xl font-bold leading-tight">
          Brew better coffee,<br />one cup at a time.
        </h2>
        <p className="mt-2 text-sm opacity-80">
          Rate your last brew and get personalized tips to dial in your next cup.
        </p>
        <Link
          to="/brew"
          className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-coffee-600 shadow transition hover:shadow-md"
        >
          Start Brewing
        </Link>
      </div>

      {/* Quick-access cards */}
      <div className="grid grid-cols-2 gap-3">
        {cards.map(({ to, icon: Icon, title, desc }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-start gap-2 rounded-xl border border-coffee-200 bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <Icon className="h-6 w-6 text-coffee-500" />
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-coffee-400 leading-snug">{desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
