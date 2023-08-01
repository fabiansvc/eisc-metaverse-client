import React, { useEffect } from 'react';
import './atention-schedule.css';

const AtentionSchedule = ({ valuesTeacher, count }) => {
    const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

    useEffect(() => {
        valuesTeacher.attention_schedule[count].key = count;
    }, [count]);

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

    return (
        <div className='atention-schedule-container'>
            <select
                className='form-select'
                onChange={handleDayChange}
            >
                <option value="" disabled defaultValue>
                    Día
                </option>
                {DAYS.map((day, index) => (
                    <option key={index} value={day}>
                        {day}
                    </option>
                ))}
            </select>
            <input
                className='form-input-time'
                type="time"
                required={true}
                onChange={handleStartChange}
            />
            <input
                className='form-input-time'
                type="time"
                required={true}
                onChange={handleEndChange}
            />
        </div>


    );
};

export default AtentionSchedule;
