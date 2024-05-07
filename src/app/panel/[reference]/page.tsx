import CreateNewLogger from "@/components/create-new-logger.component";
import IpLoggerService, { Victim } from "@/services/ip_logger_service";
import { Timestamp } from "firebase/firestore";
export default async function Panel({
  params,
}: {
  params: { reference: string };
}) {
  const service = new IpLoggerService();
  const logger = await service.viewLogger(params.reference);
  const victims = await service.viewVictimsForLogger(params.reference);

  function formatDateUSA(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hour = date.getHours().toString();
    const min = date.getMinutes().toString();
    const sec = date.getSeconds().toString();

    return `${month}/${day}/${year} @ ${hour}:${min}:${sec}`;
  }

  const urlWithoutQuery: string = `${process.env.APP_URL}/v/${logger?.data.path}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-24">
      <div>
        <h1>
          IP Logger #<b>{params.reference}</b>
        </h1>
        <div className="mt-8 sm:mx-auto w-full sm:min-w-[600px]">
          <div className="bg-white py-8 shadow rounded-lg px-10">
            <div>
              <div>Malicious link</div>
              <div className="flex">
                <input
                  type="text"
                  value={urlWithoutQuery}
                  readOnly
                  className="border-black-300 px-2 py-2 bg-gray-100 w-full"
                />
              </div>
            </div>
            {victims &&
              victims.map((victim: Victim) => {
                return (
                  <>
                    <div className="bg-gray-100 py-2 px-4 my-2 rounded-lg">
                      <div>
                        <div className="flex w-full">
                          <div className="w-1/3">IP</div>
                          <div className="w-2/3">{victim.ip}</div>
                        </div>
                        <div className="flex w-full">
                          <div className="w-1/3">Date</div>
                          <div className="w-2/3">
                            {victim.createdAt &&
                              formatDateUSA(victim.createdAt.toDate())}
                          </div>
                        </div>
                        <div className="flex w-full">
                          <div className="w-1/3">User-Agent</div>
                          <div className="w-2/3 overflow">
                            {victim.userAgent}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
