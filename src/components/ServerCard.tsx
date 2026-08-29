import type { ServerCardStatus } from '@typings/serverCardStatus';
import type { ServerData } from '@typings/serverData';
import { motion } from 'motion/react'

interface ServerCardProps {
  status: ServerCardStatus;
  serverData?: ServerData;
}

function ServerCard({ status, serverData }: ServerCardProps) {
  if (status === 'invisible' || !serverData) {
    return null;
  }

  if (status === 'loading') {
    return (
      <motion.div initial={{ opacity: 0 }}
        layout
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="card w-full bg-base-200 shadow-xl border border-base-300 p-4 animate-pulse">
        <div className="flex flex-row items-center gap-4">
          <div className="w-16 h-16 rounded bg-base-300 shrink-0" />
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 bg-base-300 rounded w-1/3" />
            <div className="h-3 bg-base-300 rounded w-3/4" />
            <div className="h-3 bg-base-300 rounded w-1/2" />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      exit={{ opacity: 0, y: -12 }}
      className="card relative w-full bg-base-200 shadow-xl border border-base-300 font-mono select-none">
      <div className="card-body p-4 flex flex-row items-center gap-3">
        <div className="avatar shrink-0">
          <div className="w-16 h-16 rounded bg-base-300 overflow-hidden border border-base-content/10">
            <img
              src={serverData.icon || '/favicon.svg'}
              alt={`${serverData.host} Icon`}
              className="w-full h-full object-cover [image-rendering:pixelated]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 min-w-0 h-16 py-0.5">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-base text-white truncate tracking-wide">
              {serverData.host}
            </span>

            {serverData.players && (
              <div className="text-sm shrink-0">
                <span className="text-neutral-400">
                  {serverData.players.online.toLocaleString('en-US')}
                  <span className="text-neutral-500"> / </span>
                  {serverData.players.max.toLocaleString('en-US')}
                </span>
              </div>
            )}
          </div>

          <div className="text-xs text-neutral-400 leading-tight space-y-0.5 truncate pr-6">
            <p className="truncate">
              {serverData.motd?.clean || 'A Minecraft Server'}
            </p>
            {serverData.version?.name_clean && (
              <p className="truncate text-neutral-500">
                {serverData.version.name_clean}
              </p>
            )}
          </div>
        </div>
      </div>

      <span
        className={`absolute bottom-4 right-4 w-3 h-3 rounded-full shrink-0 ${serverData.online
          ? 'bg-success shadow-[0_0_8px_rgba(34,197,94,0.6)]'
          : 'bg-error shadow-[0_0_8px_rgba(239,68,68,0.6)]'
          }`}
      />
    </motion.div>
  );
}

export default ServerCard;
