import "@styles/App.css"
import { Header, SearchBar, ServerCard } from '@components';
import type { ServerCardStatus } from '@typings/serverCardStatus';
import { useState } from "react";
import type { ServerData } from "@typings/serverData";

function App() {
  const [serverCardStatus, setServerCardStatus] = useState<ServerCardStatus>('invisible');
  const [serverCardData, setServerCardData] = useState<ServerData>();

  return (
    <>
      <Header />
      <SearchBar setServerCardStatus={setServerCardStatus} setServerCardData={setServerCardData} />
      <ServerCard status={serverCardStatus} serverData={serverCardData} />
    </>
  )
}

export default App
