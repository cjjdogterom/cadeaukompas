"use client";

import { formatDate } from "@/lib/deadlines";
import { cardDeadline } from "@/lib/season";
import type { Occasion } from "@/lib/types";
import { useTodayNL } from "./useTodayNL";

/** "Op tijd voor Sint: bestel t/m …", alleen zolang die datum niet verstreken is; daarna kerst, daarna niets. */
export function CardDeadline({ occasions, deliveryDaysMax }: { occasions: Occasion[]; deliveryDaysMax: number }) {
  const today = useTodayNL();
  const d = today ? cardDeadline(occasions, deliveryDaysMax, today) : null;
  if (!d) return <p className="mt-1 min-h-[1.5rem]" />;
  return (
    <p className="mt-1 text-[15px] text-pine">
      Op tijd voor {d.occasion === "sinterklaas" ? "Sint" : "kerst"}: bestel t/m {formatDate(d.date, true)}
    </p>
  );
}
