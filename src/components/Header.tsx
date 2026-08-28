import { CodeXml } from 'lucide-react';

function Header() {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2" >
          <h1 className="text-3xl">Minecraft Server card</h1>
        </div >
        <div className="flex flex-row items-center gap-2">
          <button className="btn">
            <a href='https://github.com/kotop21/mc-server-card' target="_blank" rel=" noreferrer"><CodeXml /></a>
          </button>
        </div>
      </div >
    </>
  )
}

export default Header
