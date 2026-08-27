import { CodeXml } from 'lucide-react';

function Header() {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2" >
          <h1 className="text-3xl">Minecraft Server card</h1>
        </div >
        <div className="flex flex-row items-center gap-2">
          <a href=''><CodeXml /></a>
        </div>
      </div>
    </>
  )
}

export default Header
