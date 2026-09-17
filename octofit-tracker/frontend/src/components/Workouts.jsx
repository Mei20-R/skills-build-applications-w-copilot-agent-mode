import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

function Workouts() {
  const { items, loading, error } = useCollection(fetchCollection, 'workouts')

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">YOUR NEXT MOVE</p>
          <h2>Workouts</h2>
          <p className="section-summary">Choose a challenge that meets you where you are.</p>
        </div>
        <span className="metric-chip">{items.length} plans</span>
      </div>
      <CollectionState loading={loading} error={error} items={items} emptyMessage="No workouts are available yet.">
        <div className="card-grid">{items.map((workout) => (
          <article className="info-card workout-card" key={workout._id || workout.title}>
            <div className="workout-meta"><span>{workout.type || 'Training'}</span><span>{workout.difficulty || 'All levels'}</span></div>
            <h3>{workout.title || 'Untitled workout'}</h3>
            <p>{workout.description || 'A focused session for your next training block.'}</p>
            <strong className="duration">{workout.durationMinutes ?? '-'} min</strong>
          </article>
        ))}</div>
      </CollectionState>
    </section>
  )
}

export default Workouts
