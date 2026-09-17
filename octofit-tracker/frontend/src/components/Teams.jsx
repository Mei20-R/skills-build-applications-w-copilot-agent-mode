import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams'

function Teams() {
  const { items, loading, error } = useCollection(fetchCollection, teamsEndpoint)

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">COLLECTIVE MOTION</p>
          <h2>Teams</h2>
          <p className="section-summary">Find the people turning consistency into culture.</p>
        </div>
        <span className="metric-chip">{items.length} teams</span>
      </div>
      <CollectionState loading={loading} error={error} items={items} emptyMessage="No teams have been created yet.">
        <div className="card-grid">{items.map((team) => (
          <article className="info-card" key={team._id || team.name}>
            <div className="card-index">TEAM</div>
            <h3>{team.name || 'Unnamed team'}</h3>
            <p>{team.members?.length ?? 0} members</p>
            {team.members?.length > 0 && <div className="member-list">{team.members.slice(0, 4).map((member) => <span key={member._id || member} title={member.email}>{member.name || member}</span>)}</div>}
          </article>
        ))}</div>
      </CollectionState>
    </section>
  )
}

export default Teams
