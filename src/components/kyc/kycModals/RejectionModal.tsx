import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'
import { Button, ButtonClass } from 'src/components/ui'
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

const RejectionModal: React.FC<{
  open: boolean
  handleClose: () => void
  handleRejectKyc: () => void
  setRejectionReason: any
  rejectionReason: string
  rejectingKyc: any
}> = ({
  open,
  handleClose,
  handleRejectKyc,
  rejectionReason,
  setRejectionReason,
  rejectingKyc,
}) => {
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
            <img src="/svgs/rejectIcon.svg" alt="" width="100px" height="100px" />
            <Typography
              id="transition-modal-title"
              variant="h3"
              sx={{ marginTop: '24px' }}
              gutterBottom
            >
              Verification Rejected
            </Typography>
            <textarea
              rows={6}
              cols={50}
              style={{
                resize: 'none',
                fontSize: 16,
                fontFamily: 'Raleway',
                borderRadius: 8,
                boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
                border: '1px solid #98A2B3',
                width: '100%',
                padding: '10px 14px',
              }}
              placeholder="Kindly state your reason(s) for the rejection"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            ></textarea>
            <br />

            <div style={{ width: '100%' }}>
              <Button
                onClick={handleRejectKyc}
                loading={rejectingKyc}
                classes={[ButtonClass.SOLID]}
                style={{
                  width: '100%',
                  backgroundColor: theme.colors.red,
                  height: '37px',
                  fontWeight: '100',
                  justifyContent: 'center',
                }}
              >
                Reject
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default RejectionModal
