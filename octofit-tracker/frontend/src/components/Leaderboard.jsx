import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

function Leaderboard() {
  const { items, loading, error } = useCollection(fetchCollection, 'leaderboard')

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">TEAM ENERGY</p>
          <h2>Leaderboard</h2>
          <p className="section-summary">A little friendly pressure for the next great session.</p>
        </div>
        <span className="metric-chip">{items.length} ranked</span>
      </div>
      <CollectionState loading={loading} error={error} items={items} emptyMessage="The leaderboard will appear after the first activity.">
        <div className="leaderboard-list">{items.map((entry, index) => (
          <article className={`leader-row ${index === 0 ? 'leader-row-top' : ''}`} key={entry.userId || entry._id || entry.name}>
            <span className="rank-number">{entry.rank || index + 1}</span>
            <div className="person-summary"><strong>{entry.name || 'Unnamed athlete'}</strong><span>{entry.activityCount ?? 0} activities</span></div>
            <strong className="score-value">{entry.points ?? 0}<small> pts</small></strong>
          </article>
        ))}</div>
      </CollectionState>
    </section>
  )
}

export default Leaderboard
