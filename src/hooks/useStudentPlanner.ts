import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

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
const STORAGE_KEY = 'central-farmingdale:student-planner:v1';
const INITIAL_DATA = { tasks: [] as StudentTask[], classes: [] as StudentClass[], savedEvents: [] as string[] };

export function useStudentPlanner() {
  const [tasks, setTasks] = useState<StudentTask[]>([]);
  const [classes, setClasses] = useState<StudentClass[]>([]);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);
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
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks, classes, savedEvents }))
      .catch(error => console.warn('Could not save planner', error));
  }, [ready, tasks, classes, savedEvents]);

  return { tasks, setTasks, classes, setClasses, savedEvents, setSavedEvents, ready };
}
