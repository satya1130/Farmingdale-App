import { Ionicons } from '@expo/vector-icons';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FeatureScreen from './FeatureScreen';
import { theme } from '../constants/theme';

export type CampusEntry = { title: string; description: string; url?: string; linkLabel?: string; icon?: keyof typeof Ionicons.glyphMap };
type Props = { title: string; subtitle: string; icon: keyof typeof Ionicons.glyphMap; entries: CampusEntry[]; note?: string };

export async function openOfficialLink(url: string) {
  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) throw new Error('Unsupported URL');
    await Linking.openURL(url);
  } catch {
    Alert.alert('Could not open website', 'Please check your connection and try again.');
  }
}

export default function OfficialScreen({ title, subtitle, icon, entries, note }: Props) {
  return (
    <FeatureScreen title={title} subtitle={subtitle} icon={icon}
      note={note ?? 'Independent student-developed app. Information is a general guide sourced from official FSC pages; check the linked source for updates.'}>
      {entries.map((entry) => (
        <View key={entry.title} style={styles.card}>
          <View style={styles.heading}>
            <Ionicons name={entry.icon ?? 'information-circle-outline'} size={22} color={theme.greenStrong} />
            <Text style={styles.title}>{entry.title}</Text>
          </View>
          <Text style={styles.description}>{entry.description}</Text>
          {entry.url ? (
            <TouchableOpacity accessibilityRole="link" accessibilityLabel={entry.linkLabel ?? 'View official source'}
              onPress={() => openOfficialLink(entry.url!)} style={styles.link}>
              <Text style={styles.linkText}>{entry.linkLabel ?? 'View official source'}</Text>
              <Ionicons name="open-outline" size={17} color={theme.white} />
            </TouchableOpacity>
          ) : null}
        </View>
      ))}
    </FeatureScreen>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: theme.white, borderColor: theme.border, borderWidth: 1, borderRadius: 16, padding: 19, marginBottom: 13 },
  heading: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 9 },
  title: { color: theme.text, fontSize: 17, fontWeight: '700', flexShrink: 1 },
  description: { color: theme.muted, fontSize: 14, lineHeight: 22 },
  link: { backgroundColor: theme.greenStrong, borderRadius: 11, padding: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 15 },
  linkText: { color: theme.white, fontWeight: '700', fontSize: 14 }
});