import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { Button, ButtonClass, Flex } from 'src/components/ui'
import { theme } from 'src/styles/Theme'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 532,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: '60px',
}

const ConfirmApproveKycModal: React.FC<{
  open: boolean
  handleClose: () => void
  handleApproveKyc: () => void
  artisanName: string
  approvingKyc: any
}> = ({ open, handleClose, handleApproveKyc, artisanName, approvingKyc }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-description" variant="h5" gutterBottom>
              Are you sure you want to approve {artisanName}'s KYC?
            </Typography>
            <br />
            <Flex>
              <div>
                <Button
                  onClick={handleApproveKyc}
                  loading={approvingKyc}
                  classes={[ButtonClass.SOLID]}
                  style={{
                    backgroundColor: theme.colors.purple,
                    height: '37px',
                    width: '136px',
                    fontWeight: '300',
                    justifyContent: 'center',
                  }}
                >
                  Yes
                </Button>
              </div>
              <div>
                <Button
                  onClick={handleClose}
                  classes={[ButtonClass.SOLID]}
                  style={{
                    color: theme.colors.purple,
                    backgroundColor: 'rgba(126, 0, 196, 0.2)',
                    height: '37px',
                    width: '136px',
                    fontWeight: '300',
                    justifyContent: 'center',
                  }}
                >
                  No
                </Button>
              </div>
            </Flex>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ConfirmApproveKycModal
