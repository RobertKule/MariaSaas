import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@renderer/app/store/store'
import { createNewClient } from '@renderer/app/store/slice/clientSlice'
import { LoyaltyStatus } from '@shared/types'

export const AddClientModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    creditLimit: 0,
    loyaltyStatus: LoyaltyStatus.NONE
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await dispatch(createNewClient(formData))
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[120] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 border border-slate-200 dark:border-slate-800">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6 uppercase italic tracking-tighter">
          Nouveau Patient
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Nom Complet
            </label>
            <input
              required
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold dark:text-white mt-1"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Téléphone
            </label>
            <input
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold dark:text-white mt-1"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
              Limite de Crédit (FC)
            </label>
            <input
              type="number"
              className="w-full px-5 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 font-bold dark:text-white mt-1"
              value={formData.creditLimit}
              onChange={(e) => setFormData({ ...formData, creditLimit: Number(e.target.value) })}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 text-slate-500 font-bold hover:bg-slate-100 rounded-2xl transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl hover:bg-emerald-500 transition-all"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
