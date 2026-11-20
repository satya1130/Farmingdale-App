import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { useStudentPlanner } from '../hooks/useStudentPlanner';
import { DatePickerField, TimePickerField } from './PlannerPickers';
import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type Page = 'index' | 'courses' | 'schedule' | 'deadlines' | 'email' | 'events' | 'dining' | 'map' | 'resources';
type Icon = keyof typeof Ionicons.glyphMap;
const green = '#17351F', accent = '#4A9656', mint = '#EAF5ED', muted = '#7C8FB1', border = '#D5EAD8';
const menu: { key: Page; label: string; icon: Icon }[] = [
  { key: 'index', label: 'Dashboard', icon: 'grid-outline' },
  { key: 'courses', label: 'Courses & Grades', icon: 'book-outline' },
  { key: 'schedule', label: 'Schedule', icon: 'calendar-outline' },
  { key: 'deadlines', label: 'Upcoming Deadlines', icon: 'time-outline' },
  { key: 'email', label: 'Email', icon: 'mail-outline' },
  { key: 'events', label: 'Club Events', icon: 'people-outline' },
  { key: 'dining', label: 'Dining', icon: 'restaurant-outline' },
  { key: 'map', label: 'Campus Map', icon: 'map-outline' },
  { key: 'resources', label: 'Resources', icon: 'library-outline' },
];
const courses = [
  { code:'CSC 220', name:'Data Structures', professor:'Prof. Rodriguez', credits:3, grade:'A-', percent:91, due:3, new:2 },
  { code:'ENG 101', name:'English Composition II', professor:'Prof. Chen', credits:3, grade:'B+', percent:87, due:1, new:0 },
  { code:'MAT 151', name:'Calculus I', professor:'Prof. Williams', credits:4, grade:'B', percent:83, due:2, new:1 },
  { code:'BIO 110', name:'General Biology', professor:'Prof. Patel', credits:4, grade:'A', percent:94, due:1, new:0 },
  { code:'SOC 101', name:'Introduction to Sociology', professor:'Prof. Lee', credits:3, grade:'A-', percent:90, due:0, new:0 },
];
const assignments = [
  { name:'Linked List Implementation', course:'CSC 220', kind:'Programming', due:'Today, 11:59 PM', urgent:true },
  { name:'Rhetorical Analysis Essay', course:'ENG 101', kind:'Essay', due:'Tomorrow, 11:59 PM', urgent:true },
  { name:'Problem Set 7 — Integration', course:'MAT 151', kind:'Problem Set', due:'Wed, Oct 1', urgent:false },
  { name:'Lab Report: Cell Division', course:'BIO 110', kind:'Lab Report', due:'Thu, Oct 2', urgent:false },
];
const classes = [
  { day:'Mon', time:'8:00 AM', end:'9:15 AM', code:'CSC 220', room:'Lupton Hall 212' },
  { day:'Mon', time:'10:00 AM', end:'10:50 AM', code:'MAT 151', room:'Whitman Hall 108' },
  { day:'Mon', time:'12:00 PM', end:'1:00 PM', code:'Lunch Break', room:'' },
  { day:'Mon', time:'1:00 PM', end:'3:45 PM', code:'BIO 110', room:'Gleeson Hall 104', lab:true },
  { day:'Mon', time:'4:00 PM', end:'5:15 PM', code:'ENG 101', room:'Whitman Hall 214' },
  { day:'Tue', time:'9:25 AM', end:'10:40 AM', code:'SOC 101', room:'Whitman Hall 108' },
  { day:'Wed', time:'8:00 AM', end:'9:15 AM', code:'CSC 220', room:'Lupton Hall 212' },
  { day:'Thu', time:'9:25 AM', end:'10:40 AM', code:'SOC 101', room:'Whitman Hall 108' },
  { day:'Fri', time:'10:00 AM', end:'10:50 AM', code:'MAT 151', room:'Whitman Hall 108' },
];
const emails = [
  { from:'Prof. Rodriguez', subject:'Midterm Review Session — Thursday 4PM', time:'10:32 AM', tag:'CSC 220', unread:true },
  { from:'Registrar Office', subject:'Spring 2027 Registration Opens October 28', time:'9:15 AM', tag:'Academic', unread:true },
  { from:'Student Activities', subject:'Fall Fest This Friday — Prizes & Free Food!', time:'Yesterday', tag:'Events', unread:false },
  { from:'Financial Aid', subject:'Your FAFSA Has Been Processed', time:'Yesterday', tag:'Financial', unread:false },
  { from:'Prof. Chen', subject:'Essay Draft Feedback Available in Brightspace', time:'Mon', tag:'ENG 101', unread:false },
];
const events = [
  { title:'Computer Club: Hack Night', group:'Computer Club', place:'Lupton Hall 212', date:'Tue, Sep 24', time:'6 PM – 8 PM', category:'Technology' },
  { title:'Business Society Alumni Mixer', group:'Business Society', place:'Campus Center Ballroom', date:'Thu, Sep 26', time:'5 PM – 7 PM', category:'Professional' },
  { title:'Cultural Club Meet & Greet', group:'Student Organizations', place:'Campus Center', date:'Fri, Sep 27', time:'3 PM – 5 PM', category:'Cultural' },
  { title:'Campus Arts Showcase', group:'Arts Club', place:'Campus Center', date:'Mon, Sep 30', time:'4 PM – 6 PM', category:'Arts' },
];
const resourceGroups = [
  { heading:'Academic Support', entries:[
    ['Tutoring Center','Academic tutoring and learning support','https://www.farmingdale.edu/first-year/index.shtml'],
    ['Writing Center','Writing and research support','https://www.farmingdale.edu/'],
    ['Academic Advising','Registration and academic planning','https://www.farmingdale.edu/'],
    ['Library & Research Help','Library services and research tools','https://www.farmingdale.edu/'],
  ] },
  { heading:'Student Services', entries:[
    ['Financial Aid Office','Financial aid information and assistance','https://www.farmingdale.edu/'],
    ['Registrar','Records, registration, and transcripts','https://www.farmingdale.edu/registrar/'],
    ['Student Activities','Clubs and student involvement','https://www.farmingdale.edu/student-activities/'],
    ['IT Help Desk','Technology support','https://www.farmingdale.edu/'],
  ] },
];
function go(key: Page) { router.push((key === 'index' ? '/' : '/' + key) as never); }
function Card({children,style}:{children:ReactNode;style?:object}) { return <View style={[s.card,style]}>{children}</View>; }
function Heading({children,caption}:{children:ReactNode;caption?:string}) { return <View style={{marginBottom:20}}>{caption ? <Text style={s.eyebrow}>{caption}</Text>:null}<Text style={s.pageTitle}>{children}</Text></View>; }
function Pill({label,active,onPress}:{label:string;active?:boolean;onPress:()=>void}) { return <TouchableOpacity accessibilityRole="button" accessibilityState={{selected:!!active}} onPress={onPress} style={[s.pill,active&&s.pillActive]}><Text style={[s.pillText,active&&{color:'#fff'}]}>{label}</Text></TouchableOpacity>; }
function SectionTitle({children,right,onPress}:{children:string;right?:string;onPress?:()=>void}) { return <View style={s.sectionHeader}><Text style={s.sectionTitle}>{children}</Text>{right?<TouchableOpacity onPress={onPress}><Text style={{color:accent,fontWeight:'700'}}>{right}</Text></TouchableOpacity>:null}</View>; }
function SampleNote() { return <Text style={s.note}>DESIGN PREVIEW · Sample information only. No student records, email, live events, or dining feeds are connected.</Text>; }
export default function PortalScreen({page}:{page:Page}) {
  const [drawer,setDrawer]=useState(false);
  const [day,setDay]=useState(['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()]);
  const [filter,setFilter]=useState('All');
  const [search,setSearch]=useState('');
  const [taskTitle,setTaskTitle]=useState('');
  const [taskCourse,setTaskCourse]=useState('');
  const [taskDue,setTaskDue]=useState('');
  const [classCode,setClassCode]=useState('');
  const [classTime,setClassTime]=useState('');
  const [classRoom,setClassRoom]=useState('');
  const [newCourseCode,setNewCourseCode]=useState('');
  const [newCourseName,setNewCourseName]=useState('');
  const [newCourseProfessor,setNewCourseProfessor]=useState('');
  const [newCourseGrade,setNewCourseGrade]=useState('');
  const [courseError,setCourseError]=useState('');
  const [eventView,setEventView]=useState('Upcoming');
  const {tasks,setTasks,classes:myClasses,setClasses,savedEvents,setSavedEvents,courses:myCourses,setCourses,ready}=useStudentPlanner();
  const [read,setRead]=useState<string[]>([]);
  const [selectedBuilding,setSelectedBuilding]=useState<string | null>(null);
  const [expandedResource,setExpandedResource]=useState<string | null>(null);
  const today = new Date();
  const weekday = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][today.getDay()];
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const dateKey=(date:Date)=>[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');
  const todayKey=dateKey(today);
  const thisWeekKey=dateKey(new Date(today.getFullYear(),today.getMonth(),today.getDate()+7));
  const pending=tasks.filter(t=>!t.done);
  const dueToday=pending.filter(t=>t.dueDate===todayKey);
  const dueWeek=pending.filter(t=>t.dueDate>=todayKey&&t.dueDate<=thisWeekKey);
  const todayClasses=myClasses.filter(c=>c.day===weekday).sort((a,b)=>a.time.localeCompare(b.time));
  const addTask=()=>{
    const title=taskTitle.trim(),dueDate=taskDue.trim(),course=taskCourse.trim();
    if(!title||!/^\\d{4}-\\d{2}-\\d{2}$/.test(dueDate))return;
    const parsed=new Date(dueDate+'T12:00:00');
    if(Number.isNaN(parsed.getTime())||dateKey(parsed)!==dueDate)return;
    setTasks(p=>[...p,{id:String(Date.now())+'-'+Math.random().toString(36).slice(2),title,course,dueDate,done:false}]);
    setTaskTitle('');setTaskDue('');setTaskCourse('');
  };
  const addCourse=()=>{
    const code=newCourseCode.trim().toUpperCase(),name=newCourseName.trim(),grade=newCourseGrade.trim().toUpperCase();
    if(!code||!name){setCourseError('Enter a course code and name.');return;}
    if(grade&&!/^(A[+-]?|B[+-]?|C[+-]?|D[+-]?|F|P|S|U|W|I)$/.test(grade)){setCourseError('Use a letter grade like A, B+, C-, or leave it blank.');return;}
    setCourses(p=>[...p,{id:String(Date.now())+'-'+Math.random().toString(36).slice(2),code,name,professor:newCourseProfessor.trim(),credits:3,grade}]);
    setNewCourseCode('');setNewCourseName('');setNewCourseProfessor('');setNewCourseGrade('');setCourseError('');
  };
  const addClass=()=>{
    const code=classCode.trim(),time=classTime.trim(),room=classRoom.trim();
    if(!code||!time)return;
    setClasses(p=>[...p,{id:String(Date.now())+'-'+Math.random().toString(36).slice(2),code,day,time,room}]);
    setClassCode('');setClassTime('');setClassRoom('');
  };
  const nav=(key:Page)=>{setDrawer(false);go(key);};
  return <View style={s.root}>
    <View style={s.header}>
      <TouchableOpacity accessibilityRole="button" accessibilityLabel="Open navigation menu" onPress={()=>setDrawer(true)}><Ionicons name="menu" size={28} color="#fff"/></TouchableOpacity>
      <View style={s.logo}><Text style={{color:green,fontWeight:'800'}}>F</Text></View>
      <Text style={s.headerBrand}>FSC</Text>
      <TouchableOpacity accessibilityLabel="Notifications information" onPress={()=>router.push('/announcements')} style={{marginRight:13}}><Ionicons name="notifications-outline" size={23} color="#9AD9A4"/><View style={s.redDot}/></TouchableOpacity>
      <TouchableOpacity accessibilityLabel="Profile" onPress={()=>router.push('/profile')} style={s.avatar}><Text style={{color:'#fff',fontWeight:'700'}}>SM</Text></TouchableOpacity>
    </View>
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={s.body}>
      {page==='index' && <>
        <View style={s.hero}><Text style={{color:'#A6E6B5',fontSize:12,fontWeight:'700',letterSpacing:1}}>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}</Text><Text style={s.heroTitle}>{greeting}, Satya</Text><Text style={s.heroSub}>Your assignments, classes, and campus life in one place.</Text></View>
        <View style={s.statGrid}>{[['DUE TODAY',String(dueToday.length),'your tasks'],['NEXT 7 DAYS',String(dueWeek.length),'upcoming tasks'],['CLASSES TODAY',String(todayClasses.length),'your schedule'],['SAVED EVENTS',String(savedEvents.length),'sample events']].map(([label,value,desc],i)=><Card key={label} style={s.stat}><Text style={s.statLabel}>{label}</Text><Text style={[s.statNumber,{color:i===0?'#E4514F':'#56BD68'}]}>{value}</Text><Text style={s.sub}>{desc}</Text></Card>)}</View>
        <Card><SectionTitle right="View all" onPress={()=>nav('deadlines')}>My Upcoming Assignments</SectionTitle>{!ready?<Text style={s.sub}>Loading saved assignments...</Text>:pending.length===0?<Text style={s.sub}>No assignments yet. Add one in Assignment Planner.</Text>:pending.slice().sort((a,b)=>a.dueDate.localeCompare(b.dueDate)).slice(0,4).map(a=><View key={a.id} style={s.listRow}><View style={[s.bullet,{backgroundColor:a.dueDate<=todayKey?'#E4514F':accent}]}/><View style={{flex:1}}><Text style={s.rowTitle}>{a.title}</Text><Text style={s.sub}>{a.course||'Personal'} · {a.dueDate}</Text></View></View>)}</Card>
              <Card><SectionTitle right="Edit" onPress={()=>nav('schedule')}>Today's Classes</SectionTitle>{!ready?<Text style={s.sub}>Loading saved schedule...</Text>:todayClasses.length===0?<Text style={s.sub}>No classes entered for today.</Text>:todayClasses.map(c=><View key={c.id} style={s.classMini}><Text style={s.time}>{c.time}</Text><View style={{flex:1,borderLeftWidth:2,borderColor:border,paddingLeft:13}}><Text style={s.rowTitle}>{c.code}</Text><Text style={s.sub}>{c.room||'Room not set'}</Text></View></View>)}</Card>
              <Card><SectionTitle right="Inbox" onPress={()=>nav('email')}>Example Emails</SectionTitle>{emails.slice(0,3).map(e=><View key={e.from} style={s.listRow}><View style={[s.bullet,{backgroundColor:accent}]}/><View style={{flex:1}}><Text style={s.rowTitle}>{e.from}</Text><Text style={s.sub}>{e.subject}</Text></View></View>)}</Card>
        <Card><SectionTitle>Explore the App</SectionTitle><View style={s.quickGrid}>{([{name:'My Courses',page:'courses'},{name:'My Schedule',page:'schedule'},{name:'Assignment Planner',page:'deadlines'},{name:'Campus Resources',page:'resources'},{name:'Campus Dining',page:'dining'},{name:'Campus Map',page:'map'}] as {name:string;page:Page}[]).map(item=><TouchableOpacity key={item.name} style={{width:'48%',paddingVertical:12}} onPress={()=>nav(item.page)} accessibilityRole="button"><Text style={{color:accent,fontWeight:'600'}}>{item.name}  ›</Text></TouchableOpacity>)}</View></Card>
      </>}
      {page==='courses'&&<><Heading>My Courses & Grades</Heading><Text style={s.intro}>Add your own courses and optional letter grades. This information is private to this device, not connected to the school.</Text><Card><SectionTitle>Add Course</SectionTitle><TextInput style={s.input} placeholder="Course code (CSC 325)" value={newCourseCode} onChangeText={setNewCourseCode}/><TextInput style={s.input} placeholder="Course name" value={newCourseName} onChangeText={setNewCourseName}/><TextInput style={s.input} placeholder="Professor (optional)" value={newCourseProfessor} onChangeText={setNewCourseProfessor}/><TextInput style={s.input} placeholder="Grade (optional, e.g. A-)" autoCapitalize="characters" value={newCourseGrade} onChangeText={setNewCourseGrade}/>{courseError?<Text style={{color:'#B33838',marginBottom:8}}>{courseError}</Text>:null}<TouchableOpacity style={s.action} onPress={addCourse}><Text style={s.actionText}>+ Save Course</Text></TouchableOpacity></Card>{!ready?<Text style={s.sub}>Loading your courses...</Text>:myCourses.length===0?<Card><Text style={s.sub}>No courses added yet. Start with a course above.</Text></Card>:myCourses.map(c=><Card key={c.id}><View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}><View style={{flex:1}}><Text style={s.courseTag}>{c.code}</Text><Text style={[s.courseName,{marginTop:10}]}>{c.name}</Text><Text style={s.sub}>{c.professor||'Professor not entered'}</Text></View><View style={{alignItems:'center',gap:10}}><Text style={s.grade}>{c.grade||'—'}</Text><TouchableOpacity accessibilityRole="button" accessibilityLabel={'Remove '+c.code} onPress={()=>setCourses(p=>p.filter(x=>x.id!==c.id))}><Ionicons name="trash-outline" size={21} color="#C34C4C"/></TouchableOpacity></View></View></Card>)}</>}
      {page==='schedule'&&<><Heading>My Class Schedule</Heading><Text style={s.intro}>Add your own classes. They stay on this phone after you close the app.</Text><Card><SectionTitle>Add a Class</SectionTitle><View style={s.weekRow}>{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=><TouchableOpacity key={d} style={[s.weekDay,day===d&&{backgroundColor:green}]} onPress={()=>setDay(d)}><Text style={[s.weekText,day===d&&{color:'#fff'}]}>{d}</Text></TouchableOpacity>)}</View><TextInput style={s.input} placeholder="Course code (e.g. CSC 325)" value={classCode} onChangeText={setClassCode}/><TimePickerField value={classTime} onChange={setClassTime}/><TextInput style={s.input} placeholder="Building and room (optional)" value={classRoom} onChangeText={setClassRoom}/><TouchableOpacity style={s.action} onPress={addClass}><Text style={s.actionText}>+ Add {day} Class</Text></TouchableOpacity></Card><Card><SectionTitle>{`${day} Classes`}</SectionTitle>{!ready?<Text style={s.sub}>Loading...</Text>:myClasses.filter(c=>c.day===day).length===0?<Text style={s.sub}>Nothing scheduled for this day.</Text>:myClasses.filter(c=>c.day===day).map(c=><View key={c.id} style={s.listRow}><View style={{flex:1}}><Text style={s.rowTitle}>{c.code}</Text><Text style={s.sub}>{c.time} · {c.room||'No room entered'}</Text></View><TouchableOpacity accessibilityRole="button" accessibilityLabel={'Remove '+c.code} onPress={()=>setClasses(p=>p.filter(x=>x.id!==c.id))}><Ionicons name="trash-outline" size={21} color="#C34C4C"/></TouchableOpacity></View>)}</Card></>}
            {page==='deadlines'&&<><Heading caption="ACADEMIC PLANNER">My Assignment Planner</Heading><Text style={s.intro}>Add assignments and deadlines, mark tasks done, and keep your progress saved on this device.</Text><View style={s.statGrid}><Card style={s.stat}><Text style={s.statLabel}>DUE TODAY</Text><Text style={s.statNumber}>{dueToday.length}</Text><Text style={s.sub}>not completed</Text></Card><Card style={s.stat}><Text style={s.statLabel}>NEXT 7 DAYS</Text><Text style={s.statNumber}>{dueWeek.length}</Text><Text style={s.sub}>not completed</Text></Card></View><Card><SectionTitle>Add Assignment</SectionTitle><TextInput style={s.input} placeholder="Assignment title" value={taskTitle} onChangeText={setTaskTitle}/><TextInput style={s.input} placeholder="Course (optional)" value={taskCourse} onChangeText={setTaskCourse}/><DatePickerField value={taskDue} onChange={setTaskDue}/><TouchableOpacity style={s.action} onPress={addTask}><Text style={s.actionText}>+ Save Assignment</Text></TouchableOpacity><Text style={s.sub}>Tap the date field to select a date from the calendar.</Text></Card><Card><SectionTitle>My Assignments</SectionTitle>{!ready?<Text style={s.sub}>Loading...</Text>:tasks.length===0?<Text style={s.sub}>Your list is empty. Add your first assignment above.</Text>:tasks.slice().sort((a,b)=>a.dueDate.localeCompare(b.dueDate)).map(t=><View key={t.id} style={s.listRow}><TouchableOpacity accessibilityRole="checkbox" accessibilityState={{checked:t.done}} onPress={()=>setTasks(p=>p.map(x=>x.id===t.id?{...x,done:!x.done}:x))}><Ionicons name={t.done?'checkbox':'square-outline'} size={24} color={accent}/></TouchableOpacity><View style={{flex:1}}><Text style={[s.rowTitle,t.done&&{textDecorationLine:'line-through',color:muted}]}>{t.title}</Text><Text style={s.sub}>{t.course||'Personal'} · {t.dueDate}</Text></View><TouchableOpacity accessibilityLabel={'Delete '+t.title} accessibilityRole="button" onPress={()=>setTasks(p=>p.filter(x=>x.id!==t.id))}><Ionicons name="trash-outline" size={22} color="#C34C4C"/></TouchableOpacity></View>)}</Card></>}
            {page==='email'&&<><Heading>Email</Heading><Card style={{padding:0,overflow:'hidden'}}><View style={s.sectionHeader}><Text style={s.sectionTitle}>Inbox</Text><Text style={s.greenTag}>{emails.filter(e=>e.unread&&!read.includes(e.from)).length}</Text></View>{emails.map(e=><TouchableOpacity key={e.from} style={[s.emailRow,e.unread&&!read.includes(e.from)&&{backgroundColor:mint}]} onPress={()=>setRead(x=>x.includes(e.from)?x:[...x,e.from])}><View style={{flex:1}}><Text style={[s.rowTitle,!e.unread||read.includes(e.from)?{color:muted}:null]}>{e.from}</Text><Text style={s.sub}>{e.subject}</Text><Text style={s.smallTag}>{e.tag}</Text></View><Text style={s.sub}>{e.time}</Text></TouchableOpacity>)}</Card><Text style={s.note}>Inbox entries are Figma examples, not real messages. Tap an entry to mark it read locally.</Text></>}
      {page==='events'&&<><Heading caption="GET INVOLVED">Club Events</Heading><Text style={s.intro}>Meet people, explore interests, and find your community at FSC.</Text><View style={s.filters}>{['All','Technology','Professional','Arts','Cultural','Recreation'].map(f=><Pill key={f} label={f} active={filter===f} onPress={()=>setFilter(f)}/>)}</View>{events.filter(e=>filter==='All'||e.category===filter).map(e=><Card key={e.title} style={{borderTopWidth:4,borderTopColor:'#59C96A'}}><View style={[s.tagRow,{justifyContent:'space-between'}]}><Text style={s.greenTag}>FEATURED</Text><Text style={s.courseTag}>{e.category}</Text></View><Text style={s.courseName}>{e.title}</Text><Text style={{color:accent,marginBottom:6}}>{e.group}</Text><Text style={s.sub}>{e.place}</Text><Text style={[s.sub,{marginTop:12}]}>{e.date}   ◷ {e.time}</Text><TouchableOpacity style={{marginTop:17}} onPress={()=>setSavedEvents(x=>x.includes(e.title)?x.filter(t=>t!==e.title):[...x,e.title])}><Text style={{color:accent,fontWeight:'700'}}>{savedEvents.includes(e.title)?'✓ Saved on this phone':'+ Save event'}</Text></TouchableOpacity></Card>)}<Text style={s.note}>Event listings are examples from Figma. Saved events remain on this device; this is not a calendar integration.</Text><Text style={s.note}>Official live event feeds require an approved or permitted data source.</Text></>}
      {page==='dining'&&<><Heading>Dining</Heading><Text style={s.intro}>Sample menu layout · Check official sources for today's offerings.</Text>{[{name:'The Commons Dining Hall',special:'Chef’s Special: Butternut Squash Soup',items:['Grilled Salmon with Lemon Butter','Pasta Primavera','Roast Chicken','Garden Salad Bar']},{name:'Student Union Café',special:'',items:['Paninis & Wraps','Coffee & Espresso Bar','Grab-and-Go Sandwiches','Smoothies']}].map(d=><Card key={d.name}><SectionTitle>{d.name}</SectionTitle><Text style={s.sub}>Hours and availability not connected</Text>{!!d.special&&<View style={s.special}><Text style={s.rowTitle}>Today’s Special (sample)</Text><Text style={{color:green,marginTop:6}}>{d.special}</Text></View>}{d.items.map(i=><Text key={i} style={[s.sub,{marginTop:13}]}>•  {i}</Text>)}</Card>)}<Text style={s.note}>Official daily menus and opening hours are not yet integrated. These are illustrative items only.</Text></>}
      {page==='map'&&<><Heading caption="FIND YOUR WAY">Campus Map</Heading><Text style={s.intro}>Explore buildings, services, dining, and athletics.</Text><TextInput style={s.input} placeholder="Search buildings or services" value={search} onChangeText={setSearch}/><View style={s.mapPanel}><Text style={s.mapLabel}>FARMINGDALE STATE COLLEGE</Text><View style={s.mapGrid}>{[['LU','Lupton Hall'],['WH','Whitman Hall'],['CC','Campus Center'],['GL','Gleeson Hall'],['LB','Greenley Library'],['SU','Student Union'],['NA','Nold Athletic Complex']].filter(x=>x.join(' ').toLowerCase().includes(search.toLowerCase())).map(([code,name])=><TouchableOpacity key={code} style={[s.mapBuilding,selectedBuilding===name&&{backgroundColor:green}]} onPress={()=>setSelectedBuilding(name)} accessibilityRole="button"><Text style={[s.mapCode,selectedBuilding===name&&{color:'#fff'}]}>{code}</Text><Text style={[s.mapBuildingLabel,selectedBuilding===name&&{color:'#fff'}]}>{name}</Text></TouchableOpacity>)}</View></View>{selectedBuilding&&<Card><Text style={s.rowTitle}>{selectedBuilding}</Text><Text style={s.sub}>Selected campus building. Building details and walking directions are not yet connected to verified campus mapping data.</Text></Card>}<Text style={s.note}>Interactive building selector based on the Figma design. This is a stylized diagram, not a navigable or to-scale campus map.</Text></>}
      {page==='resources'&&<><Heading>Campus Resources</Heading><Text style={s.intro}>Explore student support services without leaving the app. Tap a resource to see what it offers.</Text>{resourceGroups.map(group=><Card key={group.heading} style={{padding:0,overflow:'hidden'}}><View style={s.sectionHeader}><Text style={s.sectionTitle}>{group.heading}</Text></View>{group.entries.map(([name,desc])=><View key={name}><TouchableOpacity style={s.resourceRow} onPress={()=>setExpandedResource(current=>current===name?null:name)} accessibilityRole="button" accessibilityState={{expanded:expandedResource===name}}><View style={{flex:1}}><Text style={s.rowTitle}>{name}</Text><Text style={s.sub}>{desc}</Text></View><Ionicons name={expandedResource===name?'chevron-up':'chevron-down'} size={21} color={muted}/></TouchableOpacity>{expandedResource===name&&<View style={{paddingHorizontal:20,paddingBottom:16}}><Text style={s.sub}>{desc}. For current office hours, appointments, and contact information, check the official college directory or ask staff.</Text></View>}</View>)}</Card>)}<Text style={s.note}>These descriptions are general guidance, not a verified live directory or official college service integration.</Text></>}
      <SampleNote/><Text style={s.footer}>Unofficial student project · Not affiliated with or endorsed by Farmingdale State College.</Text>
    </ScrollView>
    <View style={s.bottomNav}>{([{key:'index',icon:'home-outline',label:'Home'},{key:'schedule',icon:'calendar-outline',label:'Schedule'},{key:'deadlines',icon:'checkmark-circle-outline',label:'Tasks'},{key:'events',icon:'people-outline',label:'Events'},{key:'resources',icon:'library-outline',label:'More'}] as {key:Page;icon:Icon;label:string}[]).map(item=><TouchableOpacity key={item.key} accessibilityRole="button" accessibilityLabel={item.label} onPress={()=>nav(item.key)} style={s.bottomItem}><Ionicons name={item.icon} size={22} color={page===item.key?green:muted}/><Text style={{fontSize:10,color:page===item.key?green:muted,fontWeight:page===item.key?'800':'500'}}>{item.label}</Text></TouchableOpacity>)}</View>
    {drawer&&<View style={s.overlay}><TouchableOpacity style={s.scrim} onPress={()=>setDrawer(false)} accessibilityLabel="Close menu"/><View style={s.drawer}><Text style={s.drawerTitle}>Central Farmingdale</Text>{menu.map(m=><TouchableOpacity key={m.key} style={[s.drawerItem,page===m.key&&{backgroundColor:accent}]} onPress={()=>nav(m.key)}><Ionicons name={m.icon} color={page===m.key?'#fff':'#91C69A'} size={20}/><Text style={[s.drawerText,page===m.key&&{color:'#fff'}]}>{m.label}</Text></TouchableOpacity>)}<Text style={s.drawerFoot}>Figma design preview · Fall 2026</Text></View></View>}
  </View>;
}
const s=StyleSheet.create({
  bottomNav:{flexDirection:'row',backgroundColor:'#fff',borderTopColor:border,borderTopWidth:1,paddingVertical:10,paddingBottom:17},bottomItem:{flex:1,alignItems:'center',gap:4},
  root:{flex:1,backgroundColor:'#fff'},header:{backgroundColor:'#0D2415',paddingTop:54,paddingBottom:17,paddingHorizontal:17,flexDirection:'row',alignItems:'center',gap:14},
  logo:{width:30,height:30,backgroundColor:'#63D078',borderRadius:7,alignItems:'center',justifyContent:'center'},headerBrand:{color:'#fff',fontSize:18,fontWeight:'700',flex:1},avatar:{width:36,height:36,borderRadius:18,backgroundColor:accent,alignItems:'center',justifyContent:'center'},redDot:{position:'absolute',right:0,top:-3,width:9,height:9,borderRadius:5,backgroundColor:'#E4514F'},
  body:{padding:14,paddingBottom:36},pageTitle:{fontSize:28,fontWeight:'800',color:green},eyebrow:{color:accent,fontSize:12,fontWeight:'700',letterSpacing:2,marginBottom:8},intro:{fontSize:15,color:muted,lineHeight:22,marginBottom:18},
  hero:{backgroundColor:'#28633A',borderRadius:17,padding:17,marginBottom:14},heroTitle:{fontSize:24,fontWeight:'800',color:'#fff',marginTop:7},heroSub:{fontSize:14,color:'#A8E5B5',lineHeight:20,marginTop:6},
  card:{backgroundColor:'#fff',borderWidth:1,borderColor:border,borderRadius:15,padding:16,marginBottom:13,shadowColor:'#163E22',shadowOpacity:0.08,shadowRadius:4,elevation:2},
  statGrid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},stat:{width:'48%',minHeight:98},statLabel:{fontSize:11,color:muted,fontWeight:'600'},statNumber:{fontSize:29,fontWeight:'800',marginTop:5},sub:{color:muted,fontSize:12,lineHeight:19,marginTop:3},sectionHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:4,paddingBottom:13,marginBottom:5,borderBottomWidth:1,borderColor:border},sectionTitle:{fontSize:17,color:green,fontWeight:'800'},rowTitle:{fontSize:15,color:green,fontWeight:'700'},listRow:{flexDirection:'row',alignItems:'center',paddingVertical:14,gap:11,borderBottomWidth:1,borderColor:'#EAF2EB'},bullet:{width:9,height:9,borderRadius:5},dueBadge:{fontSize:10,fontWeight:'700',maxWidth:95,textAlign:'right'},classMini:{flexDirection:'row',gap:10,paddingVertical:9},time:{color:accent,fontSize:12,fontWeight:'700'},quickGrid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},
  tagRow:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:9,flexWrap:'wrap'},courseTag:{color:accent,backgroundColor:mint,paddingHorizontal:9,paddingVertical:5,borderRadius:6,fontWeight:'700',fontSize:12},greenTag:{color:'#fff',backgroundColor:'#59C46D',paddingHorizontal:9,paddingVertical:5,borderRadius:14,overflow:'hidden',fontSize:12},redTag:{color:'#E4514F',backgroundColor:'#FDF0F0',paddingHorizontal:9,paddingVertical:5,borderRadius:14,overflow:'hidden',fontSize:12},courseName:{fontSize:18,fontWeight:'800',color:green,marginBottom:5},grade:{fontSize:27,fontWeight:'800',color:accent},progress:{height:5,backgroundColor:border,borderRadius:4,marginTop:17},progressFill:{height:5,backgroundColor:'#57C96A',borderRadius:4},
  weekRow:{flexDirection:'row',borderBottomWidth:1,borderColor:border},weekDay:{flex:1,alignItems:'center',paddingVertical:16},weekText:{fontWeight:'700',color:muted,fontSize:13},timeline:{flexDirection:'row',alignItems:'center',marginBottom:16},timelineDot:{width:9,height:9,borderRadius:5,backgroundColor:accent,marginRight:13},scheduleCard:{flex:1,borderRadius:12,padding:15,minHeight:70,justifyContent:'center'},
  filters:{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:17},pill:{paddingHorizontal:15,paddingVertical:10,borderRadius:22,borderWidth:1,borderColor:border},pillActive:{backgroundColor:green,borderColor:green},pillText:{color:muted,fontWeight:'700',fontSize:13},input:{borderWidth:1,borderColor:border,borderRadius:12,padding:14,marginBottom:15,color:green,fontSize:14},action:{backgroundColor:green,padding:14,borderRadius:11,alignItems:'center',marginTop:8},actionText:{color:'#fff',fontWeight:'700'},emailRow:{padding:18,borderBottomWidth:1,borderColor:border,flexDirection:'row',gap:8},smallTag:{color:muted,backgroundColor:'#F1F9F3',padding:5,alignSelf:'flex-start',marginTop:7,fontSize:11},special:{backgroundColor:'#DDFBE5',borderRadius:10,padding:14,marginTop:17},external:{color:accent,fontWeight:'700',marginBottom:18},
  mapPanel:{backgroundColor:'#EEF8F0',borderWidth:1,borderColor:border,borderRadius:17,padding:15,marginBottom:12,minHeight:350},mapLabel:{fontSize:11,letterSpacing:2,color:muted,fontWeight:'800',marginBottom:22},mapGrid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',gap:12},mapBuilding:{backgroundColor:'#fff',borderColor:accent,borderWidth:2,borderRadius:13,padding:12,minWidth:'42%',alignItems:'center'},mapCode:{fontSize:18,color:green,fontWeight:'800'},mapBuildingLabel:{fontSize:11,color:green,marginTop:5,textAlign:'center'},resourceRow:{flexDirection:'row',alignItems:'center',padding:18,borderBottomWidth:1,borderColor:border},
  note:{fontSize:11,color:muted,lineHeight:17,marginVertical:13},footer:{fontSize:10,color:muted,textAlign:'center',marginTop:10},overlay:{...StyleSheet.absoluteFill,flexDirection:'row',zIndex:20},scrim:{...StyleSheet.absoluteFill,backgroundColor:'rgba(0,0,0,0.45)'},drawer:{width:'79%',backgroundColor:green,paddingTop:80,paddingHorizontal:14,paddingBottom:30,justifyContent:'flex-start'},drawerTitle:{fontSize:19,fontWeight:'800',color:'#fff',marginBottom:22,marginLeft:8},drawerItem:{flexDirection:'row',alignItems:'center',gap:17,paddingVertical:14,paddingHorizontal:14,borderRadius:9},drawerText:{fontSize:15,color:'#9ED0A5',fontWeight:'600'},drawerFoot:{color:'#83B88A',fontSize:12,marginTop:24,paddingLeft:12},
});
