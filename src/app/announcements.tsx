import FeatureScreen from '../components/FeatureScreen';

export default function Announcements() {
  return <FeatureScreen title="Announcements" subtitle="Stay connected with campus updates" icon="megaphone-outline" items={[
    { title: 'Campus Updates', description: 'Official notices can appear here when an approved feed is configured.', icon: 'notifications-outline' },
    { title: 'Important Dates', description: 'Academic deadlines must be verified against the current college calendar.', icon: 'calendar-outline' },
    { title: 'Notifications', description: 'Push notifications are not enabled in this prototype.', icon: 'phone-portrait-outline' },
  ]} />;
}
