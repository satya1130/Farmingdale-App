import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FeatureScreen from '../components/FeatureScreen';
import { theme } from '../constants/theme';

type Task = { id: number; title: string; done: boolean };
export default function Deadlines() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  function addTask() {
    const trimmed = title.trim();
    if (!trimmed) return;
    setTasks(current => [...current, { id: Date.now(), title: trimmed, done: false }]);
    setTitle('');
  }
  return <FeatureScreen title="Upcoming Deadlines" subtitle="Organize your assignments" icon="time-outline" note="Personal demo checklist only. Items are stored in memory and reset when the app restarts; no Brightspace integration or deadline alerts yet.">
    <View style={styles.card}>
      <Text style={styles.heading}>Add a task</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Assignment or reminder" placeholderTextColor={theme.muted} style={styles.input} accessibilityLabel="Task title" onSubmitEditing={addTask} returnKeyType="done" />
      <TouchableOpacity style={styles.add} onPress={addTask} accessibilityRole="button"><Ionicons name="add-circle-outline" size={20} color="#fff" /><Text style={styles.addText}>Add task</Text></TouchableOpacity>
    </View>
    <View style={styles.card}><Text style={styles.heading}>My checklist</Text>
      {tasks.length === 0 ? <Text style={styles.empty}>No tasks yet. Add an assignment above to get started.</Text> : tasks.map(task =>
        <TouchableOpacity key={task.id} style={styles.task} onPress={() => setTasks(current => current.map(t => t.id === task.id ? { ...t, done: !t.done } : t))} accessibilityRole="checkbox" accessibilityState={{ checked: task.done }}>
          <Ionicons name={task.done ? 'checkbox' : 'square-outline'} size={23} color={theme.greenStrong} />
          <Text style={[styles.taskText, task.done && styles.done]}>{task.title}</Text>
        </TouchableOpacity>)}
    </View>
  </FeatureScreen>;
}
const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: theme.border, borderRadius: 13, padding: 16, marginBottom: 15 },
  heading: { color: theme.text, fontSize: 17, fontWeight: '800', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: theme.border, borderRadius: 10, padding: 13, color: theme.text, fontSize: 15 },
  add: { backgroundColor: theme.greenStrong, borderRadius: 10, marginTop: 12, padding: 13, flexDirection: 'row', gap: 8, justifyContent: 'center', alignItems: 'center' },
  addText: { color: '#fff', fontWeight: '800' },
  empty: { color: theme.muted, fontSize: 13, lineHeight: 20 },
  task: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#EDF1ED' },
  taskText: { color: theme.text, flex: 1, fontSize: 14 },
  done: { textDecorationLine: 'line-through', color: theme.muted },
});
