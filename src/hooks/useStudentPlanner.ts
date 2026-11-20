import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, createElement, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export type StudentTask = {
  id: string;
  title: string;
  course: string;
  dueDate: string; // Local calendar day: YYYY-MM-DD
  done: boolean;
};
export type StudentClass = {
  id: string;
  code: string;
  day: string;
  time: string;
  room: string;
};
export type StudentCourse = {
  id: string;
  code: string;
  name: string;
  professor: string;
  credits: number;
  grade: string;
};
const STORAGE_KEY = 'central-farmingdale:student-planner:v1';
const INITIAL_DATA = { tasks: [] as StudentTask[], classes: [] as StudentClass[], savedEvents: [] as string[], courses: [] as StudentCourse[] };

function useStudentPlannerState() {
  const [tasks, setTasks] = useState<StudentTask[]>([]);
  const [classes, setClasses] = useState<StudentClass[]>([]);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY).then(value => {
      if (!mounted) return;
      if (value) {
        try {
          const parsed: unknown = JSON.parse(value);
          if (parsed && typeof parsed === 'object') {
            const data = parsed as Partial<typeof INITIAL_DATA>;
            if (Array.isArray(data.tasks)) setTasks(data.tasks);
            if (Array.isArray(data.classes)) setClasses(data.classes);
            if (Array.isArray(data.savedEvents)) setSavedEvents(data.savedEvents);
            if (Array.isArray(data.courses)) setCourses(data.courses);
          }
        } catch (error) {
          console.warn('Could not read locally saved planner data', error);
        }
      }
    }).catch(error => console.warn('Could not load planner', error))
      .finally(() => { if (mounted) setReady(true); });
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, classes, savedEvents, courses }))
      .catch(error => console.warn('Could not save planner', error));
  }, [ready, tasks, classes, savedEvents, courses]);

  return { tasks, setTasks, classes, setClasses, savedEvents, setSavedEvents, courses, setCourses, ready };
}

type PlannerState = ReturnType<typeof useStudentPlannerState>;
const PlannerContext = createContext<PlannerState | null>(null);

// One mounted store for the entire Expo Router stack prevents screen-to-screen write conflicts.
export function StudentPlannerProvider({children}:{children:ReactNode}) {
  const planner = useStudentPlannerState();
  return createElement(PlannerContext.Provider, {value:planner}, children);
}

export function useStudentPlanner(): PlannerState {
  const context = useContext(PlannerContext);
  if (!context) throw new Error('useStudentPlanner must be called inside StudentPlannerProvider');
  return context;
}
