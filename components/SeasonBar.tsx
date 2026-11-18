"use client";

import { formatDate } from "@/lib/deadlines";
import { currentSeason } from "@/lib/season";
import { useTodayNL } from "./useTodayNL";

const FEEST = { sinterklaas: "pakjesavond", kerst: "kerst" } as const;
const BAR = "min-h-[3.875rem] bg-[#f6e6df] px-4 py-2.5 text-center text-[15px] leading-snug text-[#2b2622] sm:min-h-[2.625rem] sm:text-base";

/** Promobalk: aftelling en snelste besteldag van het lopende seizoen. Na de laatste deadline een neutrale tekst. */
export function SeasonBar() {
  const today = useTodayNL();
  if (!today) return <p className={BAR} />;
  const season = currentSeason(today);
  if (!season) {
    return <p className={`${BAR} !min-h-0`}>Bij elk cadeau zie je wanneer het in huis is.</p>;
  }
  const { daysLeft, fastestOrderBy, occasion } = season;
  return (
    <p className={BAR}>
      <span>
        Nog <strong className="font-semibold">{daysLeft}</strong> {daysLeft === 1 ? "dag" : "dagen"} tot {FEEST[occasion]}
      </span>
      <span className="max-sm:block sm:before:content-['_·_']">
        De snelste cadeaus bestel je uiterlijk{" "}
        <strong className="font-bold whitespace-nowrap">
          <span className="sm:hidden">{formatDate(fastestOrderBy, true)}</span>
          <span className="max-sm:hidden">{formatDate(fastestOrderBy)}</span>
        </strong>
      </span>
    </p>
  );
}
