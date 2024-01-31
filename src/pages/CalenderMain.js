import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const CalendarMain = () => {
  
  const events = [
    { title: 'Sample Event', date: new Date() },
    // more events...
  ]

  return (
     <FullCalendar 
       plugins={[dayGridPlugin]} 
       initialView="dayGridMonth" 
       events={events} /*events 배열은 달력에 표시될 이벤트 목록이다.*/
     />
   );
}

export default CalendarMain