export function CollectionState({ loading, error, items, children, emptyMessage }) {
  if (loading) return <div className="state-panel">Loading your OctoFit data...</div>
  if (error) return <div className="state-panel state-error">{error}</div>
  if (!items.length) return <div className="state-panel">{emptyMessage}</div>
  return children
}