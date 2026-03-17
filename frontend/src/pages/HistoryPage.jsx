import { useState, useEffect } from 'react'
import { getHistory } from '../api/carbonApi'
import HistoryTable from '../components/HistoryTable'

export default function HistoryPage() {
  const [history, setHistory] = useState([])

  const fetchHistory = async () => {
    try {
      const res = await getHistory()
      setHistory(res.data)
    } catch {
      // silently fail
    }
  }

  useEffect(() => { fetchHistory() }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Historique</h1>
        <p className="text-gray-500 text-sm mt-1">Tous les calculs d'empreinte carbone enregistrés</p>
      </div>
      <HistoryTable history={history} onRefresh={fetchHistory} />
    </div>
  )
}
