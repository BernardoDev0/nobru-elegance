import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, addYears, isAfter, isBefore, startOfToday } from "date-fns";

interface CustomDatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  error?: boolean;
  className?: string;
}

export const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "dd/mm/aaaa",
  error = false,
  className,
}: CustomDatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  
  // Calcular datas mínima e máxima
  const today = startOfToday();
  const minDate = addDays(today, 1); // Mínimo: amanhã
  const maxDate = addYears(today, 2); // Máximo: 2 anos a partir de hoje

  const handleSelect = (date: Date | undefined) => {
    onChange(date);
    if (date) {
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "w-full pl-10 pr-10 h-10 rounded-md border bg-white/50 text-left font-normal",
            "focus:outline-none focus:ring-2 focus:ring-nobru-olive focus:ring-offset-2",
            error
              ? "border-[#8B2635]/60 focus:border-[#8B2635]"
              : "border-nobru-silver/50 focus:border-nobru-olive",
            className
          )}
        >
          <div className="flex items-center">
            <CalendarIcon className="absolute left-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            {value ? (
              <span className="text-primary">
                {format(value, "dd/MM/yyyy", { locale: ptBR })}
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-white/98 backdrop-blur-lg border-nobru-teal/20 shadow-2xl rounded-xl z-50"
        align="start"
        sideOffset={5}
        side="bottom"
        avoidCollisions={true}
      >
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          disabled={(date) => {
            // Desabilitar datas passadas (antes de amanhã) e datas após 2 anos
            return isBefore(date, minDate) || isAfter(date, maxDate);
          }}
          initialFocus
          classNames={{
            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-serif font-medium text-primary",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-nobru-olive/10 rounded-md transition-colors"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell: "text-primary/60 rounded-md w-9 font-normal text-[0.8rem] font-serif",
            row: "flex w-full mt-2",
            cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
            day: cn(
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-md transition-colors hover:bg-nobru-olive/20 hover:text-primary"
            ),
            day_range_end: "day-range-end",
            day_selected:
              "bg-nobru-teal text-nobru-cream hover:bg-nobru-teal hover:text-nobru-cream focus:bg-nobru-teal focus:text-nobru-cream font-medium",
            day_today: "bg-nobru-olive/10 text-primary font-medium",
            day_outside:
              "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
            day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
            day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

