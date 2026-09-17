import { model, Schema } from 'mongoose'

export type WorkoutDifficulty = 'beginner' | 'intermediate' | 'advanced'

export interface Workout {
  title: string
  type: string
  difficulty: WorkoutDifficulty
  durationMinutes: number
  description: string
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
)

export const WorkoutModel = model<Workout>('Workout', workoutSchema)