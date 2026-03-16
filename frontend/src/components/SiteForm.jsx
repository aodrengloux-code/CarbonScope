import LoadingSpinner from './LoadingSpinner'

const fields = [
  { name: 'surfaceM2',     label: 'Surface totale (m²)',            type: 'number', min: 1,   placeholder: '11771' },
  { name: 'parkingSpots',  label: 'Places de parking',              type: 'number', min: 0,   placeholder: '308' },
  { name: 'energyMwh',     label: 'Consommation énergétique (MWh/an)', type: 'number', min: 0, placeholder: '1840' },
  { name: 'employees',     label: "Nombre d'employés",              type: 'number', min: 1,   placeholder: '1800' },
  { name: 'workstations',  label: 'Postes de travail',              type: 'number', min: 0,   placeholder: '1037' },
]

export default function SiteForm({ formData, onChange, onSubmit, onDemoFill, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 px-6 py-5 flex items-center gap-3">
        <div className="bg-white/20 rounded-xl p-2">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
        </div>
        <div>
          <h2 className="text-white font-bold text-lg leading-tight">Saisie du site</h2>
          <p className="text-green-100 text-xs mt-0.5">Renseignez les caractéristiques du site</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="p-6 space-y-5">
        {/* Nom du site — full width */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Nom du site <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            placeholder="Ex: Siège Rennes"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition"
          />
        </div>

        {/* Grid fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(({ name, label, type, min, placeholder }) => (
            <div key={name}>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={onChange}
                min={min}
                step="any"
                required
                placeholder={placeholder}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition"
              />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            type="button"
            onClick={onDemoFill}
            className="flex-1 px-4 py-2.5 rounded-xl border-2 border-green-600 text-green-700 font-semibold text-sm hover:bg-green-50 transition"
          >
            Charger les données de démo
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold text-sm transition flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Calcul en cours…
              </>
            ) : (
              "Calculer l'empreinte"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
