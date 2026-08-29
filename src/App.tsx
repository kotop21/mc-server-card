import "@styles/App.css"
import { Header, SearchBar, ServerCard } from '@components';
import type { ServerCardStatus } from '@typings/serverCardStatus';
import { useState } from "react";
import type { ServerData } from "@typings/serverData";
import { AnimatePresence } from "motion/react";

function App() {
  const [serverCardStatus, setServerCardStatus] = useState<ServerCardStatus>('invisible');
  const [serverCardData, setServerCardData] = useState<ServerData>();

  return (
    <>
      <div className="flex flex-col gap-6 flex-1">
        <Header />
        <SearchBar setServerCardStatus={setServerCardStatus} setServerCardData={setServerCardData} />
        <AnimatePresence mode="wait">
          {serverCardStatus !== 'invisible' && (
            <ServerCard key={serverCardStatus} status={serverCardStatus} serverData={serverCardData} />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default App
