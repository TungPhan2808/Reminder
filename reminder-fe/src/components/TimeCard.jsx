/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
   Card,
   CardContent,
   Typography,
   Switch,
   IconButton,
} from '@mui/material'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { alpha, styled } from '@mui/material/styles'
import { purple, green } from '@mui/material/colors'
import ClearIcon from '@mui/icons-material/Clear'
import EditIcon from '@mui/icons-material/Edit'
import UpdateModal from './UpdateModal'
import ConfirmModal from './ConfirmModal'
import moment from 'moment'
import { useStore } from '../store/useStore'
import { http } from '../utils/http'
import { useCompletedTask } from '../hooks/useCompletedTask'
import { enqueueSnackbar } from 'notistack'

const RemindSwitch = styled(Switch)(({ theme }) => ({
   '& .MuiSwitch-switchBase.Mui-checked': {
      color: purple[400],
      '&:hover': {
         backgroundColor: alpha(purple[600], theme.palette.action.hoverOpacity),
      },
   },
   '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: purple[600],
   },
}))

const CompletedSwitch = styled(Switch)(({ theme }) => ({
   '& .MuiSwitch-switchBase.Mui-checked': {
      color: green[400],
      '&:hover': {
         backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
   },
   '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: green[600],
   },
}))

const BootstrapTooltip = styled(({ className, ...props }) => (
   <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
   [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
   },
   [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      width: '170px',
   },
}))

const TimeCard = ({ task }) => {
   const { _id, todo, isRemind, completed, time, date } = task
   const [completedChecked, setCompletedChecked] = useState(completed)
   const [remindChecked, setRemindChecked] = useState(isRemind)
   const [openUpdateModal, setOpenUpdateModal] = useState(false)
   const [openConfirmModal, setOpenConfirmModal] = useState(false)
   const [todoModalUpdate, setTodoModalUpdate] = useState({
      title: todo,
      time,
      date,
   })
   const fetchTasks = useStore()[2]
   const completedTask = useCompletedTask()

   const handleOpenUpdateModal = () => {
      setOpenUpdateModal(true)
      console.log(todoModalUpdate)
   }
   const handleCloseUpdateModal = () => {
      setOpenUpdateModal(false)
      setTodoModalUpdate({
         title: todo,
         time,
         date,
      })
   }

   const handleOpenConfirmModal = () => setOpenConfirmModal(true)
   const handleCloseConfirmModal = () => setOpenConfirmModal(false)

   const handleChangeRemind = async e => {
      setRemindChecked(e.target.checked)
      const response = await http(`/tasks/${_id}`, 'PATCH', {
         data: { isRemind: e.target.checked },
      })
      console.log(response)
   }

   const handleChangeCompleted = async e => {
      setCompletedChecked(e.target.checked)
      const response = await http(`/tasks/${_id}`, 'PATCH', {
         data: { completed: e.target.checked },
      })
      console.log(response)
      fetchTasks(completedTask)
      enqueueSnackbar('Task completed!', { variant: 'success' })
   }

   const handleUpdateEvent = async () => {
      const { title, time, date } = todoModalUpdate
      try {
         const bodyRequest = {
            todo: title,
            time: `${
               moment(date, 'yyyy-MM-DD', true).isValid()
                  ? date
                  : moment(date, 'DD-MM-YYYY').format('yyyy-MM-DD')
            } ${time}`,
         }
         if (!title || !time) {
            console.log('Invalid input')
         }
         console.log(bodyRequest)
         const response = await http(`/tasks/${_id}`, 'PATCH', {
            data: bodyRequest,
         })
         console.log(response.data)
         if (response.status == 200) {
            fetchTasks(completedTask)
         }
         handleCloseUpdateModal()
         enqueueSnackbar('Task updated!', { variant: 'success' })
      } catch (error) {
         console.log(error)
         enqueueSnackbar('Something error, try again!', { variant: 'error' })
      }
   }

   const handleDeleteEvent = async () => {
      try {
         const response = await http(`/tasks/${_id}`, 'DELETE')
         if (response.status == 200) {
            fetchTasks(completedTask)
         }
         handleCloseConfirmModal()
         enqueueSnackbar('Task deleted!', { variant: 'success' })
      } catch (error) {
         console.log(error)
         enqueueSnackbar('Something error, try again!', { variant: 'error' })
      }
   }

   return (
      <>
         <Card className="time-card">
            <CardContent sx={{ paddingTop: '10px' }}>
               <div
                  className="w-100"
                  style={{
                     display: 'flex',
                     justifyContent: 'end',
                     marginBottom: '10px',
                  }}
               >
                  <Tooltip title="Edit">
                     <IconButton onClick={handleOpenUpdateModal}>
                        <EditIcon sx={{ fontSize: '20px' }} />
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                     <IconButton onClick={handleOpenConfirmModal}>
                        <ClearIcon sx={{ fontSize: '20px' }} />
                     </IconButton>
                  </Tooltip>
               </div>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     marginBottom: '10px',
                  }}
               >
                  <div className="time-content-card">
                     <p>{time}</p>
                     <span
                        style={{
                           fontSize: '13px',
                           fontWeight: 'normal',
                           paddingLeft: '5px',
                        }}
                     >
                        {moment(time, 'HH:mm:ss').format('A')}
                     </span>
                  </div>
               </div>
               <hr className="divider" />
               <BootstrapTooltip title={todo}>
                  <div className="title-content-card">
                     <Typography variant="body2">{todo}</Typography>
                  </div>
               </BootstrapTooltip>
               <div
                  style={{
                     fontSize: '12px',
                     width: '100%',
                     display: 'flex',
                     marginTop: '10px',
                     color: 'grey',
                  }}
               >
                  <div
                     style={{
                        flexDirection: 'column',
                        display: 'flex',
                        width: '50%',
                        alignItems: 'center',
                     }}
                  >
                     <RemindSwitch
                        checked={remindChecked}
                        size="small"
                        onChange={handleChangeRemind}
                     />
                     <span>Remind</span>
                  </div>
                  <div
                     style={{
                        flexDirection: 'column',
                        display: 'flex',
                        width: '50%',
                        alignItems: 'center',
                     }}
                  >
                     <CompletedSwitch
                        checked={completedChecked}
                        size="small"
                        onChange={handleChangeCompleted}
                     />
                     <span>Completed</span>
                  </div>
               </div>
            </CardContent>
         </Card>

         <UpdateModal
            input={todo}
            handleClose={handleCloseUpdateModal}
            open={openUpdateModal}
            action={'update'}
            modalValue={todoModalUpdate}
            setModalValue={setTodoModalUpdate}
            handleEvent={handleUpdateEvent}
         />

         <ConfirmModal
            handleEvent={handleDeleteEvent}
            handleClose={handleCloseConfirmModal}
            open={openConfirmModal}
         />
      </>
   )
}
export default TimeCard
