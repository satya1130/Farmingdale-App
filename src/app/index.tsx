import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';

const links = [
  { title: 'Courses & Grades', icon: 'school-outline', path: '/schedule' },
  { title: 'Weekly Schedule', icon: 'calendar-outline', path: '/schedule' },
  { title: 'Upcoming Deadlines', icon: 'time-outline', path: '/announcements' },
  { title: 'Email', icon: 'mail-outline', path: '/resources' },
  { title: 'Club Events', icon: 'people-outline', path: '/events' },
  { title: 'Dining', icon: 'restaurant-outline', path: '/dining' },
  { title: 'Campus Map', icon: 'map-outline', path: '/map' },
  { title: 'Resources', icon: 'library-outline', path: '/resources' },
] as const;

const stats = [
  { label: 'Assignments due', value: '—', icon: 'document-text-outline' },
  { label: 'This week', value: '—', icon: 'calendar-outline' },
  { label: 'Unread emails', value: '—', icon: 'mail-outline' },
  { label: 'Active courses', value: '—', icon: 'book-outline' },
] as const;

function OpenLink({ title, path, icon }: { title: string; path: string; icon?: keyof typeof Ionicons.glyphMap }) {
  return (
    <TouchableOpacity style={styles.link} onPress={() => router.push(path as never)} accessibilityRole="button" accessibilityLabel={title}>
      {icon ? <Ionicons name={icon} size={17} color={theme.greenStrong} /> : null}
      <Text style={styles.linkText}>{title}</Text>
      <Ionicons name="chevron-forward" size={16} color={theme.muted} />
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.topBar}>
        <View style={styles.brandRow}>
          <View style={styles.logo}><Ionicons name="school" size={18} color="#fff" /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.brand}>Central Farmingdale</Text>
            <Text style={styles.brandSub}>Student-developed campus hub</Text>
          </View>
          <TouchableOpacity onPress={() => router.push('/profile')} accessibilityRole="button" accessibilityLabel="Student profile" style={styles.avatar}>
            <Ionicons name="person-outline" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>STUDENT DASHBOARD</Text>
          <Text style={styles.greeting}>Good morning!</Text>
          <Text style={styles.heroSub}>Everything you need for your day at Farmingdale.</Text>
        </View>
        <Text style={styles.demo}>Preview mode · Connect authorized campus services to display personal data.</Text>
        <View style={styles.stats}>
          {stats.map((item) => (
            <View key={item.label} style={styles.stat}>
              <Ionicons name={item.icon} color={theme.greenStrong} size={19} />
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
        <View style={styles.sectionHeading}><Text style={styles.sectionTitle}>Quick access</Text></View>
        <View style={styles.grid}>
          {links.map((item) => (
            <TouchableOpacity key={item.title} style={styles.tile} onPress={() => router.push(item.path as never)} accessibilityRole="button" accessibilityLabel={item.title}>
              <View style={styles.tileIcon}><Ionicons name={item.icon} size={24} color={theme.greenStrong} /></View>
              <Text style={styles.tileText}>{item.title}</Text>
              <Ionicons name="arrow-forward" size={16} color={theme.muted} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Upcoming assignments</Text>
          <Text style={styles.empty}>Your assignments will appear here once an authorized academic data source is connected.</Text>
          <OpenLink title="Academic dates and announcements" path="/announcements" icon="calendar-outline" />
        </View>
        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Today's classes</Text>
          <Text style={styles.empty}>No personal schedule connected yet.</Text>
          <OpenLink title="View schedule resources" path="/schedule" icon="book-outline" />
        </View>
        <View style={styles.panel}>
          <Text style={styles.sectionTitle}>Campus shortcuts</Text>
          <OpenLink title="Campus map" path="/map" icon="map-outline" />
          <OpenLink title="Dining options" path="/dining" icon="restaurant-outline" />
          <OpenLink title="Clubs and events" path="/events" icon="people-outline" />
          <OpenLink title="Student resources" path="/resources" icon="library-outline" />
        </View>
        <Text style={styles.footer}>Unofficial student project · Not affiliated with or endorsed by Farmingdale State College.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#F6F8F6' },
  topBar: { backgroundColor: '#08351F', paddingTop: 58, paddingBottom: 16, paddingHorizontal: 18 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  logo: { backgroundColor: '#1A9D55', padding: 9, borderRadius: 9 },
  brand: { color: '#FFFFFF', fontSize: 19, fontWeight: '800' },
  brandSub: { color: '#B6D8C2', fontSize: 11, marginTop: 2 },
  avatar: { backgroundColor: '#17613E', width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  body: { padding: 15, paddingBottom: 40 },
  hero: { backgroundColor: '#10532F', padding: 20, borderRadius: 13 },
  eyebrow: { color: '#9CE2B4', fontSize: 10, fontWeight: '800', letterSpacing: 1.2 },
  greeting: { color: '#FFFFFF', fontSize: 26, fontWeight: '800', marginTop: 7 },
  heroSub: { color: '#D2EADB', fontSize: 13, marginTop: 5 },
  demo: { color: theme.muted, fontSize: 11, lineHeight: 16, marginTop: 12, marginBottom: 13 },
  stats: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 9 },
  stat: { width: '48.5%', backgroundColor: '#FFFFFF', borderColor: theme.border, borderWidth: 1, borderRadius: 11, padding: 13, minHeight: 102 },
  statValue: { fontSize: 24, color: theme.greenStrong, fontWeight: '800', marginTop: 6 },
  statLabel: { color: theme.muted, fontSize: 11, marginTop: 2 },
  sectionHeading: { marginTop: 23, marginBottom: 11 },
  sectionTitle: { color: '#133D28', fontSize: 17, fontWeight: '800' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 10 },
  tile: { width: '48.5%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: theme.border, borderRadius: 12, minHeight: 121, padding: 13, justifyContent: 'space-between', alignItems: 'flex-start' },
  tileIcon: { backgroundColor: '#E4F4E9', padding: 9, borderRadius: 10 },
  tileText: { fontSize: 13, fontWeight: '700', color: theme.text, marginTop: 8 },
  panel: { backgroundColor: '#FFFFFF', borderColor: theme.border, borderWidth: 1, borderRadius: 12, marginTop: 16, padding: 15 },
  empty: { color: theme.muted, fontSize: 13, lineHeight: 20, marginTop: 11, marginBottom: 10 },
  link: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#EDF1ED' },
  linkText: { flex: 1, color: theme.greenStrong, fontSize: 13, fontWeight: '600' },
  footer: { fontSize: 11, color: theme.muted, textAlign: 'center', marginTop: 22, lineHeight: 17 },
});
