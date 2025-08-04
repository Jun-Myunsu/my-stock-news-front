import React from "react";
import type { DartDisclosure } from "../types/dartDisclosure";

interface DisclosureLayerProps {
  disclosures: DartDisclosure[];
}

const DisclosureLayer: React.FC<DisclosureLayerProps> = ({ disclosures }) => (
  <div className="mt-2 bg-gray-50 dark:bg-gray-800/50 border border-blue-200 dark:border-blue-900/50 rounded shadow-lg p-3 text-xs max-w-full overflow-x-auto">
    <ul className="space-y-1">
      {disclosures.map((d, idx) => (
        <li key={d.rcept_no + idx} className="truncate">
          <span className="font-semibold text-gray-800 dark:text-gray-200">
            {d.report_nm.length > 40
              ? d.report_nm.slice(0, 40) + "..."
              : d.report_nm}
          </span>
          <span className="ml-2 text-gray-500 dark:text-gray-400">
            {d.flr_nm}
          </span>
          <span className="ml-2 text-gray-400 dark:text-gray-500">
            {d.rcept_dt}
          </span>
          <a
            href={`https://dart.fss.or.kr/dsaf001/main.do?rcpNo=${d.rcept_no}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
          >
            보기
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default DisclosureLayer;
