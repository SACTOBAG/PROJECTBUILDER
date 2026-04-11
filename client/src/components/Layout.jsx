import { Outlet, NavLink } from 'react-router-dom';
import {
  Coffee,
  BookOpen,
  ClipboardList,
  ShoppingBasket,
  CalendarDays,
  ChefHat,
} from 'lucide-react';

const navItems = [
  { to: '/', icon: Coffee, label: 'Home' },
  { to: '/brew', icon: BookOpen, label: 'Brew' },
  { to: '/log', icon: ClipboardList, label: 'Log' },
  { to: '/pantry', icon: ShoppingBasket, label: 'Pantry' },
  { to: '/recipes', icon: ChefHat, label: 'Recipes' },
  { to: '/planner', icon: CalendarDays, label: 'Planner' },
];

export default function Layout() {
  return (
    <div className="flex min-h-dvh flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-coffee-200 bg-coffee-50/80 backdrop-blur supports-[backdrop-filter]:bg-coffee-50/60">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-center px-4">
          <Coffee className="mr-2 h-6 w-6 text-coffee-500" />
          <h1 className="text-lg font-bold tracking-tight text-coffee-700">
            Brew Master
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-lg flex-1 px-4 py-6">
        <Outlet />
      </main>

      {/* Bottom navigation — mobile-first */}
      <nav className="sticky bottom-0 z-30 border-t border-coffee-200 bg-coffee-50/90 backdrop-blur supports-[backdrop-filter]:bg-coffee-50/70">
        <ul className="mx-auto flex max-w-lg justify-around py-2">
          {navItems.map(({ to, icon: Icon, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 text-xs transition-colors ${
                    isActive
                      ? 'text-coffee-500 font-semibold'
                      : 'text-coffee-400 hover:text-coffee-500'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
