interface Day {
  date: Date;
  currentMonth: boolean;
  isBeforeToday: boolean;
}

interface CalendarEvents {
  selectDate: (date: Date) => void;
  startDrag: (date: Date) => void;
  extendSelection: (date: Date) => void;
  endDrag: () => void;
  adjustMonth: (offset: number) => void;
}

interface Schedule {
  id: number;
  destination: string;
  description: string;
  dayIndex: number;
}

export type { Day, CalendarEvents, Schedule };
