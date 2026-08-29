import { useState } from "react";
import type { ServerCardStatus } from '@typings/serverCardStatus';
import { serverFetch } from "@utils/serverFetch";
import type { ServerData } from "@typings/serverData";

interface SearchBarProps {
  setServerCardStatus: (status: ServerCardStatus) => void;
  setServerCardData: (data: ServerData | undefined) => void;
}

const serverIp = [
  "hypixel.net",
  "cubecraft.net",
  "donutsmp.net",
  "hivemc.com",
  "mineplex.com",
  "2b2t.org",
  "pika-network.net",
  "jartexnetwork.com",
  "manacube.com",
  "complex-gaming.com"
]

function SearchBar({ setServerCardStatus, setServerCardData }: SearchBarProps) {
  const [address, setAddress] = useState('');
  const [hasError, setHasError] = useState(false);
  const [lastSearched, setLastSearched] = useState('');
  const [randomServer] = useState(() => {
    return serverIp[Math.floor(Math.random() * serverIp.length)];
  });

  const handleSearch = async (targetAddress: string) => {
    setServerCardStatus('loading');
    console.log('Search server:', targetAddress);

    try {
      const res = await serverFetch(targetAddress);

      if (!res.success) {
        throw new Error(res.error);
      }

      console.log(res.data.players.online);
      setServerCardData(res.data)

      setLastSearched(targetAddress.toLowerCase());
      setHasError(false);
      setServerCardStatus('visible');
    } catch (err) {
      console.error(err);
      setLastSearched('');
      setHasError(true);
      setServerCardStatus('invisible');

    }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = address.trim();
    if (trimmed && trimmed.toLowerCase() !== lastSearched) {
      handleSearch(trimmed);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="floating-label w-full">
          <span>Server address</span>
          <input
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (hasError) setHasError(false);
            }}
            placeholder={randomServer}
            className={`input input-lg w-full ${hasError ? 'input-error' : ''}`}
          />
        </label>
      </form>
    </>
  )
}

export default SearchBar
