import { CalendarDays } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Planner() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Weekly Planner</h2>
      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day) => (
          <div
            key={day}
            className="flex flex-col items-center rounded-lg border border-coffee-200 bg-white p-3 text-center"
          >
            <span className="text-xs font-semibold text-coffee-500">{day}</span>
            <div className="mt-2 h-12 w-full rounded border border-dashed border-coffee-200" />
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-coffee-400">
        Tap a day to add drinks to your weekly plan.
      </p>
    </section>
  );
}
