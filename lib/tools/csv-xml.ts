import type { ConvertResult } from "@/lib/tools/convert-result";
import { convertCsvJson } from "@/lib/tools/csv-json";
import { convertJsonXml } from "@/lib/tools/json-xml";

export type CsvXmlMode = "csv-to-xml" | "xml-to-csv";

export function convertCsvXml(input: string, mode: CsvXmlMode): ConvertResult {
  const trimmed = input.trim();
  if (!trimmed) {
    return {
      success: false,
      error: mode === "csv-to-xml" ? "Paste CSV to convert." : "Paste XML to convert.",
    };
  }

  if (mode === "csv-to-xml") {
    const jsonResult = convertCsvJson(trimmed, "csv-to-json");
    if (!jsonResult.success) return jsonResult;
    return convertJsonXml(jsonResult.output, "json-to-xml");
  }

  const jsonResult = convertJsonXml(trimmed, "xml-to-json");
  if (!jsonResult.success) return jsonResult;

  // Prefer array-looking payloads for CSV.
  try {
    const parsed = JSON.parse(jsonResult.output) as unknown;
    let rows: unknown = parsed;

    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      const values = Object.values(parsed as Record<string, unknown>);
      const first = values[0];
      if (Array.isArray(first)) rows = first;
      else if (first && typeof first === "object") rows = [first];
    }

    return convertCsvJson(JSON.stringify(rows), "json-to-csv");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Conversion failed";
    return { success: false, error: message };
  }
}

export const CSV_XML_SAMPLE_CSV = `name,tools,free
ToolBay,100,true
Studio,42,false`;

export const CSV_XML_SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<root>
  <item>
    <name>ToolBay</name>
    <tools>100</tools>
    <free>true</free>
  </item>
  <item>
    <name>Studio</name>
    <tools>42</tools>
    <free>false</free>
  </item>
</root>`;
