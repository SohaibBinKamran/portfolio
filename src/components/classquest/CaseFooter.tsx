import { caseFooter } from "@/data/classquest";
import { ClassQuestLockup } from "./Logo";

export function CaseFooter() {
  return (
    <section className="border-t border-[var(--cq-border)] px-6 py-14">
      <div className="mx-auto flex w-full max-w-[1172px] flex-col gap-4">
        <ClassQuestLockup
          className="text-[var(--cq-dark)]"
          markClass="h-[24px] w-auto"
          wordClass="text-[20px]"
        />
        <p className="max-w-[90ch] text-[13px] leading-[1.6] text-[var(--cq-muted)]">
          {caseFooter.credit}
        </p>
      </div>
    </section>
  );
}
