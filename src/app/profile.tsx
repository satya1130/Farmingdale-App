import OfficialScreen from '../components/OfficialScreen';
export default function Profile() { return <OfficialScreen title="Student Profile" subtitle="Private account access" icon="person-circle-outline" entries={[
{title:'Guest Mode',description:'You are using a student-created prototype. No college account is connected, and no student data is stored.',icon:'person-outline'},
{title:'Official myFSC',description:'For personalized college information, use the official myFSC sign-in through Farmingdale’s website.',url:'https://www.farmingdale.edu/new-website/index.shtml',linkLabel:'Find official myFSC access',icon:'log-in-outline'},
{title:'Privacy & Security',description:'This app does not collect passwords, student ID numbers, grades or private schedules. Any future account integration needs explicit authorization and secure sign-in.',icon:'shield-checkmark-outline'}
]} />; }