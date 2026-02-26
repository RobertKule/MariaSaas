import React from 'react'
import { ClientDTO } from '@shared/types'

export const ClientTable: React.FC<{ clients: ClientDTO[] }> = ({ clients }) => {
  return (
    <table className="w-full text-left">
      <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
        <tr>
          <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Patient & Rang
          </th>
          <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Téléphone
          </th>
          <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            État du Crédit
          </th>
          <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {clients.map((client) => {
          const creditPercentage = (client.currentCredit / (client.creditLimit || 1)) * 100
          return (
            <tr
              key={client.id}
              className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group"
            >
              <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-400 uppercase">
                    {client.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800 dark:text-white text-base">
                      {client.name}
                    </span>
                    <span className="text-[8px] font-black uppercase text-emerald-600 tracking-widest">
                      {client.code}
                    </span>
                  </div>
                </div>
              </td>
              <td className="px-8 py-6 font-medium text-slate-500 dark:text-slate-400">
                {client.phone || 'Non renseigné'}
              </td>
              <td className="px-8 py-6">
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-[9px] font-black uppercase">
                    <span className="text-slate-400">
                      {client.currentCredit.toLocaleString()} FC
                    </span>
                    <span className="text-slate-300">/ {client.creditLimit.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 w-48 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${creditPercentage > 80 ? 'bg-red-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(creditPercentage, 100)}%` }}
                    />
                  </div>
                </div>
              </td>
              <td className="px-8 py-6 text-right">
                <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
                  <svg
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="m11 4 7 7m-15 8v-5l11-11 5 5-11 11h-5" />
                  </svg>
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
