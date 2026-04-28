import { Link } from 'react-router-dom';
import {
  ShoppingBasket,
  ClipboardList,
  BookOpen,
  Coffee as CoffeeIcon,
  Sparkles,
  Share2,
} from 'lucide-react';

const cards = [
  {
    to: '/pantry',
    icon: ShoppingBasket,
    title: 'Digital Pantry',
    desc: 'Track beans, ingredients, and expiration dates.',
  },
  {
    to: '/log',
    icon: ClipboardList,
    title: 'Create Brew Log',
    desc: 'Record grind, time, temp, and rate your brew.',
  },
  {
    to: '/learn',
    icon: BookOpen,
    title: 'Learn Coffee Skills',
    desc: 'Tutorials for methods and standard drinks.',
  },
  {
    to: '/suggestions',
    icon: CoffeeIcon,
    title: 'Drink Suggestions',
    desc: 'Discover recipes, save favorites, and swap ingredients.',
  },
  {
    to: '/improve',
    icon: Sparkles,
    title: 'Improve Coffee',
    desc: 'Get smart-adjust tips for taste, grind, and temp.',
  },
  {
    to: '/share',
    icon: Share2,
    title: 'Share With Others',
    desc: 'Share recipes, browse public brews, and rate with stars.',
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
            Brew Master
          </span>
        </div>
        <h2 className="text-2xl font-bold leading-tight">
          Brew better coffee,<br />one cup at a time.
        </h2>
        <p className="mt-2 text-sm opacity-80">
          Personalized brewing guidance, smart feedback, and a community to share with.
        </p>
        <Link
          to="/log"
          className="mt-4 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-coffee-600 shadow transition hover:shadow-md"
        >
          Log a Brew
        </Link>
      </div>

      {/* Quick-access cards — matches site map */}
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
