import TimeCard from './TimeCard'

// eslint-disable-next-line react/prop-types
const DateCard = ({ listInDate, date, modalValue, setModalValue }) => {
   return (
      <>
         <div className="date-card">
            <p>{date}</p>
            <hr className="divider" />
            {/* eslint-disable-next-line react/prop-types */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
               {/* eslint-disable-next-line react/prop-types */}
               {listInDate.map(task => {
                  return (
                     <TimeCard
                        key={task._id}
                        task={{ ...task, date }}
                        modalValue={modalValue}
                        setModalValue={setModalValue}
                     />
                  )
               })}
            </div>
         </div>
      </>
   )
}

export default DateCard
