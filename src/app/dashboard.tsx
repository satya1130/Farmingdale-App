import OfficialScreen from '../components/OfficialScreen';
export default function Dashboard() { return <OfficialScreen title="Campus Overview" subtitle="Your student starting point" icon="grid-outline" entries={[
{title:'Explore Campus',description:'Open the Campus Map from the home screen to find your way around Farmingdale.',url:'https://map.farmingdale.edu/',linkLabel:'Official campus map',icon:'map-outline'},
{title:'What’s Happening',description:'Find upcoming student activities and campus events.',url:'https://www.farmingdale.edu/student-activities/',linkLabel:'See events and clubs',icon:'calendar-outline'},
{title:'Academic Dates',description:'Keep track of semester milestones with the official academic calendar.',url:'https://www.farmingdale.edu/calendar/academic/',linkLabel:'Check important dates',icon:'book-outline'},
{title:'Dining Options',description:'Find dining locations and information about campus food services.',url:'https://www.farmingdale.edu/auxiliary-service-corporation/campus-dining.shtml',linkLabel:'Explore dining',icon:'restaurant-outline'}
]} />; }