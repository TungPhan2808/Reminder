import { Box, Typography, Modal, Button } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: 'none',
   borderRadius: '10px',
   boxShadow: 24,
   p: 4,
}

export const theme = createTheme({
   palette: {
      cancel: {
         main: 'var(--strong-grey)',
         contrastText: '#fff',
      },
      delete: {
         main: 'var(--red)',
         contrastText: '#fff',
      },
      create: {
         main: 'var(--green)',
         contrastText: '#fff',
      }
   },
})

// eslint-disable-next-line react/prop-types
const ConfirmModal = ({ handleClose, open, handleEvent }) => {
   return (
      <div>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box
               sx={style}
               style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <HighlightOffIcon
                  style={{
                     fontSize: '80px',
                     color: 'var(--red)',
                     marginBottom: '10px',
                  }}
               />
               <Typography id="modal-modal-title" variant="h5" component="h2">
                  Are you sure?
               </Typography>
               <div
                  style={{
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                     marginTop: '20px',
                  }}
               >
                  <ThemeProvider theme={theme}>
                     <Button
                        variant="contained"
                        color="cancel"
                        style={{ marginRight: '50px' }}
                        onClick={handleClose}
                     >
                        Cancel
                     </Button>
                     <Button variant="contained" color="delete" onClick={handleEvent}>
                        Delete
                     </Button>
                  </ThemeProvider>
               </div>
            </Box>
         </Modal>
      </div>
   )
}

export default ConfirmModal
