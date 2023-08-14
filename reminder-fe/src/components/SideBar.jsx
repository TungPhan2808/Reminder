/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import AddIcon from '@mui/icons-material/Add'
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice'
import {
   TextField,
   InputAdornment,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   IconButton,
   Avatar,
   Button,
   Modal,
   Backdrop,
   Fade,
   Box,
   Typography,
   CircularProgress,
} from '@mui/material'
import { useState, memo } from 'react'
import { styled } from '@mui/material/styles'
import UpdateModal from './UpdateModal'
import { signOutGoogle } from '../services/firebase'
import { http } from '../utils/http'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { useCompletedTask } from '../hooks/useCompletedTask'
import { styleModal as style } from '../store/constants'
import SpeechRecognition, {
   useSpeechRecognition,
} from 'react-speech-recognition'
import { enqueueSnackbar } from 'notistack'
import { theme } from './ConfirmModal'
import { ThemeProvider } from '@mui/material/styles'

const CssTextField = styled(TextField)({
   '& label.Mui-focused': {
      color: '#A0AAB4',
   },
   '& .MuiInput-underline:after': {
      borderBottomColor: '#B2BAC2',
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: '#E0E3E7',
      },

      '&:hover fieldset': {
         borderColor: '#B2BAC2',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#6F7E8C',
      },
   },
})

const menus = [
   {
      value: 'Todo',
      icon: SummarizeOutlinedIcon,
      bgcolor: 'var(--light-purple)',
      color: 'var(--purple)',
      iconColor: 'var(--purple)',
   },
   {
      value: 'Completed',
      icon: CheckCircleOutlineIcon,
      bgcolor: 'var(--light-green)',
      color: 'var(--green)',
      iconColor: 'var(--green)',
   },
]

const SideBar = () => {
   const state = useStore()[0]
   const fetchTasks = useStore()[2]
   const statusCompleted = useCompletedTask()
   const navigate = useNavigate()
   const [todoModalCreate, setTodoModalCreate] = useState({
      title: '',
   })
   const [open, setOpen] = useState(false)
   const [openModalVoice, setOpenModalVoice] = useState(false)
   const [openBackdrop, setOpenBackdrop] = useState(false)

   const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition,
   } = useSpeechRecognition()

   const handleOpen = () => {
      setOpen(true)
   }

   const handleClose = () => {
      setTodoModalCreate({
         title: '',
      })
      setOpen(false)
   }

   const handleOpenModalVoice = () => {
      if (!browserSupportsSpeechRecognition) {
         enqueueSnackbar('Browser does not support speech recognition', {
            variant: 'error',
         })
         return
      }
      setOpenModalVoice(true)
      // setOpenBackdrop(true)
      SpeechRecognition.startListening()
   }

   const handleCloseModalVoice = () => {
      SpeechRecognition.stopListening()
      resetTranscript()
      setOpenModalVoice(false)
   }

   const handleLogout = async () => {
      try {
         await signOutGoogle()
         const response = await http('/auth/logout', 'GET')
         console.log(response)
         enqueueSnackbar('Logout success', { variant: 'success' })
         navigate('/login', { replace: true })
      } catch (error) {
         console.log(error)
      }
   }

   const handleClickMenu = value => {
      if (value === 'Todo') {
         navigate('/')
      }
      if (value === 'Completed') {
         navigate('/completed')
      }
   }

   const handleCreateEvent = async () => {
      const { title, time } = todoModalCreate
      try {
         const bodyRequest = {
            user_id: state.user._id,
            todo: title,
            time,
         }
         console.log(bodyRequest)
         if (!title || !time) {
            console.log(`invalid input`)
            return
         }
         const response = await http('/tasks', 'POST', { data: bodyRequest })
         console.log(response)
         if (response.status === 201) {
            fetchTasks(statusCompleted)
         }
         handleClose()
         enqueueSnackbar('Create success', { variant: 'success' })
      } catch (error) {
         enqueueSnackbar('Something error, try again!', { variant: 'error' })
      }
   }

   const handleCreateEventByVoice = async () => {
      setOpenBackdrop(true)
      try {
         const bodyRequest = {
            receivedText: transcript,
         }
         console.log(bodyRequest)
         if (!transcript) {
            enqueueSnackbar('Record again', { variant: 'warning' })
            setOpenBackdrop(false)
            return
         }
         const response = await http('/voice', 'POST', { data: bodyRequest })
         console.log(response)
         if (response.status === 201) {
            fetchTasks(statusCompleted)
         }
         setOpenBackdrop(false)
         handleCloseModalVoice()
         enqueueSnackbar('Create success', { variant: 'success' })
      } catch (error) {
         console.log(error)
         setOpenBackdrop(false)
         enqueueSnackbar('Something error, try again!', { variant: 'error' })
      }
   }
   const handleTryAgain = () => {
      SpeechRecognition.stopListening()
      resetTranscript()
      SpeechRecognition.startListening({ continuous: true })
   }
   return (
      <>
         <div className="navbar-container">
            <div
               className="navbar-header"
               style={{
                  display: 'flex',
                  marginBottom: '20px',
                  alignItems: 'center',
               }}
            >
               <Avatar
                  alt="Remy Sharp"
                  src={state?.user?.picture}
                  sx={{ width: 50, height: 50 }}
               />
               <div style={{ paddingLeft: '10px', paddingTop: '8px' }}>
                  <p style={{ fontSize: '18px', fontWeight: 'bold' }}>
                     {state?.user?.name}
                  </p>

                  <Button
                     variant="outlined"
                     color="error"
                     style={{
                        textTransform: 'capitalize',
                        fontSize: '9px',
                        padding: '0px',
                        marginTop: '4px',
                     }}
                     onClick={handleLogout}
                  >
                     Logout
                  </Button>
               </div>
            </div>

            <div
               style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
               }}
            >
               <CssTextField
                  style={{ backgroundColor: 'white' }}
                  placeholder="New Event"
                  size="small"
                  onChange={e =>
                     setTodoModalCreate(prev => {
                        return {
                           ...prev,
                           title: e.target.value,
                        }
                     })
                  }
                  value={todoModalCreate.title}
                  InputProps={{
                     startAdornment: (
                        <InputAdornment position="start">
                           <IconButton onClick={handleOpen}>
                              <AddIcon />
                           </IconButton>
                        </InputAdornment>
                     ),
                  }}
               />
               <IconButton aria-label="delete" onClick={handleOpenModalVoice}>
                  <KeyboardVoiceIcon />
               </IconButton>
            </div>

            <nav aria-label="main mailbox folders">
               <List>
                  {menus.map(menu => {
                     const IconComponent = menu.icon

                     return (
                        <ListItem
                           key={menu.value}
                           disablePadding
                           sx={{
                              '& .MuiListItemButton-root': {
                                 transition: 'all .3s linear',
                                 '&:hover': {
                                    bgcolor: `${menu.bgcolor}`,
                                    '&, & .MuiListItemIcon-root': {
                                       color: `${menu.color}`,
                                    },
                                 },
                              },
                           }}
                        >
                           <ListItemButton
                              style={{ borderRadius: '12px' }}
                              onClick={() => handleClickMenu(menu.value)}
                           >
                              <ListItemIcon>
                                 <IconComponent
                                    sx={{
                                       color: `${menu.color}`,
                                       fontSize: '25px',
                                    }}
                                 />
                              </ListItemIcon>
                              <ListItemText primary={menu.value} />
                           </ListItemButton>
                        </ListItem>
                     )
                  })}
               </List>
            </nav>
         </div>
         <UpdateModal
            handleClose={handleClose}
            open={open}
            action={'create'}
            modalValue={todoModalCreate}
            setModalValue={setTodoModalCreate}
            handleEvent={handleCreateEvent}
         />

         <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModalVoice}
            onClose={handleCloseModalVoice}
            slots={{ backdrop: Backdrop }}
            closeAfterTransition
            slotProps={{
               backdrop: {
                  timeout: 500,
               },
            }}
         >
            <Fade in={openModalVoice}>
               <Box sx={style}>
                  <div className="stage">
                     {listening && (
                        <div>
                           <div className="dot-pulse"></div>
                           <div style={{ marginTop: '10px' }}>
                              I am listening
                           </div>
                        </div>
                     )}

                     <Typography
                        component={'h3'}
                        sx={{ width: '70%' }}
                        style={{
                           textAlign: 'center',
                           marginTop: '20px',
                           fontStyle: 'italic',
                        }}
                     >
                        {transcript}
                     </Typography>
                  </div>
                  <div
                     style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        marginTop: '20px',
                        paddingLeft: '50px',
                        paddingRight: '50px',
                     }}
                  >
                     <ThemeProvider theme={theme}>
                        <Button
                           variant="contained"
                           color="delete"
                           onClick={handleTryAgain}
                           style={{ marginRight: '10px' }}
                        >
                           Try again
                        </Button>
                        <Button
                           variant="contained"
                           onClick={handleCreateEventByVoice}
                           color="create"
                        >
                           Create
                        </Button>
                        {openBackdrop && (
                           <CircularProgress
                              color="inherit"
                              style={{ marginLeft: '10px' }}
                              size={20}
                           />
                        )}
                     </ThemeProvider>
                  </div>
               </Box>
            </Fade>
         </Modal>
      </>
   )
}

export default memo(SideBar)
