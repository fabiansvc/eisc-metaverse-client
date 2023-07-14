import "./stylesAtentionSchedule.css"

const AtentionSchedule = ({ valuesTeacher, setValuesTeacher, day }) => {

    return (
        <div className='form_atention_schedule'>
            <div className='atention_schedule'>
                <label className="LabelDay" htmlFor="LabelDay">
                    - {day}:
                </label>
                    <div>
                        <input
                            id="inputAtentionScheduleTeacher"
                            name='inputAtentionScheduleTeacher'
                            type="time"
                            onChange={e =>
                                setValuesTeacher({
                                    ...valuesTeacher, attention_schedule: {
                                        day: valuesTeacher.attention_schedule.day,
                                        start: e.target.value,
                                        end: '',
                                    }
                                })
                            }
                        />
                    </div>
                    <div>
                        <input
                            id="inputAtentionScheduleTeacher"
                            name='inputAtentionScheduleTeacher'
                            type="time"
                            onChange={e =>
                                setValuesTeacher({
                                    ...valuesTeacher, attention_schedule: {
                                        day: valuesTeacher.attention_schedule.day,
                                        start: valuesTeacher.attention_schedule.start,
                                        end: e.target.value,
                                    }
                                })
                            }
                        />
                    </div>
                </div>
            </div>
    )

}
export default AtentionSchedule;