import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ink='#17351F', accent='#4A9656', border='#D5EAD8';
const pad=(n:number)=>String(n).padStart(2,'0');
const key=(d:Date)=>[d.getFullYear(),pad(d.getMonth()+1),pad(d.getDate())].join('-');

export function DatePickerField({value,onChange}:{value:string;onChange:(date:string)=>void}) {
  const [open,setOpen]=useState(false);
  const base=/^\d{4}-\d{2}-\d{2}$/.test(value)?new Date(value+'T12:00:00'):new Date();
  const [view,setView]=useState(new Date(base.getFullYear(),base.getMonth(),1));
  const selected=/^\d{4}-\d{2}-\d{2}$/.test(value)?value:'';
  const first=view.getDay();
  const days=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
  const cells=Array.from({length:first+days},(_,i)=>i-first+1);
  return <>
    <TouchableOpacity accessibilityRole="button" onPress={()=>{setView(new Date(base.getFullYear(),base.getMonth(),1));setOpen(true);}} style={styles.field}>
      <Text style={{color:selected?ink:'#7C8FB1'}}>{selected||'Choose a due date'}</Text><Text style={{color:accent}}>▾</Text>
    </TouchableOpacity>
    <Modal transparent visible={open} animationType="fade" onRequestClose={()=>setOpen(false)}>
      <View style={styles.backdrop}><View style={styles.modal}>
        <Text style={styles.heading}>Choose a due date</Text>
        <View style={styles.monthRow}>
          <TouchableOpacity accessibilityLabel="Previous month" onPress={()=>setView(d=>new Date(d.getFullYear(),d.getMonth()-1,1))}><Text style={styles.control}>‹</Text></TouchableOpacity>
          <Text style={{color:ink,fontWeight:'700'}}>{view.toLocaleDateString('en-US',{month:'long',year:'numeric'})}</Text>
          <TouchableOpacity accessibilityLabel="Next month" onPress={()=>setView(d=>new Date(d.getFullYear(),d.getMonth()+1,1))}><Text style={styles.control}>›</Text></TouchableOpacity>
        </View>
        <View style={styles.calendar}>{['S','M','T','W','T','F','S'].map((d,i)=><Text key={i} style={styles.day}>{d}</Text>)}{cells.map((d,i)=><View key={i} style={styles.dayCell}>{d>0?<TouchableOpacity accessibilityRole="button" accessibilityLabel={key(new Date(view.getFullYear(),view.getMonth(),d))} onPress={()=>{onChange(key(new Date(view.getFullYear(),view.getMonth(),d)));setOpen(false);}} style={[styles.dayButton,selected===key(new Date(view.getFullYear(),view.getMonth(),d))&&{backgroundColor:ink}]}><Text style={{color:selected===key(new Date(view.getFullYear(),view.getMonth(),d))?'#fff':ink}}>{d}</Text></TouchableOpacity>:null}</View>)}</View>
        <Pressable style={styles.close} onPress={()=>setOpen(false)}><Text style={{color:ink,fontWeight:'700'}}>Close</Text></Pressable>
      </View></View>
    </Modal>
  </>;
}

export function TimePickerField({value,onChange}:{value:string;onChange:(time:string)=>void}) {
  const [open,setOpen]=useState(false);
  const options=Array.from({length:48},(_,i)=>{const hour=Math.floor(i/2),minute=i%2*30;return (hour%12||12)+':'+pad(minute)+(hour<12?' AM':' PM');});
  return <>
    <TouchableOpacity accessibilityRole="button" onPress={()=>setOpen(true)} style={styles.field}><Text style={{color:value?ink:'#7C8FB1'}}>{value||'Choose class start time'}</Text><Text style={{color:accent}}>▾</Text></TouchableOpacity>
    <Modal transparent visible={open} animationType="fade" onRequestClose={()=>setOpen(false)}><View style={styles.backdrop}><View style={styles.modal}><Text style={styles.heading}>Class start time</Text><ScrollView style={{maxHeight:330}}>{options.map(t=><TouchableOpacity key={t} style={[styles.timeOption,value===t&&{backgroundColor:'#EAF5ED'}]} onPress={()=>{onChange(t);setOpen(false);}}><Text style={{color:ink}}>{t}</Text></TouchableOpacity>)}</ScrollView><Pressable style={styles.close} onPress={()=>setOpen(false)}><Text style={{color:ink,fontWeight:'700'}}>Close</Text></Pressable></View></View></Modal>
  </>;
}

const styles=StyleSheet.create({
 field:{borderWidth:1,borderColor:border,borderRadius:12,minHeight:50,paddingHorizontal:14,marginBottom:15,flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff'},
 backdrop:{flex:1,backgroundColor:'rgba(0,0,0,0.5)',justifyContent:'center',padding:24},
 modal:{backgroundColor:'#fff',padding:19,borderRadius:18},
 heading:{color:ink,fontWeight:'800',fontSize:20,marginBottom:15},
 monthRow:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15},
 control:{color:accent,fontSize:30,paddingHorizontal:16},
 calendar:{flexDirection:'row',flexWrap:'wrap'},
 day:{width:'14.2857%',textAlign:'center',fontWeight:'700',color:'#7C8FB1',paddingVertical:8},
 dayCell:{width:'14.2857%',height:43,alignItems:'center',justifyContent:'center'},
 dayButton:{height:36,width:36,alignItems:'center',justifyContent:'center',borderRadius:18},
 close:{alignSelf:'flex-end',padding:12,marginTop:10},
 timeOption:{padding:15,borderBottomWidth:1,borderBottomColor:'#EAF5ED'},
});
