import { fetchCollection } from '../api.js'
import { CollectionState } from './CollectionState.jsx'
import { useCollection } from './useCollection.js'

function Users() {
  const { items, loading, error } = useCollection(fetchCollection, 'users')

  return (
    <section className="content-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE COMMUNITY</p>
          <h2>Users</h2>
          <p className="section-summary">The athletes making OctoFit their own.</p>
        </div>
        <span className="metric-chip">{items.length} athletes</span>
      </div>
      <CollectionState loading={loading} error={error} items={items} emptyMessage="No users registered yet.">
        <div className="card-grid">{items.map((user) => (
          <article className="person-card" key={user._id || user.email}>
            <div className="avatar">{(user.name || '?').charAt(0).toUpperCase()}</div>
            <div><h3>{user.name || 'Unnamed user'}</h3><p>{user.email || 'No email provided'}</p></div>
          </article>
        ))}</div>
      </CollectionState>
    </section>
  )
}

export default Users
