import FeatureScreen from '../components/FeatureScreen';

export default function Events() {
  return <FeatureScreen title="Events & Clubs" subtitle="Find your campus community" icon="calendar-outline" items={[
    { title: 'Discover Clubs', description: 'Explore student organizations and find groups that match your interests.', icon: 'people-outline' },
    { title: 'Upcoming Events', description: 'Event cards and schedules will be connected to verified campus information in a future release.', icon: 'ticket-outline' },
    { title: 'Get Involved', description: 'Connect with campus life and student activities. This screen is demonstration content.', icon: 'heart-outline' },
  ]} />;
}
