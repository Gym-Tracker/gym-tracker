export interface Workout {
  date: Date;
  duration: number;
  exercises: Exercise[];
}

export interface Exercise {
  id: number;
  sets: Set[];
}

export interface Set {
  type: number;
  weight: number;
  reps: number;
}


export interface Routine {
  name: string;
  exercises: Exercise[];
}


export interface ActiveWorkout {
  exercises: ActiveExercise[];
}

export interface ActiveExercise {
  id: number;
  sets: ActiveSet[];
}

export interface ActiveSet extends Set {
  done: boolean;
}


export interface ExerciseDetails {
  name: string,
  force: string|null,
  level: string,
  mechanic: string|null,
  equipment: string|null,
  primaryMuscles: string[],
  secondaryMuscles: string[],
  instructions: string[],
  category: string,
  id: number
}
