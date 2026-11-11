import { Alert, Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FeatureScreen from '../components/FeatureScreen';
import { theme } from '../constants/theme';

export default function Resources() {
  const openWebsite = async () => {
    try {
      await Linking.openURL('https://www.farmingdale.edu/');
    } catch {
      Alert.alert('Unable to open website', 'Please visit farmingdale.edu in your browser.');
    }
  };

  return (
    <FeatureScreen title="Student Resources" subtitle="Helpful services in one place" icon="school-outline" items={[
      { title: 'Academic Support', description: 'Locate advising, tutoring, and other academic support services using verified college resources.', icon: 'library-outline' },
      { title: 'Campus Services', description: 'Explore financial aid, registrar, and student service information on the college website.', icon: 'help-circle-outline' },
    ]} note="The button opens the college website. This app is an independent student prototype.">
      <TouchableOpacity style={styles.button} onPress={openWebsite} accessibilityRole="button">
        <Text style={styles.buttonText}>Visit Farmingdale Website</Text>
      </TouchableOpacity>
    </FeatureScreen>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: theme.greenStrong, borderRadius: 14, padding: 17, alignItems: 'center', marginTop: 6 },
  buttonText: { color: theme.white, fontSize: 16, fontWeight: '700' },
});
