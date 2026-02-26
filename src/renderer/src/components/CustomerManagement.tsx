import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@renderer/app/store/store'
import { fetchClients } from '@renderer/app/store/slice/clientSlice'
import { ClientStats } from './ClientStats'
import { ClientTable } from './ClientTable'
import { AddClientModal } from './AddClientModal'

const CustomerManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { list: clients, isLoading } = useSelector((state: RootState) => state.clients)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchClients(searchTerm))
    }, 300)
    return () => clearTimeout(delayDebounce)
  }, [searchTerm, dispatch])

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      {/* 1. Stats */}
      <ClientStats clients={clients} />

      {/* 2. Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full md:w-96 group">
          <input
            type="text"
            placeholder="Rechercher nom, téléphone, code..."
            className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-none rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-bold dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <svg
            className="absolute left-4 top-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors"
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full md:w-auto px-8 py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Nouveau Patient
        </button>
      </div>

      {/* 3. Table */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {isLoading && clients.length === 0 ? (
          <div className="p-20 text-center animate-pulse text-slate-400 font-black uppercase tracking-widest">
            Initialisation des dossiers...
          </div>
        ) : (
          <ClientTable clients={clients} />
        )}
      </div>

      {/* 4. Modal */}
      {showAddModal && <AddClientModal onClose={() => setShowAddModal(false)} />}
    </div>
  )
}

export default CustomerManagement
