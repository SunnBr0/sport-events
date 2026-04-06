export type EventWeapon = "E" | "S" | "F";
export type EventGender = "M" | "F";
export type EventAge = "K" | "C" | "J" | "U23" | "A" | "V";
export type EventKind = "I" | "T";

export interface EventItemDto {
  event_id: string;
  event_name: string;
  category: boolean;
  type: EventKind;
  start: string;
  serie: string[];
  org_user_id: string;
  weapon: EventWeapon;
  gender: EventGender;
  age: EventAge;
  status: string;
  is_international: boolean;
}