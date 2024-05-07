import CreateNewLogger from "@/components/create-new-logger.component";
import GoToPanelButton from "@/components/go-to-panel-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col  items-center justify-between p-4 sm:p-24">
      <div>
        <h1>IP Logger</h1>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="bg-white py-8 shadow rounded-lg sm:px-10">
            <CreateNewLogger></CreateNewLogger>
          </div>
          <div className="mt-5 bg-white py-8 shadow rounded-lg sm:px-10">
            <GoToPanelButton></GoToPanelButton>
          </div>
        </div>
      </div>
    </main>
  );
}
