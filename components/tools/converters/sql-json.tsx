"use client";

import { Database } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  SQL_JSON_SAMPLE_JSON,
  SQL_JSON_SAMPLE_SQL,
  convertSqlJson,
  type SqlJsonMode,
} from "@/lib/tools/sql-json";
import type { ToolComponentProps } from "@/types";

export function SqlJsonConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<SqlJsonMode>
      defaultMode="sql-to-json"
      ActionIcon={Database}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "sql-to-json" ? "json-to-sql" : "sql-to-json"
      }
      convert={convertSqlJson}
      modes={[
        {
          value: "sql-to-json",
          label: "SQL → JSON",
          inputLabel: "SQL",
          outputLabel: "JSON",
          placeholder: "INSERT INTO users (id, name) VALUES (1, 'Ada');",
          sample: SQL_JSON_SAMPLE_SQL,
          successMessage: "Converted SQL to JSON",
        },
        {
          value: "json-to-sql",
          label: "JSON → SQL",
          inputLabel: "JSON",
          outputLabel: "SQL",
          placeholder: '{"table":"users","rows":[{"id":1}]}',
          sample: SQL_JSON_SAMPLE_JSON,
          successMessage: "Converted JSON to SQL",
        },
      ]}
    />
  );
}
