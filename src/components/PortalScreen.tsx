import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  const [day,setDay]=useState('Mon');
  const [filter,setFilter]=useState('All');
  const [search,setSearch]=useState('');
  const [taskTitle,setTaskTitle]=useState('');
  const [tasks,setTasks]=useState<{id:number;title:string;done:boolean}[]>([]);
  const [read,setRead]=useState<string[]>([]);
  const [saved,setSaved]=useState<string[]>([]);
  const addTask=()=>{const title=taskTitle.trim();if(title){setTasks(t=>[...t,{id:Date.now(),title,done:false}]);setTaskTitle('');}};
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
        <View style={s.hero}><Text style={{color:'#A6E6B5',fontSize:12,fontWeight:'700',letterSpacing:1}}>TUESDAY, SEPTEMBER 23, 2026</Text><Text style={s.heroTitle}>Good morning, Satya</Text><Text style={s.heroSub}>You have 2 assignments due today and 3 classes this afternoon.</Text></View>
        <View style={s.statGrid}>{[['DUE TODAY','2','assignments'],['THIS WEEK','5','assignments'],['UNREAD EMAILS','2','messages'],['ACTIVE COURSES','5','this semester']].map(([label,value,desc],i)=><Card key={label} style={s.stat}><Text style={s.statLabel}>{label}</Text><Text style={[s.statNumber,{color:i===0?'#E4514F':'#56BD68'}]}>{value}</Text><Text style={s.sub}>{desc}</Text></Card>)}</View>
        <Card><SectionTitle right="View all" onPress={()=>nav('deadlines')}>Upcoming Assignments</SectionTitle>{assignments.map((a,i)=><View key={a.name} style={s.listRow}><View style={[s.bullet,{backgroundColor:a.urgent?'#E4514F':accent}]}/><View style={{flex:1}}><Text numberOfLines={1} style={s.rowTitle}>{a.name}</Text><Text style={s.sub}>{a.course} · {a.kind}</Text></View><Text style={[s.dueBadge,{color:a.urgent?'#E4514F':accent}]}>{a.due}</Text></View>)}</Card>
        <Card><SectionTitle>Today's Classes</SectionTitle>{classes.filter(c=>c.day==='Mon'&&c.room).map(c=><View key={c.time} style={s.classMini}><Text style={s.time}>{c.time}</Text><View style={{flex:1,borderLeftWidth:2,borderColor:border,paddingLeft:13}}><Text style={s.rowTitle}>{c.code}</Text><Text style={s.sub}>{c.room}</Text></View></View>)}</Card>
        <Card><SectionTitle right="Inbox" onPress={()=>nav('email')}>Recent Email</SectionTitle>{emails.slice(0,3).map(e=><View key={e.from} style={s.listRow}><View style={[s.bullet,{backgroundColor:accent}]}/><View style={{flex:1}}><Text style={s.rowTitle}>{e.from}</Text><Text style={s.sub}>{e.subject}</Text></View></View>)}</Card>
        <Card><SectionTitle>Quick Links</SectionTitle><View style={s.quickGrid}>{[['Brightspace LMS','https://farmingdale.open.suny.edu/'],['OASIS Portal','https://www.farmingdale.edu/'],['Library Resources','https://www.farmingdale.edu/'],['IT Help Desk','https://www.farmingdale.edu/'],['Financial Aid','https://www.farmingdale.edu/'],['Campus Map','internal']].map(([name,url])=><TouchableOpacity key={name} style={{width:'48%',paddingVertical:12}} onPress={()=>url==='internal'?nav('map'):Linking.openURL(url)}><Text style={{color:accent,fontWeight:'600'}}>{name}</Text></TouchableOpacity>)}</View></Card>
      </>}
      {page==='courses'&&<><Heading>Courses & Grades</Heading>{courses.map(c=><Card key={c.code}><View style={{flexDirection:'row',justifyContent:'space-between'}}><View style={{flex:1}}><View style={s.tagRow}><Text style={s.courseTag}>{c.code}</Text>{c.new>0&&<Text style={s.greenTag}>{c.new} new</Text>}{c.due>0&&<Text style={s.redTag}>{c.due} due</Text>}</View><Text style={s.courseName}>{c.name}</Text><Text style={s.sub}>{c.professor} · {c.credits} credits</Text></View><View style={{alignItems:'flex-end'}}><Text style={s.grade}>{c.grade}</Text><Text style={s.sub}>{c.percent}%</Text></View></View><View style={s.progress}><View style={[s.progressFill,{width:c.percent+'%'}]}/></View></Card>)}</>}
      {page==='schedule'&&<><Heading>Weekly Schedule</Heading><Card style={{padding:0,overflow:'hidden'}}><View style={s.weekRow}>{['Mon','Tue','Wed','Thu','Fri'].map(d=><TouchableOpacity key={d} style={[s.weekDay,day===d&&{backgroundColor:green}]} onPress={()=>setDay(d)}><Text style={[s.weekText,day===d&&{color:'#fff'}]}>{d}</Text></TouchableOpacity>)}</View><View style={{padding:16}}>{classes.filter(c=>c.day===day).length?classes.filter(c=>c.day===day).map(c=><View key={c.time} style={s.timeline}><View style={{width:94,alignItems:'flex-end',paddingRight:12}}><Text style={s.time}>{c.time}</Text><Text style={s.sub}>{c.end}</Text></View><View style={s.timelineDot}/><View style={[s.scheduleCard,{backgroundColor:c.lab?'#DDFBE5':mint}]}><Text style={s.rowTitle}>{c.code}</Text>{!!c.room&&<Text style={s.sub}>{c.room}</Text>}{c.lab&&<Text style={s.greenTag}>Lab</Text>}</View></View>):<Text style={s.sub}>No sample classes scheduled.</Text>}</View></Card></>}
      {page==='deadlines'&&<><Heading caption="ACADEMIC PLANNER">Upcoming Deadlines</Heading><Text style={s.intro}>Everything due across your course calendar.</Text><Text style={[s.sub,{marginBottom:18}]}>🔴 2 need attention · Example deadlines</Text>{[['2','Due in 24 hours','Start here'],['5','Next 7 days','Across 4 courses'],['1','Upcoming exam','CSC 220 midterm']].map(([n,label,desc],i)=><Card key={label}><Text style={[s.statNumber,{color:i===0?'#E4514F':accent}]}>{n}</Text><Text style={s.rowTitle}>{label}</Text><Text style={s.sub}>{desc}</Text></Card>)}<View style={s.filters}>{['All',...courses.map(c=>c.code)].map(f=><Pill key={f} label={f} active={filter===f} onPress={()=>setFilter(f)}/>)}</View><Card><SectionTitle>Example Assignments</SectionTitle>{assignments.filter(a=>filter==='All'||a.course===filter).map(a=><View key={a.name} style={s.listRow}><View style={[s.bullet,{backgroundColor:a.urgent?'#E4514F':accent}]}/><View style={{flex:1}}><Text style={s.rowTitle}>{a.name}</Text><Text style={s.sub}>{a.course} · {a.due}</Text></View></View>)}</Card><Card><SectionTitle>My Personal Checklist</SectionTitle><TextInput style={s.input} placeholder="Add your own assignment" value={taskTitle} onChangeText={setTaskTitle} onSubmitEditing={addTask}/><TouchableOpacity style={s.action} onPress={addTask}><Text style={s.actionText}>+ Add task</Text></TouchableOpacity>{tasks.map(t=><TouchableOpacity key={t.id} style={s.listRow} onPress={()=>setTasks(all=>all.map(x=>x.id===t.id?{...x,done:!x.done}:x))}><Ionicons name={t.done?'checkbox':'square-outline'} size={22} color={accent}/><Text style={[s.rowTitle,{marginLeft:10},t.done&&{textDecorationLine:'line-through'}]}>{t.title}</Text></TouchableOpacity>)}<Text style={s.sub}>Personal tasks reset when the app restarts.</Text></Card></>}
      {page==='email'&&<><Heading>Email</Heading><Card style={{padding:0,overflow:'hidden'}}><View style={s.sectionHeader}><Text style={s.sectionTitle}>Inbox</Text><Text style={s.greenTag}>{emails.filter(e=>e.unread&&!read.includes(e.from)).length}</Text></View>{emails.map(e=><TouchableOpacity key={e.from} style={[s.emailRow,e.unread&&!read.includes(e.from)&&{backgroundColor:mint}]} onPress={()=>setRead(x=>x.includes(e.from)?x:[...x,e.from])}><View style={{flex:1}}><Text style={[s.rowTitle,!e.unread||read.includes(e.from)?{color:muted}:null]}>{e.from}</Text><Text style={s.sub}>{e.subject}</Text><Text style={s.smallTag}>{e.tag}</Text></View><Text style={s.sub}>{e.time}</Text></TouchableOpacity>)}</Card><Text style={s.note}>Inbox entries are Figma examples, not real messages. Tap an entry to mark it read locally.</Text></>}
      {page==='events'&&<><Heading caption="GET INVOLVED">Club Events</Heading><Text style={s.intro}>Meet people, explore interests, and find your community at FSC.</Text><View style={s.filters}>{['All','Technology','Professional','Arts','Cultural','Recreation'].map(f=><Pill key={f} label={f} active={filter===f} onPress={()=>setFilter(f)}/>)}</View>{events.filter(e=>filter==='All'||e.category===filter).map(e=><Card key={e.title} style={{borderTopWidth:4,borderTopColor:'#59C96A'}}><View style={[s.tagRow,{justifyContent:'space-between'}]}><Text style={s.greenTag}>FEATURED</Text><Text style={s.courseTag}>{e.category}</Text></View><Text style={s.courseName}>{e.title}</Text><Text style={{color:accent,marginBottom:6}}>{e.group}</Text><Text style={s.sub}>{e.place}</Text><Text style={[s.sub,{marginTop:12}]}>{e.date}   ◷ {e.time}</Text><TouchableOpacity style={{marginTop:17}} onPress={()=>setSaved(x=>x.includes(e.title)?x.filter(t=>t!==e.title):[...x,e.title])}><Text style={{color:accent,fontWeight:'700'}}>{saved.includes(e.title)?'✓ Saved for this session':'+ Save event'}</Text></TouchableOpacity></Card>)}<Text style={s.note}>Event listings are examples from Figma. Saving is local to this session, not a calendar integration.</Text><TouchableOpacity onPress={()=>Linking.openURL('https://www.farmingdale.edu/student-activities/')}><Text style={s.external}>View official student activities →</Text></TouchableOpacity></>}
      {page==='dining'&&<><Heading>Dining</Heading><Text style={s.intro}>Sample menu layout · Check official sources for today's offerings.</Text>{[{name:'The Commons Dining Hall',special:'Chef’s Special: Butternut Squash Soup',items:['Grilled Salmon with Lemon Butter','Pasta Primavera','Roast Chicken','Garden Salad Bar']},{name:'Student Union Café',special:'',items:['Paninis & Wraps','Coffee & Espresso Bar','Grab-and-Go Sandwiches','Smoothies']}].map(d=><Card key={d.name}><SectionTitle>{d.name}</SectionTitle><Text style={s.sub}>Hours and availability not connected</Text>{!!d.special&&<View style={s.special}><Text style={s.rowTitle}>Today’s Special (sample)</Text><Text style={{color:green,marginTop:6}}>{d.special}</Text></View>}{d.items.map(i=><Text key={i} style={[s.sub,{marginTop:13}]}>•  {i}</Text>)}</Card>)}<TouchableOpacity onPress={()=>Linking.openURL('https://www.farmingdale.edu/auxiliary-service-corporation/campus-dining.shtml')}><Text style={s.external}>Check official dining menus and hours →</Text></TouchableOpacity></>}
      {page==='map'&&<><Heading caption="FIND YOUR WAY">Campus Map</Heading><Text style={s.intro}>Explore buildings, services, dining, and athletics.</Text><TextInput style={s.input} placeholder="Search buildings or services" value={search} onChangeText={setSearch}/><View style={s.mapPanel}><Text style={s.mapLabel}>FARMINGDALE STATE COLLEGE</Text><View style={s.mapGrid}>{[['LU','Lupton Hall'],['WH','Whitman Hall'],['CC','Campus Center'],['GL','Gleeson Hall'],['LB','Greenley Library'],['SU','Student Union'],['NA','Nold Athletic Complex']].filter(x=>x.join(' ').toLowerCase().includes(search.toLowerCase())).map(([code,name])=><TouchableOpacity key={code} style={[s.mapBuilding,code==='CC'&&{backgroundColor:green}]} onPress={()=>Linking.openURL('https://map.farmingdale.edu/')}><Text style={[s.mapCode,code==='CC'&&{color:'#fff'}]}>{code}</Text><Text style={[s.mapBuildingLabel,code==='CC'&&{color:'#fff'}]}>{name}</Text></TouchableOpacity>)}</View></View><Text style={s.note}>Stylized diagram based on the Figma design. Not to scale; use the official map for directions.</Text><TouchableOpacity style={s.action} onPress={()=>Linking.openURL('https://map.farmingdale.edu/')}><Text style={s.actionText}>Open official interactive campus map ↗</Text></TouchableOpacity></>}
      {page==='resources'&&<><Heading>Campus Resources</Heading>{resourceGroups.map(group=><Card key={group.heading} style={{padding:0,overflow:'hidden'}}><View style={s.sectionHeader}><Text style={s.sectionTitle}>{group.heading}</Text></View>{group.entries.map(([name,desc,url])=><TouchableOpacity key={name} style={s.resourceRow} onPress={()=>Linking.openURL(url)}><View style={{flex:1}}><Text style={s.rowTitle}>{name}</Text><Text style={s.sub}>{desc}</Text></View><Ionicons name="arrow-forward" size={21} color={muted}/></TouchableOpacity>)}</Card>)}<Text style={s.note}>Consult official college pages for current locations, hours, and contact details.</Text></>}
      <SampleNote/><Text style={s.footer}>Unofficial student project · Not affiliated with or endorsed by Farmingdale State College.</Text>
    </ScrollView>
    {drawer&&<View style={s.overlay}><TouchableOpacity style={s.scrim} onPress={()=>setDrawer(false)} accessibilityLabel="Close menu"/><View style={s.drawer}><Text style={s.drawerTitle}>Central Farmingdale</Text>{menu.map(m=><TouchableOpacity key={m.key} style={[s.drawerItem,page===m.key&&{backgroundColor:accent}]} onPress={()=>nav(m.key)}><Ionicons name={m.icon} color={page===m.key?'#fff':'#91C69A'} size={20}/><Text style={[s.drawerText,page===m.key&&{color:'#fff'}]}>{m.label}</Text></TouchableOpacity>)}<Text style={s.drawerFoot}>Figma design preview · Fall 2026</Text></View></View>}
  </View>;
}
const s=StyleSheet.create({
  root:{flex:1,backgroundColor:'#fff'},header:{backgroundColor:'#0D2415',paddingTop:54,paddingBottom:17,paddingHorizontal:17,flexDirection:'row',alignItems:'center',gap:14},
  logo:{width:30,height:30,backgroundColor:'#63D078',borderRadius:7,alignItems:'center',justifyContent:'center'},headerBrand:{color:'#fff',fontSize:18,fontWeight:'700',flex:1},avatar:{width:36,height:36,borderRadius:18,backgroundColor:accent,alignItems:'center',justifyContent:'center'},redDot:{position:'absolute',right:0,top:-3,width:9,height:9,borderRadius:5,backgroundColor:'#E4514F'},
  body:{padding:17,paddingBottom:50},pageTitle:{fontSize:28,fontWeight:'800',color:green},eyebrow:{color:accent,fontSize:12,fontWeight:'700',letterSpacing:2,marginBottom:8},intro:{fontSize:15,color:muted,lineHeight:22,marginBottom:18},
  hero:{backgroundColor:'#28633A',borderRadius:17,padding:24,marginBottom:22},heroTitle:{fontSize:27,fontWeight:'800',color:'#fff',marginTop:11},heroSub:{fontSize:15,color:'#A8E5B5',lineHeight:23,marginTop:8},
  card:{backgroundColor:'#fff',borderWidth:1,borderColor:border,borderRadius:15,padding:20,marginBottom:17,shadowColor:'#163E22',shadowOpacity:0.08,shadowRadius:4,elevation:2},
  statGrid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},stat:{width:'48%',minHeight:119},statLabel:{fontSize:11,color:muted,fontWeight:'600'},statNumber:{fontSize:34,fontWeight:'800',marginTop:8},sub:{color:muted,fontSize:12,lineHeight:19,marginTop:3},sectionHeader:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingBottom:13,marginBottom:5,borderBottomWidth:1,borderColor:border},sectionTitle:{fontSize:18,color:green,fontWeight:'800'},rowTitle:{fontSize:15,color:green,fontWeight:'700'},listRow:{flexDirection:'row',alignItems:'center',paddingVertical:14,gap:11,borderBottomWidth:1,borderColor:'#EAF2EB'},bullet:{width:9,height:9,borderRadius:5},dueBadge:{fontSize:10,fontWeight:'700',maxWidth:95,textAlign:'right'},classMini:{flexDirection:'row',gap:10,paddingVertical:9},time:{color:accent,fontSize:12,fontWeight:'700'},quickGrid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between'},
  tagRow:{flexDirection:'row',alignItems:'center',gap:8,marginBottom:9,flexWrap:'wrap'},courseTag:{color:accent,backgroundColor:mint,paddingHorizontal:9,paddingVertical:5,borderRadius:6,fontWeight:'700',fontSize:12},greenTag:{color:'#fff',backgroundColor:'#59C46D',paddingHorizontal:9,paddingVertical:5,borderRadius:14,overflow:'hidden',fontSize:12},redTag:{color:'#E4514F',backgroundColor:'#FDF0F0',paddingHorizontal:9,paddingVertical:5,borderRadius:14,overflow:'hidden',fontSize:12},courseName:{fontSize:18,fontWeight:'800',color:green,marginBottom:5},grade:{fontSize:27,fontWeight:'800',color:accent},progress:{height:5,backgroundColor:border,borderRadius:4,marginTop:17},progressFill:{height:5,backgroundColor:'#57C96A',borderRadius:4},
  weekRow:{flexDirection:'row',borderBottomWidth:1,borderColor:border},weekDay:{flex:1,alignItems:'center',paddingVertical:16},weekText:{fontWeight:'700',color:muted,fontSize:13},timeline:{flexDirection:'row',alignItems:'center',marginBottom:16},timelineDot:{width:9,height:9,borderRadius:5,backgroundColor:accent,marginRight:13},scheduleCard:{flex:1,borderRadius:12,padding:15,minHeight:70,justifyContent:'center'},
  filters:{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:17},pill:{paddingHorizontal:15,paddingVertical:10,borderRadius:22,borderWidth:1,borderColor:border},pillActive:{backgroundColor:green,borderColor:green},pillText:{color:muted,fontWeight:'700',fontSize:13},input:{borderWidth:1,borderColor:border,borderRadius:12,padding:14,marginBottom:15,color:green,fontSize:14},action:{backgroundColor:green,padding:14,borderRadius:11,alignItems:'center',marginTop:8},actionText:{color:'#fff',fontWeight:'700'},emailRow:{padding:18,borderBottomWidth:1,borderColor:border,flexDirection:'row',gap:8},smallTag:{color:muted,backgroundColor:'#F1F9F3',padding:5,alignSelf:'flex-start',marginTop:7,fontSize:11},special:{backgroundColor:'#DDFBE5',borderRadius:10,padding:14,marginTop:17},external:{color:accent,fontWeight:'700',marginBottom:18},
  mapPanel:{backgroundColor:'#EEF8F0',borderWidth:1,borderColor:border,borderRadius:17,padding:15,marginBottom:12,minHeight:350},mapLabel:{fontSize:11,letterSpacing:2,color:muted,fontWeight:'800',marginBottom:22},mapGrid:{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around',gap:12},mapBuilding:{backgroundColor:'#fff',borderColor:accent,borderWidth:2,borderRadius:13,padding:12,minWidth:'42%',alignItems:'center'},mapCode:{fontSize:18,color:green,fontWeight:'800'},mapBuildingLabel:{fontSize:11,color:green,marginTop:5,textAlign:'center'},resourceRow:{flexDirection:'row',alignItems:'center',padding:18,borderBottomWidth:1,borderColor:border},
  note:{fontSize:11,color:muted,lineHeight:17,marginVertical:13},footer:{fontSize:10,color:muted,textAlign:'center',marginTop:10},overlay:{...StyleSheet.absoluteFillObject,flexDirection:'row',zIndex:20},scrim:{...StyleSheet.absoluteFillObject,backgroundColor:'rgba(0,0,0,0.45)'},drawer:{width:'79%',backgroundColor:green,paddingTop:80,paddingHorizontal:14,paddingBottom:30,justifyContent:'flex-start'},drawerTitle:{fontSize:19,fontWeight:'800',color:'#fff',marginBottom:22,marginLeft:8},drawerItem:{flexDirection:'row',alignItems:'center',gap:17,paddingVertical:14,paddingHorizontal:14,borderRadius:9},drawerText:{fontSize:15,color:'#9ED0A5',fontWeight:'600'},drawerFoot:{color:'#83B88A',fontSize:12,marginTop:24,paddingLeft:12},
});
