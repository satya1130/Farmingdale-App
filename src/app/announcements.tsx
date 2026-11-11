import OfficialScreen from '../components/OfficialScreen';
export default function Announcements() { return <OfficialScreen title="Announcements" subtitle="Official campus updates" icon="megaphone-outline" entries={[
{title:'FSC News & Notices',description:'Find the latest public college news and announcements from the official website.',url:'https://www.farmingdale.edu/',linkLabel:'Read college updates',icon:'newspaper-outline'},
{title:'Campus Calendar',description:'Browse public events and campus dates. The college combines multiple calendars in its official experience.',url:'https://www.farmingdale.edu/new-website/index.shtml',linkLabel:'About the campus calendar',icon:'calendar-outline'},
{title:'Academic Dates',description:'Confirm registration periods, semester dates and deadlines directly with the college.',url:'https://www.farmingdale.edu/calendar/academic/',linkLabel:'See official academic dates',icon:'time-outline'},
{title:'Personal Notifications',description:'This prototype does not receive private myFSC notices or send push notifications. Use your official college account for personalized updates.',icon:'notifications-off-outline'}
]} />; }