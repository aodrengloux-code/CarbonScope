import { useState, useEffect } from 'react'
import { getDashboardSummary } from '../api/carbonApi'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

function KpiCard({ label, value, unit, icon, color }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</p>
          <p className={`text-3xl font-black mt-2 tracking-tight ${color}`}>
            {typeof value === 'number' ? value.toLocaleString('fr-FR', { maximumFractionDigits: 2 }) : value}
          </p>
          <p className="text-xs text-gray-400 mt-1 font-medium">{unit}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${
          color.includes('green') ? 'from-green-50 to-emerald-50' :
          color.includes('blue') ? 'from-blue-50 to-sky-50' :
          color.includes('purple') ? 'from-purple-50 to-violet-50' :
          'from-amber-50 to-orange-50'
        }`}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getDashboardSummary()
      .then(res => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!data || data.totalSites === 0) {
    return (
      <div className="text-center py-20">
        <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <h2 className="text-xl font-bold text-gray-400 mb-2">Aucune donnée</h2>
        <p className="text-gray-400 text-sm">Effectuez un premier calcul pour voir apparaître le dashboard.</p>
      </div>
    )
  }

  const doughnutData = {
    labels: ['Construction', 'Exploitation'],
    datasets: [{
      data: [data.totalConstructionCo2, data.totalExploitationCo2],
      backgroundColor: ['#16a34a', '#34d399'],
      hoverBackgroundColor: ['#15803d', '#6ee7b7'],
      borderWidth: 0,
      borderRadius: 4,
    }],
  }

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyleWidth: 12,
          font: { size: 12, weight: '600' },
        },
      },
    },
  }

  const barData = {
    labels: data.sites.map(s => s.name.length > 15 ? s.name.substring(0, 15) + '…' : s.name),
    datasets: [
      {
        label: 'Construction (tCO₂e)',
        data: data.sites.map(s => s.constructionCo2Tons),
        backgroundColor: '#16a34a',
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Exploitation (tCO₂e)',
        data: data.sites.map(s => s.exploitationCo2Tons),
        backgroundColor: '#34d399',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  }

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyleWidth: 12,
          font: { size: 12, weight: '600' },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11, weight: '500' } },
      },
      y: {
        grid: { color: '#f3f4f6' },
        ticks: { font: { size: 11 } },
        title: {
          display: true,
          text: 'tCO₂e',
          font: { size: 12, weight: '600' },
          color: '#6b7280',
        },
      },
    },
  }

  const constructionPct = data.totalCo2Tons > 0
    ? Math.round((data.totalConstructionCo2 / data.totalCo2Tons) * 100)
    : 0

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Vue d'ensemble de l'empreinte carbone de vos sites</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          label="CO₂ Total"
          value={data.totalCo2Tons}
          unit="tonnes CO₂ équivalent"
          color="text-green-700"
          icon={
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          }
        />
        <KpiCard
          label="Sites analysés"
          value={data.totalSites}
          unit="sites enregistrés"
          color="text-blue-700"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          }
        />
        <KpiCard
          label="CO₂ / m²"
          value={data.avgCo2PerM2}
          unit="tCO₂e par m² (moyenne)"
          color="text-purple-700"
          icon={
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
            </svg>
          }
        />
        <KpiCard
          label="CO₂ / employé"
          value={data.avgCo2PerEmployee}
          unit="tCO₂e par employé (moyenne)"
          color="text-amber-700"
          icon={
            <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Doughnut */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-700 mb-1">Répartition Construction / Exploitation</h3>
          <p className="text-xs text-gray-400 mb-6">Part en tCO₂e de chaque catégorie</p>
          <div className="h-64 relative">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ marginBottom: '40px' }}>
              <div className="text-center">
                <p className="text-2xl font-black text-gray-800">{constructionPct}%</p>
                <p className="text-[10px] text-gray-400 font-semibold">CONSTRUCTION</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bar chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-sm font-bold text-gray-700 mb-1">Comparaison par site</h3>
          <p className="text-xs text-gray-400 mb-6">Empreinte construction vs exploitation par site</p>
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>

      {/* Details table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-700">Détail par site</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Site</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Total CO₂</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Construction</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Exploitation</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">CO₂/m²</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">CO₂/employé</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.sites.map((site) => (
                <tr key={site.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{site.name}</td>
                  <td className="px-6 py-4 text-right font-bold text-green-700 whitespace-nowrap">
                    {site.totalCo2Tons.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-600 whitespace-nowrap">
                    {site.constructionCo2Tons.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-600 whitespace-nowrap">
                    {site.exploitationCo2Tons.toLocaleString('fr-FR', { maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-500 whitespace-nowrap">
                    {site.co2PerM2.toLocaleString('fr-FR', { maximumFractionDigits: 3 })}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-500 whitespace-nowrap">
                    {site.co2PerEmployee.toLocaleString('fr-FR', { maximumFractionDigits: 3 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
