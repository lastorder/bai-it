import { useState, useEffect, useCallback } from "react";
import type { LearningRecord, PatternKey } from "../../shared/types.ts";
import { learningRecordDAO } from "../../shared/db.ts";
import { EXAMPLE_SENTENCES } from "../exampleData.ts";

export function useSentences(db: IDBDatabase | null, isExample?: boolean) {
  const [records, setRecords] = useState<LearningRecord[]>([]);
  const [filter, setFilter] = useState<PatternKey | "all">("all");
  const [loading, setLoading] = useState(true);
  const [examplePatterns, setExamplePatterns] = useState<PatternKey[]>([]);

  useEffect(() => {
    if (isExample) {
      setRecords(EXAMPLE_SENTENCES.records);
      setExamplePatterns(EXAMPLE_SENTENCES.availablePatterns);
      setLoading(false);
      return;
    }

    if (!db) return;
    learningRecordDAO.getAll(db).then((all) => {
      // Sort by created_at descending
      const sorted = [...all].sort((a, b) => b.created_at - a.created_at);
      setRecords(sorted);
      setLoading(false);
    });
  }, [db, isExample]);

  const filtered = filter === "all"
    ? records
    : records.filter((r) => r.pattern_key === filter);

  // Collect all pattern keys that exist in the data
  const availablePatterns = isExample
    ? examplePatterns
    : (Array.from(
        new Set(records.map((r) => r.pattern_key).filter(Boolean))
      ) as PatternKey[]);

  return { records: filtered, filter, setFilter, availablePatterns, loading };
}
