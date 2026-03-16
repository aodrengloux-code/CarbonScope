import { useState, useEffect } from 'react'
import { calculate, getHistory } from '../api/carbonApi'

const DEMO_DATA = {
  name: 'Siège Rennes',
  surfaceM2: 11771,
  parkingSpots: 308,
  energyMwh: 1840,
  employees: 1800,
  workstations: 1037,
}

const EMPTY_FORM = {
  name: '',
  surfaceM2: '',
  parkingSpots: '',
  energyMwh: '',
  employees: '',
  workstations: '',
}

export function useCarbon() {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const res = await getHistory()
      setHistory(res.data)
    } catch {
      // silently fail on initial history load
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDemoFill = () => {
    setFormData(DEMO_DATA)
    setResult(null)
    setError(null)
  }

  const handleReset = () => {
    setFormData(EMPTY_FORM)
    setResult(null)
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const payload = {
        name: formData.name,
        surfaceM2: parseFloat(formData.surfaceM2),
        parkingSpots: parseInt(formData.parkingSpots),
        energyMwh: parseFloat(formData.energyMwh),
        employees: parseInt(formData.employees),
        workstations: parseInt(formData.workstations),
      }
      const res = await calculate(payload)
      setResult(res.data)
      await fetchHistory()
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors du calcul. Vérifiez que le backend est démarré.')
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    result,
    history,
    loading,
    error,
    handleChange,
    handleSubmit,
    handleDemoFill,
    handleReset,
    fetchHistory,
  }
}
