/* eslint-disable react/prop-types */
import {
   Backdrop,
   Box,
   Modal,
   Fade,
   Button,
   Typography,
   TextField,
} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker'
import moment from 'moment'
import dayjs from 'dayjs'
import { styleModal as style } from '../store/constants'

// eslint-disable-next-line react/prop-types
const UpdateModal = ({
   open,
   handleClose,
   action,
   modalValue,
   setModalValue,
   handleEvent,
}) => {
   const handleChangeCreate = value => {
      setModalValue(prev => {
         return {
            ...prev,
            time: moment(value.$d).format('yyyy-MM-DD HH:mm:ss'),
         }
      })
   }
   const handleChangeUpdate = value => {
      setModalValue(prev => {
         return {
            ...prev,
            time: moment(value.$d).format('HH:mm:ss'),
            date: moment(value.$d).format('DD-MM-yyyy'),
         }
      })
   }

   console.log(modalValue.date)
   console.log(modalValue.time)
   const defaultProps = {
      disablePast: true,
      orientation: 'landscape',
      // value: dayjs(`${modalValue.date} ${modalValue.time}`, 'DD-MM-YYYY HH:mm'),
      value:
         modalValue.date && modalValue.time
            ? dayjs(`${modalValue.date} ${modalValue.time}`, 'DD-MM-YYYY HH:mm')
            : null,
      onChange: action === 'update' ? handleChangeUpdate : handleChangeCreate,
   }

   console.log(defaultProps)

   return (
      <>
         <div>
            <Modal
               aria-labelledby="transition-modal-title"
               aria-describedby="transition-modal-description"
               open={open}
               onClose={handleClose}
               closeAfterTransition
               slots={{ backdrop: Backdrop }}
               slotProps={{
                  backdrop: {
                     timeout: 500,
                  },
               }}
            >
               <Fade in={open}>
                  <Box sx={style}>
                     <Typography
                        id="transition-modal-title"
                        variant="h6"
                        component="h2"
                     >
                        <div
                           style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              color: '#1976d2',
                           }}
                        >
                           {action == 'create' ? 'New Event' : 'Update Event'}
                        </div>
                     </Typography>
                     <div style={{ marginTop: '20px' }}>
                        <TextField
                           id="title"
                           label="Event"
                           variant="outlined"
                           size="small"
                           fullWidth
                           sx={{ marginBottom: '20px' }}
                           defaultValue={modalValue?.title}
                           onChange={e =>
                              setModalValue({
                                 ...modalValue,
                                 title: e.target.value,
                              })
                           }
                        />
                        <div className="date-time-picker">
                           <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <StaticDateTimePicker {...defaultProps} />
                           </LocalizationProvider>
                        </div>
                     </div>
                     <div
                        style={{
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           paddingTop: '20px',
                        }}
                     >
                        <Button variant="contained" onClick={handleEvent}>
                           {action == 'create' ? 'Create' : 'Update'}
                        </Button>
                     </div>
                  </Box>
               </Fade>
            </Modal>
         </div>
      </>
   )
}
export default UpdateModal
