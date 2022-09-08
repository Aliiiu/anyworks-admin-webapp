import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { Button, ButtonClass } from 'src/components/ui'
import { theme } from 'src/styles/Theme'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  maxWidth: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: theme.colors.white,
  borderRadius: '8px',
  boxShadow: 24,
  outline: 'none',
  p: '20px',
}

export const DateRangeFilter = ({ open, handleClose, state, setState }) => {
  const resetDateFilter = () => {
    setState([
      {
        startDate: new Date('2020-01-01'),
        endDate: addDays(new Date(), 0),
        key: 'selection',
        color: theme.colors.darkPurple,
      },
    ])
  }
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
            <DateRangePicker
              onChange={(item) => {
                setState([item.selection])
              }}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={state}
              direction="horizontal"
              preventSnapRefocus={true}
              calendarFocus="forwards"
            />
            <br />
            <Button
              onClick={resetDateFilter}
              classes={[ButtonClass.SOLID]}
              style={{ backgroundColor: theme.colors.purple, height: '48px' }}
            >
              Reset Date Filter
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default DateRangeFilter
