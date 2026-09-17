import { model, Schema, Types } from 'mongoose'

export type ActivityType = 'running' | 'walking' | 'strength'

export interface Activity {
  userId: Types.ObjectId
  type: ActivityType
  durationMinutes: number
  distanceKm?: number
  points: number
  completedAt: Date
}

const activitySchema = new Schema<Activity>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['running', 'walking', 'strength'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
)

export const ActivityModel = model<Activity>('Activity', activitySchema)