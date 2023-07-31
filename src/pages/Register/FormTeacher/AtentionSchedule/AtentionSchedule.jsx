import React, { useState } from 'react';
import './atention-schedule.css';

const AtentionSchedule = ({ children }) => {
    const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

    const [atentionSchedule, setAtentionSchedule] = useState({
        day: '',
        start: '',
        end: ''
    });

    const handleStartChange = (e) => {
        const newStart = e.target.value || '';
        setAtentionSchedule((prevState) => ({
            ...prevState,
            start: newStart
        }));
    };

    const handleEndChange = (e) => {
        const newEnd = e.target.value || '';
        setAtentionSchedule((prevState) => ({
            ...prevState,
            end: newEnd
        }));
    };

    return (
        <div className='atention-schedule-container'>
            <select
                className='form-select'
                value={atentionSchedule.day}
                onChange={(e) =>
                    setAtentionSchedule({ ...atentionSchedule, day: e.target.value })
                }
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
                value={atentionSchedule.start}
                onChange={handleStartChange}
            />
            <input
                className='form-input-time'
                type="time"
                required={true}
                value={atentionSchedule.end}
                onChange={handleEndChange}
            />
            {children}
        </div>


    );
};

export default AtentionSchedule;
