import type { ComponentPropsWithoutRef } from "react";

interface FilterInputProps extends ComponentPropsWithoutRef<"input"> {
  label?: string;
}

const inputBaseClassName =
  "h-[44px] w-full rounded-md border border-filter-border bg-filter-surface px-3 text-sm text-white outline-none";

export const FilterInput = ({
  label,
  className = "",
  ...props
}: FilterInputProps) => {
  const spacingClassName = label ? "pb-1 pt-4" : "py-3";
  const inputClassName =
    `${inputBaseClassName} ${spacingClassName} `.trim();
  const containerClassName = `${className} relative block w-full`.trim();

  return (
    <label className={containerClassName}>
      {label ? (
        <span className="absolute left-3 top-1 text-[10px] text-filter-label">
          {label}
        </span>
      ) : null}

      <input {...props} className={inputClassName} />
    </label>
  );
};
