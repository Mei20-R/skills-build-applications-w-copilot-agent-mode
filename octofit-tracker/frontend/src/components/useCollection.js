import { useEffect, useState } from 'react'

export function useCollection(fetchCollection, resource) {
  const [state, setState] = useState({ items: [], loading: true, error: '' })

  useEffect(() => {
    let active = true
    fetchCollection(resource)
      .then((items) => active && setState({ items, loading: false, error: '' }))
      .catch(() => active && setState({ items: [], loading: false, error: 'Unable to reach the API. Check that the backend is running on port 8000.' }))
    return () => { active = false }
  }, [fetchCollection, resource])

  return state
}
