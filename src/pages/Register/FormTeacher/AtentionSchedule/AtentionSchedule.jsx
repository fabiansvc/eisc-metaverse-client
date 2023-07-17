import React, { useState } from 'react';
import './atention-schedule.css';

const AtentionSchedule = ({ valuesTeacher, setValuesTeacher }) => {
    const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

    const [atentionSchedule, setAtentionSchedule] = useState({
        day: '',
        start: '',
        end: ''
    });

    const handleStartChange = (e) => {
        const newStart = e.target.value;
        setAtentionSchedule({
            ...atentionSchedule,
            start: newStart
        });
    };

    const handleEndChange = (e) => {
        const newEnd = e.target.value;
        setAtentionSchedule({
            ...atentionSchedule,
            end: newEnd
        });
    };

    return (
            <div className="atention-schedule">
                <select
                    className='select-day'
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
                {atentionSchedule.day !== "" && (
                    <>
                        <input
                            className='input-time'
                            type="time"
                            required={true}
                            value={atentionSchedule.start}
                            onChange={handleStartChange}
                        />
                        <input
                            className='input-time'
                            type="time"
                            required={true}
                            value={atentionSchedule.end}
                            onChange={handleEndChange}
                        />
                    </>
                )}
            </div>
    );
};

export default AtentionSchedule;
