import './atention-schedule.css';
import React, { useEffect, useRef } from 'react';

const AtentionSchedule = ({ valuesTeacher, count}) => {
    const inputStartRef = useRef(null);
    const inputEndRef = useRef(null);
    const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]

    const handleDayChange = (e) => {
        const newDay = e.target.value;
        valuesTeacher.attention_schedule[count].day = newDay;
    };

    const handleStartChange = (e) => {
        const newStart = e.target.value;
        valuesTeacher.attention_schedule[count].start = newStart;
    };

    const handleEndChange = (e) => {
        const newEnd = e.target.value;
        valuesTeacher.attention_schedule[count].end = newEnd;
    };

    useEffect(() => {
        inputStartRef.current.value = valuesTeacher.attention_schedule[count].start;
        inputEndRef.current.value = valuesTeacher.attention_schedule[count].end;
    }, []);

    return (
        <div className='atention-schedule-container'>
            <select
                className='form-select'
                onChange={handleDayChange}
                defaultValue={valuesTeacher.attention_schedule[count].day }
                required
            >
                <option disabled value=''>Día</option>
                {DAYS.map((day, index) => (
                    <option key={index} value={day}>
                        {day}
                    </option>
                ))}
            </select>
            <input
                ref={inputStartRef}
                type="time"
                className='form-input-time'
                onChange={handleStartChange}
            />
            <input
                ref={inputEndRef}
                type="time"
                className='form-input-time'
                onChange={handleEndChange}
            />
        </div>
    );
};

export default AtentionSchedule;
