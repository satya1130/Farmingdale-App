import FeatureScreen from '../components/FeatureScreen';

export default function Dining() {
  return <FeatureScreen title="Dining & Food" subtitle="Explore campus dining" icon="restaurant-outline" items={[
    { title: 'Dining Locations', description: 'Find food options around campus. Verified locations and operating hours can be added later.', icon: 'location-outline' },
    { title: 'Menus', description: 'Menu availability and dietary information require a current verified source.', icon: 'fast-food-outline' },
    { title: 'Plan a Meal', description: 'Browse the dining section without leaving the app. All information here is placeholder content.', icon: 'cafe-outline' },
  ]} />;
}
