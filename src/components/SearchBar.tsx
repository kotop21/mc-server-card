import { useState } from "react";
import type { ServerCardStatus } from '@typings/serverCardStatus';
import { serverFetch } from "@utils/serverFetch";
import type { ServerData } from "@typings/serverData";

interface SearchBarProps {
  setServerCardStatus: (status: ServerCardStatus) => void;
  setServerCardData: (data: ServerData | undefined) => void;
}

function SearchBar({ setServerCardStatus, setServerCardData }: SearchBarProps) {
  const [address, setAddress] = useState('');

  const handleSearch = async (targetAddress: string) => {
    console.log('Search server:', targetAddress);
    setServerCardStatus('loading');

    try {
      const res = await serverFetch(targetAddress);

      if (!res.success) {
        throw new Error(res.error);
      }

      console.log(res.data.players.online);
      setServerCardData(res.data)

      setServerCardStatus('visible');
    } catch (err) {
      console.error(err);
      setServerCardStatus('invisible');
    }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = address.trim();
    if (trimmed) {
      handleSearch(trimmed);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="floating-label w-full">
          <span>Server address</span>
          <input type="text" onChange={(e) => setAddress(e.target.value)} placeholder="hypixel.net" className="input input-lg w-full" />
        </label>
      </form>
    </>
  )
}

export default SearchBar
