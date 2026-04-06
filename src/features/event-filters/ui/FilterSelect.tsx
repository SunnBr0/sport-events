import type { ComponentPropsWithoutRef } from "react";

interface FilterSelectOption {
  value: string;
  label: string;
}

interface FilterSelectProps
  extends Omit<ComponentPropsWithoutRef<"select">, "children"> {
  label: string;
  options: FilterSelectOption[];
}

const baseSelectClassName =
  "h-[44px] w-full appearance-none rounded-md border border-filter-border bg-filter-surface px-3 pb-1 pt-4 pr-8 text-sm text-white outline-none";

export const FilterSelect = ({
  label,
  options,
  className = "",
  ...props
}: FilterSelectProps) => {
  const selectClassName = `${baseSelectClassName} ${className}`.trim();
  const containerClassName = `relative block w-full`.trim();

  return (
    <label className={containerClassName}>
      <span className="absolute left-3 top-1 text-[10px] text-filter-label">
        {label}
      </span>

      <select {...props} className={selectClassName}>
        {options.map((option) => (
          <option key={`${label}-${option.value || "empty"}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-filter-label">
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path
            d="M1 1L5 5L9 1"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </span>
    </label>
  );
};
