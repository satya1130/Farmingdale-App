import FeatureScreen from '../components/FeatureScreen';

export default function Profile() {
  return <FeatureScreen title="Student Profile" subtitle="Your personal campus hub" icon="person-circle-outline" items={[
    { title: 'Guest Mode', description: 'You are exploring the Central Farmingdale demo. No sign-in is required.', icon: 'person-outline' },
    { title: 'Account Features', description: 'Profile data, saved preferences, and school account integrations are not enabled yet.', icon: 'settings-outline' },
    { title: 'Your Privacy', description: 'The demo does not request student identification numbers or passwords.', icon: 'shield-checkmark-outline' },
  ]} />;
}
