import type { ChangeEvent } from "react";
import { useEventsContext } from "../../../app/providers/events/model/EventsContext";
import type { EventType } from "../../../app/providers/events/model/types";
import type {
  EventAge,
  EventGender,
  EventWeapon,
} from "../../../entities/event/api/types";
import { FilterInput } from "./FilterInput";
import { FilterSelect } from "./FilterSelect";

const weaponOptions = [
  { value: "", label: "Любое" },
  { value: "E", label: "Шпага" },
  { value: "S", label: "Сабля" },
  { value: "F", label: "Рапира" },
];

const genderOptions = [
  { value: "", label: "Любой" },
  { value: "M", label: "М" },
  { value: "F", label: "Ж" },
];

const ageOptions = [
  { value: "", label: "Любой" },
  { value: "K", label: "Кадеты" },
  { value: "C", label: "Дети" },
  { value: "J", label: "Юниоры" },
  { value: "U23", label: "До 23" },
  { value: "A", label: "Взрослые" },
  { value: "V", label: "Ветераны" },
];

const typeOptions = [
  { value: "", label: "Любой" },
  { value: "I", label: "Личные" },
  { value: "T", label: "Командные" },
];

export const EventFilters = () => {
  const { filters, setFilter, resetFilters } = useEventsContext();

  const handleEventNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter("event_name", event.target.value);
  };

  const handleWeaponChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter("weapon", event.target.value as "" | EventWeapon);
  };

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter("gender", event.target.value as "" | EventGender);
  };

  const handleAgeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter("age", event.target.value as "" | EventAge);
  };

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilter("type", event.target.value as EventType);
  };

  const handleFromChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter("from", event.target.value);
  };

  const handleToChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter("to", event.target.value);
  };

  return (
    <section className="mb-6 flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
        <FilterSelect
          label="Оружие"
          value={filters.weapon}
          onChange={handleWeaponChange}
          options={weaponOptions}
        />

        <FilterSelect
          label="Пол"
          value={filters.gender}
          onChange={handleGenderChange}
          options={genderOptions}
        />

        <FilterSelect
          label="Возраст"
          value={filters.age}
          onChange={handleAgeChange}
          options={ageOptions}
        />

        <FilterSelect
          label="Тип"
          value={filters.type}
          onChange={handleTypeChange}
          options={typeOptions}
        />

        <FilterInput
          label="От"
          type="date"
          value={filters.from}
          onChange={handleFromChange}
        />

        <FilterInput
          label="До"
          type="date"
          value={filters.to}
          onChange={handleToChange}
        />
      </div>

      <div className="flex justify-between gap-10">
        <FilterInput
          label="Название"
          type="text"
          className="flex-5"
          value={filters.event_name}
          onChange={handleEventNameChange}
        />

        <div className="flex flex-2 justify-end items-center">
          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-2 text-[13px] text-filter-label transition hover:text-white"
          >
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M2 2L10 10M10 2L2 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>

            <span>Сбросить фильтр</span>
          </button>
        </div>
      </div>
    </section>
  );
};
