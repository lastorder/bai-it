import { useState, useEffect } from "react";
import type { BaitConfig } from "../../shared/types.ts";
import { learningRecordDAO } from "../../shared/db.ts";

export type OnboardingState = "no-key" | "has-key-no-data" | "has-data";

export function useOnboardingState(
  db: IDBDatabase | null,
  config: BaitConfig,
  configLoading: boolean
): { state: OnboardingState; loading: boolean } {
  const [state, setState] = useState<OnboardingState>("no-key");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (configLoading) return;

    // Check if any provider has an API key
    const hasKey = Object.values(config.llm.providers).some(
      (p) => p.apiKey && p.apiKey.trim() !== ""
    );

    if (!hasKey) {
      setState("no-key");
      setLoading(false);
      return;
    }

    // Has key — check if there's any data
    if (!db) return;

    learningRecordDAO.getAll(db).then((records) => {
      setState(records.length > 0 ? "has-data" : "has-key-no-data");
      setLoading(false);
    });
  }, [db, config, configLoading]);

  return { state, loading };
}
