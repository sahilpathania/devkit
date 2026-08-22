"use client";

import { Table2 } from "lucide-react";
import { BidirectionalConverter } from "@/components/tools/shared/bidirectional-converter";
import {
  CSV_XML_SAMPLE_CSV,
  CSV_XML_SAMPLE_XML,
  convertCsvXml,
  type CsvXmlMode,
} from "@/lib/tools/csv-xml";
import type { ToolComponentProps } from "@/types";

export function CsvXmlConverter(_props: ToolComponentProps) {
  return (
    <BidirectionalConverter<CsvXmlMode>
      defaultMode="csv-to-xml"
      ActionIcon={Table2}
      actionLabel="Convert"
      invertModeOnSwap={(mode) =>
        mode === "csv-to-xml" ? "xml-to-csv" : "csv-to-xml"
      }
      convert={convertCsvXml}
      modes={[
        {
          value: "csv-to-xml",
          label: "CSV → XML",
          inputLabel: "CSV",
          outputLabel: "XML",
          placeholder: "name,value\nToolBay,1",
          sample: CSV_XML_SAMPLE_CSV,
          successMessage: "Converted CSV to XML",
        },
        {
          value: "xml-to-csv",
          label: "XML → CSV",
          inputLabel: "XML",
          outputLabel: "CSV",
          placeholder: "<root><item><name>ToolBay</name></item></root>",
          sample: CSV_XML_SAMPLE_XML,
          successMessage: "Converted XML to CSV",
        },
      ]}
    />
  );
}
