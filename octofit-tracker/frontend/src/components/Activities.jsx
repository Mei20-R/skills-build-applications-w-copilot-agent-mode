import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities'

function Activities() {
  const { items, loading, error } = useCollection(fetchCollection, activitiesEndpoint)

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">MOVEMENT LOG</p>
          <h2>Activities</h2>
          <p className="section-summary">Every session adds momentum. Keep the streak visible.</p>
        </div>
        <span className="metric-chip">{items.length} logged</span>
      </div>
      <CollectionState loading={loading} error={error} items={items} emptyMessage="No activities logged yet.">
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Type</th><th>Duration</th><th>Distance</th><th>Points</th><th>Completed</th></tr></thead>
            <tbody>{items.map((activity) => (
              <tr key={activity._id || `${activity.type}-${activity.completedAt}`}>
                <td><span className="type-label">{activity.type || 'Workout'}</span></td>
                <td>{activity.durationMinutes ?? '-'} min</td>
                <td>{activity.distanceKm == null ? '-' : `${activity.distanceKm} km`}</td>
                <td><strong>{activity.points ?? 0}</strong></td>
                <td>{activity.completedAt ? new Date(activity.completedAt).toLocaleDateString() : '-'}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </CollectionState>
    </section>
  )
}

export default Activities
