import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';

const features = [
  { title: 'Campus Map', subtitle: 'Find your way around', icon: 'map-outline', path: '/map' },
  { title: 'Events & Clubs', subtitle: 'Get involved on campus', icon: 'calendar-outline', path: '/events' },
  { title: 'Class Schedule', subtitle: 'Plan your semester', icon: 'book-outline', path: '/schedule' },
  { title: 'Dining & Food', subtitle: 'Explore food options', icon: 'restaurant-outline', path: '/dining' },
  { title: 'Announcements', subtitle: 'Stay up to date', icon: 'megaphone-outline', path: '/announcements' },
  { title: 'Student Resources', subtitle: 'Find helpful services', icon: 'school-outline', path: '/resources' },
  { title: 'Student Profile', subtitle: 'Your student space', icon: 'person-circle-outline', path: '/profile' },
  { title: 'Dashboard', subtitle: 'Your campus overview', icon: 'grid-outline', path: '/dashboard' },
] as const;

export default function HomeScreen() {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="school-outline" size={28} color={theme.white} />
        </View>
        <Text style={styles.brand}>Central Farmingdale</Text>
        <Text style={styles.subtitle}>Your campus, all in one place.</Text>
      </View>
      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.welcome}>Welcome!</Text>
        <Text style={styles.intro}>Everything you need to explore campus, stay connected, and organize your day.</Text>
        <View style={styles.grid}>
          {features.map((feature) => (
            <TouchableOpacity
              key={feature.path}
              activeOpacity={0.78}
              style={styles.card}
              onPress={() => router.push(feature.path)}
              accessibilityRole="button"
              accessibilityLabel={feature.title}
            >
              <View style={styles.iconCircle}>
                <Ionicons name={feature.icon} size={29} color={theme.greenStrong} />
              </View>
              <Text style={styles.cardTitle}>{feature.title}</Text>
              <Text style={styles.cardSubtitle}>{feature.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.disclaimer}>Student-developed prototype. Not an official Farmingdale State College application.</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.background },
  header: { backgroundColor: theme.green, paddingHorizontal: 24, paddingTop: 62, paddingBottom: 28 },
  headerIcon: { marginBottom: 12 },
  brand: { color: theme.white, fontSize: 31, fontWeight: '800' },
  subtitle: { color: '#DBEADD', fontSize: 15, marginTop: 6 },
  main: { paddingHorizontal: 18, paddingTop: 24, paddingBottom: 40 },
  welcome: { color: theme.text, fontSize: 26, fontWeight: '800' },
  intro: { color: theme.muted, fontSize: 15, lineHeight: 23, marginTop: 8, marginBottom: 21 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  card: { width: '48%', minHeight: 170, borderWidth: 1, borderColor: theme.border, backgroundColor: theme.white, borderRadius: 18, padding: 16 },
  iconCircle: { alignSelf: 'flex-start', backgroundColor: theme.greenSoft, padding: 10, borderRadius: 14, marginBottom: 14 },
  cardTitle: { fontSize: 16, fontWeight: '750', color: theme.text, marginBottom: 7 },
  cardSubtitle: { fontSize: 13, color: theme.muted, lineHeight: 19 },
  disclaimer: { marginTop: 25, color: theme.muted, fontSize: 12, textAlign: 'center', lineHeight: 19 },
});
