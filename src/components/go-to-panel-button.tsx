"use client";

import VInput from "@/components/vinput.component";
import { useState } from "react";

export default function GoToPanelButton() {
  const [path, setPath] = useState("");

  const url = `/panel/${path}`;
  return (
    <div>
      <VInput
        type="text"
        name="reference"
        id="reference"
        setModel={setPath}
        model={path}
        label="Reference"
        small="This is given when creating a new IP Logger"
      ></VInput>
      <div className="px-2">
        <a
          href={url}
          className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
        >
          Go to console
        </a>
      </div>
    </div>
  );
}
