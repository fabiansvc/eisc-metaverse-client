import "./styles-atention-schedule.css";
import React, { useState, useEffect } from "react";

/**
 * AtentionSchedule component
 * @param {Object} props - Component props
 * @param {Object} props.valuesTeacher - Teacher data values
 * @param {number} props.count - Count
 * @param {function} props.setValuesTeacher - Function to set teacher data values
 * @returns {JSX.Element} AtentionSchedule component
 */
const AtentionSchedule = ({ valuesTeacher, count, setValuesTeacher }) => {
  // Local states for start and end times
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

  // Updates local states on component mount
  useEffect(() => {
    if (valuesTeacher.attention_schedule[count]) {
      setStartTime(valuesTeacher.attention_schedule[count].start);
      setEndTime(valuesTeacher.attention_schedule[count].end);
    }
  }, [valuesTeacher, count]);

  /**
   * Handles day change
   * @param {Object} e - Event object
   */
  const handleDayChange = (e) => {
    const newDay = e.target.value;
    const updatedSchedule = [...valuesTeacher.attention_schedule];
    updatedSchedule[count].day = newDay;
    setValuesTeacher({ ...valuesTeacher, attention_schedule: updatedSchedule });
  };

  /**
   * Handles start time change
   * @param {Object} e - Event object
   */
  const handleStartChange = (e) => {
    const newStart = e.target.value;
    setStartTime(newStart);
    const updatedSchedule = [...valuesTeacher.attention_schedule];
    updatedSchedule[count].start = newStart;
    setValuesTeacher({ ...valuesTeacher, attention_schedule: updatedSchedule });
  };

  /**
   * Handles end time change
   * @param {Object} e - Event object
   */
  const handleEndChange = (e) => {
    const newEnd = e.target.value;
    setEndTime(newEnd);
    const updatedSchedule = [...valuesTeacher.attention_schedule];
    updatedSchedule[count].end = newEnd;
    setValuesTeacher({ ...valuesTeacher, attention_schedule: updatedSchedule });
  };

  return (
    <div className="atention-schedule-container">
      <select
        className="form-select"
        onChange={handleDayChange}
        value={valuesTeacher.attention_schedule[count].day}
      >
        <option disabled value="">
          Día
        </option>
        {DAYS.map((day, index) => (
          <option key={index} value={day}>
            {day}
          </option>
        ))}
      </select>
      <input
        type="time"
        className="form-input-time"
        onChange={handleStartChange}
        value={startTime || ""}
        max={endTime || ""}
      />
      <input
        type="time"
        className="form-input-time"
        onChange={handleEndChange}
        value={endTime || ""}
        min={startTime || ""}
      />
    </div>
  );
};

export default AtentionSchedule;
