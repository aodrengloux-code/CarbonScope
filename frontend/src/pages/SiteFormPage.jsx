import { useCarbon } from '../hooks/useCarbon'
import SiteForm from '../components/SiteForm'
import ResultCard from '../components/ResultCard'

export default function SiteFormPage() {
  const {
    formData,
    result,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleDemoFill,
    handleReset,
  } = useCarbon()

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Nouveau calcul</h1>
        <p className="text-gray-500 text-sm mt-1">Saisissez les caractéristiques d'un site pour calculer son empreinte carbone</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <SiteForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onDemoFill={handleDemoFill}
          loading={loading}
        />

        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {result ? (
            <ResultCard result={result} onReset={handleReset} />
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 px-6 py-16 text-center">
              <svg className="w-12 h-12 text-gray-200 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-400 text-sm">Le résultat apparaîtra ici après le calcul.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
