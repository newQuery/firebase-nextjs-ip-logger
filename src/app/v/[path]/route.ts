import IpLoggerService from "@/services/ip_logger_service";
import { redirect } from "next/navigation";
export async function GET(request: Request) {
  const url = new URL(request.url);
  const path = url.href.split("/v/")[1];
  const ip = request.headers.get("X-Forwarded-For");
  const userAgent = request.headers.get("User-Agent");
  const service = new IpLoggerService();

  let link;
  try {
    const { logger } = await service.associateVictimToReference(
      path as string,
      {
        ip: ip as string,
        userAgent: userAgent as string,
      }
    );

    if (logger) {
      link = logger.data.link;
    }
  } catch (e: any) {
    console.log(e);
  }

  redirect(link ?? "https://rickroll.it/rickroll.mp4");
}
