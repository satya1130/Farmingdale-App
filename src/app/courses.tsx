import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import FeatureScreen from '../components/FeatureScreen';
import { theme } from '../constants/theme';

const sections = [
  { icon: 'book-outline', title: 'My courses', body: 'Your enrolled courses will appear here when an authorized college integration is available.' },
  { icon: 'ribbon-outline', title: 'Grades', body: 'Grades are private academic records. Open the official student portal to view verified results.' },
  { icon: 'calendar-outline', title: 'Class schedule', body: 'Use the Weekly Schedule screen to explore the sample timetable.' },
] as const;

export default function Courses() {
  return <FeatureScreen title="Courses & Grades" subtitle="Your academic overview" icon="school-outline" note="Preview only. No real student account, grades, or enrollment information is connected.">
    <View style={styles.banner}><Ionicons name="shield-checkmark-outline" color={theme.greenStrong} size={22} /><Text style={styles.bannerText}>Student information stays private. This prototype does not request your campus password.</Text></View>
    {sections.map(section => <View style={styles.card} key={section.title}>
      <View style={styles.heading}><Ionicons name={section.icon} color={theme.greenStrong} size={22} /><Text style={styles.title}>{section.title}</Text></View>
      <Text style={styles.body}>{section.body}</Text>
    </View>)}
  </FeatureScreen>;
}
const styles = StyleSheet.create({
  banner: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#E5F3E9', padding: 15, borderRadius: 12, marginBottom: 16 },
  bannerText: { flex: 1, color: theme.greenStrong, fontSize: 12, lineHeight: 19 },
  card: { backgroundColor: '#fff', borderRadius: 13, borderWidth: 1, borderColor: theme.border, padding: 18, marginBottom: 13 },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  title: { fontWeight: '800', fontSize: 17, color: theme.text },
  body: { color: theme.muted, fontSize: 13, lineHeight: 21, marginTop: 12 },
});
