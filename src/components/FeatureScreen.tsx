import { ReactNode } from 'react';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { theme } from '../constants/theme';

export type FeatureItem = { title: string; description: string; icon?: keyof typeof Ionicons.glyphMap };

type FeatureScreenProps = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  items?: FeatureItem[];
  children?: ReactNode;
  note?: string;
};

export default function FeatureScreen({ title, subtitle, icon, items = [], children, note }: FeatureScreenProps) {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/')}
          accessibilityRole="button"
          accessibilityLabel="Return to dashboard"
          style={styles.back}
        >
          <Ionicons name="arrow-back" size={27} color={theme.white} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.iconWrap}>
          <Ionicons name={icon} size={58} color={theme.greenStrong} />
        </View>
        {items.map((item) => (
          <View style={styles.card} key={item.title}>
            <View style={styles.itemHeading}>
              {item.icon && <Ionicons name={item.icon} size={22} color={theme.greenStrong} />}
              <Text style={styles.itemTitle}>{item.title}</Text>
            </View>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
        {children}
        <Text style={styles.note}>{note ?? 'Student-developed prototype. Information shown here is sample content unless noted.'}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: theme.background },
  header: { backgroundColor: theme.green, paddingHorizontal: 24, paddingTop: 58, paddingBottom: 28 },
  back: { alignSelf: 'flex-start', paddingVertical: 4, paddingRight: 16 },
  title: { color: theme.white, fontSize: 29, fontWeight: '800', marginTop: 18 },
  subtitle: { color: '#DBEADD', fontSize: 15, marginTop: 7 },
  body: { padding: 22, paddingBottom: 45, alignItems: 'stretch' },
  iconWrap: { alignSelf: 'center', marginVertical: 20, backgroundColor: theme.greenSoft, borderRadius: 28, padding: 22 },
  card: { backgroundColor: theme.white, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: theme.border, marginBottom: 14 },
  itemHeading: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  itemTitle: { color: theme.text, fontSize: 18, fontWeight: '700', flexShrink: 1 },
  description: { color: theme.muted, fontSize: 15, lineHeight: 23 },
  note: { fontSize: 12, color: theme.muted, lineHeight: 18, textAlign: 'center', marginTop: 20 },
});
