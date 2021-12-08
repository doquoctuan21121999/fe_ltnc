// JavaScript library that creates a callendar with events
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import constants from "@utils/const";
import moment from "moment";
import React, { useEffect, useRef } from "react";

const TimeGrid = ({ listSchedule }) => {
  const refs = useRef(null);
  useEffect(() => {
    createCalendar();
  }, [listSchedule]);

  const createCalendar = () => {
    const calendar = new Calendar(refs.current, {
      plugins: [timeGridPlugin],
      events: (listSchedule || []).map((item, index) => {
        const day = constants.day.find((element) => element.value === item.day);
        console.log(
          moment(
            day.enName + " " + item.sessionInfo.startTime,
            "dddd HH:mm:ss"
          ).format("yyyy-MM-DD HH:mm:ss")
        );
        return {
          id: index,
          start: moment(
            day.enName + " " + item.sessionInfo.startTime,
            "dddd HH:mm:ss"
          ).format("yyyy-MM-DD HH:mm:ss"),
          end: moment(
            day.enName + " " + item.sessionInfo.endTime,
            "dddd HH:mm:ss"
          ).format("yyyy-MM-DD HH:mm:ss"),
          backgroundColor: "var(--red)",
          borderColor: "var(--red)",
        };
      }),
      dayHeaderContent: (date) => constants.day[date.dow].label,
      dayCellContent: (a, b, c, d) => "",
      allDaySlot: null,
      slotDuration: "01:00:00",
      headerToolbar: null,
      eventTimeFormat: {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
      // slotLabelContent: (a) => {
      //   console.log(a);
      // },
      height: "400px",
      slotMinTime: "06:00",
      slotMaxTime: "22:00",
    });
    calendar.render();
  };
  return <div className="calendar" ref={refs}></div>;
};

export default TimeGrid;
