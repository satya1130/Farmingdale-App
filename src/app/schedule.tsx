import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FeatureScreen from '../components/FeatureScreen';
import { theme } from '../constants/theme';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const;
const sample = [
  { day: 'Mon', time: '8:00 AM', course: 'CSC 220', room: 'Lupton Hall 212' },
  { day: 'Mon', time: '10:00 AM', course: 'MAT 151', room: 'Whitman Hall 108' },
  { day: 'Mon', time: '1:00 PM', course: 'BIO 110', room: 'Gleeson Hall 104' },
  { day: 'Mon', time: '4:00 PM', course: 'ENG 101', room: 'Whitman Hall 214' },
  { day: 'Tue', time: '9:25 AM', course: 'Example course', room: 'Example room' },
] as const;

export default function Schedule() {
  const [day, setDay] = useState<(typeof weekdays)[number]>('Mon');
  return (
    <FeatureScreen title="Weekly Schedule" subtitle="Plan your classes Monday through Friday" icon="calendar-outline" note="Demo timetable only. These are sample courses from the design, not your actual registration. Use official college services for personal schedule details.">
      <View style={styles.notice}><Ionicons name="information-circle-outline" size={19} color={theme.greenStrong} /><Text style={styles.noticeText}>Figma design preview · Sample schedule</Text></View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.days}>
        {weekdays.map((d) => <TouchableOpacity key={d} accessibilityRole="button" accessibilityState={{ selected: day === d }} onPress={() => setDay(d)} style={[styles.day, day === d && styles.selected]}><Text style={[styles.dayText, day === d && styles.selectedText]}>{d}</Text></TouchableOpacity>)}
      </ScrollView>
      <View style={styles.panel}>
        <Text style={styles.heading}>{day}'s classes</Text>
        {sample.filter((item) => item.day === day).length ? sample.filter((item) => item.day === day).map((item, i) =>
          <View key={i} style={styles.classRow}><Text style={styles.time}>{item.time}</Text><View style={styles.classCard}><Text style={styles.course}>{item.course}</Text><Text style={styles.room}>{item.room}</Text></View></View>
        ) : <Text style={styles.empty}>No example classes for this day.</Text>}
      </View>
      <View style={styles.panel}><Text style={styles.heading}>Upcoming deadlines</Text><Text style={styles.empty}>Connect an authorized academic source in a future version to show your own assignments and exams.</Text></View>
      <TouchableOpacity accessibilityRole="link" style={styles.button} onPress={() => Linking.openURL('https://www.farmingdale.edu/registrar/')}><Text style={styles.buttonText}>Visit official Registrar</Text><Ionicons name="open-outline" color="#fff" size={18} /></TouchableOpacity>
    </FeatureScreen>
  );
}
const styles = StyleSheet.create({
  notice: { backgroundColor: '#E5F3E9', borderRadius: 10, padding: 12, flexDirection: 'row', gap: 9, alignItems: 'center', marginBottom: 14 },
  noticeText: { color: theme.greenStrong, fontWeight: '600', fontSize: 12, flex: 1 },
  days: { gap: 8, paddingBottom: 14 },
  day: { minWidth: 64, paddingVertical: 12, borderRadius: 9, backgroundColor: '#E9F0EA', alignItems: 'center' },
  selected: { backgroundColor: '#0A3E23' },
  dayText: { color: theme.greenStrong, fontWeight: '700' },
  selectedText: { color: '#fff' },
  panel: { backgroundColor: '#fff', borderColor: theme.border, borderWidth: 1, borderRadius: 13, padding: 14, marginBottom: 15 },
  heading: { color: theme.text, fontSize: 17, fontWeight: '800', marginBottom: 14 },
  classRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 9 },
  time: { width: 72, color: theme.greenStrong, fontSize: 11, fontWeight: '700' },
  classCard: { flex: 1, padding: 13, backgroundColor: '#E7F4EA', borderRadius: 10, borderLeftWidth: 3, borderLeftColor: '#299D59' },
  course: { fontSize: 14, fontWeight: '800', color: theme.text },
  room: { fontSize: 11, color: theme.muted, marginTop: 3 },
  empty: { fontSize: 13, color: theme.muted, lineHeight: 21 },
  button: { backgroundColor: theme.greenStrong, padding: 14, borderRadius: 11, flexDirection: 'row', justifyContent: 'center', gap: 10 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
