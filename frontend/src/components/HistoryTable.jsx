function formatDate(isoString) {
  const d = new Date(isoString)
  const pad = (n) => String(n).padStart(2, '0')
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function fmt(value) {
  return Number(value).toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
}

export default function HistoryTable({ history, onRefresh }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-bold text-base leading-tight">Historique des calculs</h2>
            <p className="text-green-100 text-xs">{history.length} entrée{history.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button
          onClick={onRefresh}
          className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white text-sm font-semibold px-3 py-1.5 rounded-lg transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Rafraîchir
        </button>
      </div>

      {history.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-400 text-sm">Aucun calcul enregistré pour l'instant.</p>
          <p className="text-gray-300 text-xs mt-1">Soumettez un formulaire pour commencer.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap">Site</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap">Total CO₂</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap">Construction</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap">Exploitation</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap">CO₂/m²</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-green-800 uppercase tracking-wide whitespace-nowrap">CO₂/employé</th>
              </tr>
            </thead>
            <tbody>
              {history.map((row, i) => (
                <tr
                  key={row.id}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap font-mono text-xs">
                    {formatDate(row.calculatedAt)}
                  </td>
                  <td className="px-4 py-3 text-gray-900 font-medium whitespace-nowrap">{row.name}</td>
                  <td className="px-4 py-3 text-right text-green-700 font-bold whitespace-nowrap">{fmt(row.totalCo2Tons)}</td>
                  <td className="px-4 py-3 text-right text-gray-600 whitespace-nowrap">{fmt(row.constructionCo2Tons)}</td>
                  <td className="px-4 py-3 text-right text-gray-600 whitespace-nowrap">{fmt(row.exploitationCo2Tons)}</td>
                  <td className="px-4 py-3 text-right text-gray-500 whitespace-nowrap">{fmt(row.co2PerM2)}</td>
                  <td className="px-4 py-3 text-right text-gray-500 whitespace-nowrap">{fmt(row.co2PerEmployee)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
