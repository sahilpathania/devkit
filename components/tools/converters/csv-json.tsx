"use client";

import { Table2 } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  CSV_JSON_SAMPLE_CSV,
  CSV_JSON_SAMPLE_JSON,
  convertCsvJson,
  type CsvJsonMode,
} from "@/lib/tools/csv-json";
import type { ToolComponentProps } from "@/types";

export function CsvJsonConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<CsvJsonMode>
      defaultMode="csv-to-json"
      ActionIcon={Table2}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "csv-to-json" ? "json-to-csv" : "csv-to-json"
      }
      convert={convertCsvJson}
      modes={[
        {
          value: "csv-to-json",
          label: "CSV → JSON",
          inputLabel: "CSV",
          outputLabel: "JSON",
          placeholder: "name,value\nToolBay,1",
          sample: CSV_JSON_SAMPLE_CSV,
          successMessage: "Converted CSV to JSON",
        },
        {
          value: "json-to-csv",
          label: "JSON → CSV",
          inputLabel: "JSON",
          outputLabel: "CSV",
          placeholder: '[{"name":"ToolBay"}]',
          sample: CSV_JSON_SAMPLE_JSON,
          successMessage: "Converted JSON to CSV",
        },
      ]}
    />
  );
}
