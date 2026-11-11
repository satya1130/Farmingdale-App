import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';

const CAMPUS_MAP = 'https://map.farmingdale.edu/';

export default function CampusMap() {
  const openCampusMap = async () => {
    try {
      await Linking.openURL(CAMPUS_MAP);
    } catch {
      Alert.alert('Unable to open map', 'Please try again or visit map.farmingdale.edu in your browser.');
    }
  };

  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/')}
          accessibilityLabel="Back to dashboard"
          accessibilityRole="button"
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={27} color={theme.white} />
        </TouchableOpacity>
        <Text style={styles.title}>Campus Map</Text>
        <Text style={styles.subtitle}>Explore Farmingdale State College</Text>
      </View>
      <View style={styles.content}>
        <Ionicons name="map-outline" size={84} color={theme.greenStrong} />
        <Text style={styles.heading}>Explore Our Campus</Text>
        <Text style={styles.description}>Find buildings, classrooms, parking areas, and other locations using Farmingdale's interactive map.</Text>
        <TouchableOpacity
          onPress={openCampusMap}
          accessibilityRole="button"
          style={styles.button}
        >
          <Ionicons name="navigate-outline" size={22} color={theme.white} />
          <Text style={styles.buttonText}>Open Campus Map</Text>
        </TouchableOpacity>
        <Text style={styles.note}>Opens Farmingdale's campus map in your browser.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.background },
  header: { backgroundColor: theme.green, paddingHorizontal: 24, paddingTop: 58, paddingBottom: 29 },
  back: { alignSelf: 'flex-start', paddingVertical: 4, paddingRight: 15 },
  title: { color: theme.white, fontSize: 29, fontWeight: '800', marginTop: 18 },
  subtitle: { color: '#DBEADD', fontSize: 15, marginTop: 7 },
  content: { flex: 1, padding: 28, alignItems: 'center', justifyContent: 'center' },
  heading: { color: theme.text, fontWeight: '800', fontSize: 24, marginTop: 24, textAlign: 'center' },
  description: { color: theme.muted, fontSize: 15, lineHeight: 24, textAlign: 'center', marginTop: 15, marginBottom: 29 },
  button: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 19, paddingHorizontal: 27, borderRadius: 16, backgroundColor: theme.greenStrong },
  buttonText: { color: theme.white, fontSize: 17, fontWeight: '750' },
  note: { color: theme.muted, fontSize: 13, textAlign: 'center', marginTop: 22 },
});
