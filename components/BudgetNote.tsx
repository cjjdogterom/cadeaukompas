/**
 * Uitleg bij elke budgetselectie (beslissing 18-11, ops/decisions.md): budgetten rekenen met de laatst
 * gecontroleerde prijs, ook als die ouder is dan 48 uur en we hem daarom niet meer tonen.
 */
export const BUDGET_NOTE =
  "Budget gaat uit van de laatst door ons gecontroleerde prijs. Staat er “Bekijk prijs bij …”, dan is die controle ouder dan 48 uur en kan de prijs bij de winkel inmiddels anders zijn.";

export function BudgetNote({ className = "" }: { className?: string }) {
  return <p className={`text-sm text-muted ${className}`}>{BUDGET_NOTE}</p>;
}
