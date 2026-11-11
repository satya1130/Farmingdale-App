import FeatureScreen from '../components/FeatureScreen';

export default function Schedule() {
  return <FeatureScreen title="Class Schedule" subtitle="Stay organized all semester" icon="book-outline" items={[
    { title: 'My Classes', description: 'Your class schedule will appear here after an authorized student data connection is added.', icon: 'calendar-number-outline' },
    { title: 'Weekly Overview', description: 'A future version could show each class by day, time, and building.', icon: 'time-outline' },
    { title: 'Privacy First', description: 'This prototype does not collect school passwords or access student records.', icon: 'lock-closed-outline' },
  ]} />;
}
