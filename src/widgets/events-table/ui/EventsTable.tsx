import { useMemo } from "react";
import { useEventsContext } from "../../../app/providers/events/model/EventsContext";
import type { EventItemDto } from "../../../entities/event/api/types";
import {
  ageLabelMap,
  formatEventDate,
  genderLabelMap,
  typeLabelMap,
  weaponLabelMap,
} from "../../../entities/event/lib/event-formatters";

type EventsGridColumn = {
  key: string;
  label: string;
  secondaryLabel?: string;
  width: string;
  cellClassName?: string;
  render: (eventItem: EventItemDto) => string;
};

const columns: EventsGridColumn[] = [
  {
    key: "event_name",
    label: "Название",
    width: "minmax(0, 4.8fr)",
    cellClassName: "text-events-text",
    render: (eventItem) => eventItem.event_name,
  },
  {
    key: "gender",
    label: "Пол",
    width: "minmax(0, 0.7fr)",
    render: (eventItem) => genderLabelMap[eventItem.gender],
  },
  {
    key: "weapon",
    label: "Оружие",
    width: "minmax(0, 1fr)",
    render: (eventItem) => weaponLabelMap[eventItem.weapon],
  },
  {
    key: "age",
    label: "Возраст или",
    secondaryLabel: "год рождения",
    width: "minmax(0, 1.35fr)",
    render: (eventItem) => ageLabelMap[eventItem.age],
  },
  {
    key: "type",
    label: "Тип",
    width: "minmax(0, 1fr)",
    render: (eventItem) => typeLabelMap[eventItem.type],
  },
];

export const EventsTable = () => {
  const { events, isLoading, error } = useEventsContext();
  const stateClassName =
    "flex min-h-[220px] items-center rounded-[24px] px-6 py-6 text-events-text";
  const headingClassName =
    "min-w-0  px-4 py-[18px] pb-4 text-left text-[11px] leading-[1.2] font-normal tracking-[0.02em] text-events-heading whitespace-nowrap md:px-[18px]";
  const cellClassName =
    "h-full min-w-0 border-b border-t border-events-border px-4 py-[14px] text-left text-base leading-[1.3] font-normal text-events-muted whitespace-normal break-words [overflow-wrap:anywhere] md:px-[18px]";
  const gridTemplateColumns = useMemo(
    () => columns.map((column) => column.width).join(" "),
    [],
  );
  const groupedEvents = useMemo(() => {
    const groups = new Map<
      string,
      {
        label: string;
        items: typeof events;
      }
    >();

    events.forEach((eventItem) => {
      const groupKey = eventItem.start.slice(0, 10);
      const currentGroup = groups.get(groupKey);

      if (currentGroup) {
        currentGroup.items.push(eventItem);
        return;
      }

      groups.set(groupKey, {
        label: formatEventDate(eventItem.start),
        items: [eventItem],
      });
    });

    return Array.from(groups, ([key, value]) => ({
      key,
      ...value,
    }));
  }, [events]);

  if (isLoading) {
    return <p className={stateClassName}>Загрузка...</p>;
  }

  if (error) {
    return (
      <p
        className={`${stateClassName} border-events-error-border text-events-error-text`}
      >
        {error}
      </p>
    );
  }

  if (!events.length) {
    return <div className={stateClassName}>Ничего не найдено</div>;
  }

  return (
    <div className="rounded-3xl">
      <div
        className="h-155 overflow-y-auto overflow-x-hidden"
        role="table"
        aria-label="Список событий"
      >
        <div role="rowgroup">
          <div className="grid w-full" style={{ gridTemplateColumns }}>
            {columns.map((column) => (
              <div
                key={column.key}
                className={`${headingClassName} ${column.secondaryLabel ? "whitespace-normal" : ""}`}
              >
                {column.label}
                {column.secondaryLabel ? (
                  <>
                    <br />
                    {column.secondaryLabel}
                  </>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div role="rowgroup">
          {groupedEvents.map((group) => (
            <>
              <div className="grid w-full" style={{ gridTemplateColumns }}>
                <div
                  className=" px-4 py-4.5 pb-3.5 text-left text-[22px] leading-[1.1] font-normal text-events-text md:px-4.5 md:text-[28px]"
                  style={{ gridColumn: `1 / ${columns.length + 1}` }}
                >
                  {group.label}
                </div>
              </div>

              {group.items.map((eventItem) => (
                <div
                  key={eventItem.event_id}
                  className="grid w-full"
                  style={{ gridTemplateColumns }}
                  role="row"
                >
                  {columns.map((column) => (
                    <div
                      key={`${eventItem.event_id}-${column.key}`}
                      className={`${cellClassName} ${column.cellClassName ?? ""}`}
                      role="cell"
                    >
                      {column.render(eventItem)}
                    </div>
                  ))}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};
