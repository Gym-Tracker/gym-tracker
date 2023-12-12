import { highestWeightSet } from './WorkoutCardHelper.ts';
import { Workout } from '../types'

const workout : Workout = {
  date: new Date(),
  duration: 3600,
  exercises: [
    {
      name: "Squat",
      sets: [
        {
          type: 0,
          weight: 30,
          reps: 5
        },
        {
          type: 0,
          weight: 35,
          reps: 5
        },
        {
          type: 0,
          weight: 37.5,
          reps: 8
        },
        {
          type: 0,
          weight: 30,
          reps: 5
        }
      ]
    },
    {
      name: "Bench Press",
      sets: [
        {
          type: 0,
          weight: 25,
          reps: 5
        },
        {
          type: 0,
          weight: 27.5,
          reps: 5
        },
        {
          type: 0,
          weight: 32.5,
          reps: 8
        }
      ]
    }
  ]
}

test('highest weight set', () => {
  expect(highestWeightSet(workout.exercises[0].sets)).toStrictEqual(
    {
      type: 0,
      weight: 37.5,
      reps: 8
    }
  );
});
