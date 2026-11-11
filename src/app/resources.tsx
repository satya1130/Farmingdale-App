import OfficialScreen from '../components/OfficialScreen';
export default function Resources() { return <OfficialScreen title="Student Resources" subtitle="Support for every student" icon="school-outline" entries={[
{title:'Tutoring & Academic Success',description:'FSC provides academic support, tutoring and learning assistance to students.',url:'https://www.farmingdale.edu/first-year/index.shtml',linkLabel:'Explore academic support',icon:'library-outline'},
{title:'Registrar',description:'Get assistance with course registration, records and transcripts.',url:'https://www.farmingdale.edu/registrar/',linkLabel:'Registrar services',icon:'document-text-outline'},
{title:'Student Activities',description:'Connect with student organizations and events through the Office of Student Activities.',url:'https://www.farmingdale.edu/student-activities/',linkLabel:'Explore activities',icon:'people-outline'},
{title:'Career Development',description:'Find information about internships, jobs and career guidance through FSC student resources.',url:'https://www.farmingdale.edu/first-year/index.shtml',linkLabel:'Find career resources',icon:'briefcase-outline'},
{title:'Campus Directory',description:'Look up official college offices and contact information.',url:'https://www.farmingdale.edu/directory/',linkLabel:'Open campus directory',icon:'call-outline'}
]} />; }