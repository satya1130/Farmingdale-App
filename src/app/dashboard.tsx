import FeatureScreen from '../components/FeatureScreen';

export default function Dashboard() {
  return <FeatureScreen title="Campus Overview" subtitle="Your central student dashboard" icon="grid-outline" items={[
    { title: 'Quick Access', description: 'Return to the home dashboard to open any of the eight campus features.', icon: 'apps-outline' },
    { title: 'Today on Campus', description: 'A future release could show verified events, classes, and notices in one place.', icon: 'sunny-outline' },
    { title: 'Prototype Status', description: 'The home screen and navigation are implemented. Live student data and campus feeds are not connected.', icon: 'construct-outline' },
  ]} />;
}
