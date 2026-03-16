export default function ResultCard({ result, onReset }) {
  const {
    name,
    totalCo2Tons,
    constructionCo2Tons,
    exploitationCo2Tons,
    co2PerM2,
    co2PerEmployee,
  } = result

  const constructionPct = totalCo2Tons > 0
    ? Math.round((constructionCo2Tons / totalCo2Tons) * 100)
    : 0
  const exploitationPct = 100 - constructionPct

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg border border-green-100">
      {/* Hero header */}
      <div className="bg-gradient-to-br from-green-800 via-green-700 to-green-600 px-6 py-6 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-green-200 text-xs font-semibold uppercase tracking-widest mb-1">Résultat — {name}</p>
            <p className="text-5xl font-black leading-none tracking-tight">
              {totalCo2Tons.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
            </p>
            <p className="text-green-200 text-sm mt-1 font-medium">tCO₂e total</p>
          </div>
          <div className="bg-white/15 rounded-xl p-3 shrink-0">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-white px-6 py-5 space-y-5">
        {/* Split columns */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Construction</p>
            <p className="text-2xl font-black text-green-900">
              {constructionCo2Tons.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
            </p>
            <p className="text-xs text-green-600 mt-0.5">tCO₂e · {constructionPct}%</p>
          </div>
          <div className="bg-emerald-50 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-1">Exploitation</p>
            <p className="text-2xl font-black text-emerald-900">
              {exploitationCo2Tons.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })}
            </p>
            <p className="text-xs text-emerald-600 mt-0.5">tCO₂e · {exploitationPct}%</p>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Construction {constructionPct}%</span>
            <span>Exploitation {exploitationPct}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
            <div
              className="bg-green-600 transition-all duration-700"
              style={{ width: `${constructionPct}%` }}
            />
            <div
              className="bg-emerald-400 transition-all duration-700"
              style={{ width: `${exploitationPct}%` }}
            />
          </div>
        </div>

        {/* Ratio badges */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 14a6 6 0 110-12 6 6 0 010 12z" />
            </svg>
            {co2PerM2.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} tCO₂e / m²
          </span>
          <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full">
            <svg className="w-3.5 h-3.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 1114 0H3z" />
            </svg>
            {co2PerEmployee.toLocaleString('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 })} tCO₂e / employé
          </span>
        </div>

        {/* Reset button */}
        <button
          onClick={onReset}
          className="w-full px-4 py-2.5 rounded-xl border-2 border-green-600 text-green-700 font-semibold text-sm hover:bg-green-50 transition"
        >
          Nouveau calcul
        </button>
      </div>
    </div>
  )
}
