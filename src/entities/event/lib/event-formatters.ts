import type { EventAge, EventGender, EventWeapon } from "../api/types";

export const weaponLabelMap: Record<EventWeapon, string> = {
  E: "Шпага",
  S: "Сабля",
  F: "Рапира",
};

export const genderLabelMap: Record<EventGender, string> = {
  M: "М",
  F: "Ж",
};

export const ageLabelMap: Record<EventAge, string> = {
  K: "Кадеты",
  C: "Дети",
  J: "Юниоры",
  U23: "До 23",
  A: "Взрослые",
  V: "Ветераны",
};

export const typeLabelMap: Record<"I" | "T", string> = {
  I: "Личные",
  T: "Командные",
};

export const formatEventDate = (value: string): string => {
  const date = new Date(value);

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};