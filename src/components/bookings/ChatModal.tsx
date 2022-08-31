import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import styled from 'styled-components'
import closeModal from 'src/assets/images/common/closeModal.svg'
import { theme } from 'src/styles/Theme'
import dp from 'src/assets/images/profile/dp.svg'
import check from 'src/assets/images/bookings/check.svg'
import { Flex } from 'src/components/ui'

const Wrapper = styled.div`
  width: 100%;

  .text-box {
    font-size: 14px;
    line-height: 24px;
    padding: 10px;
    width: auto;
    max-width: 221px;
  }
  .gray-box {
    color: ${(props) => props.theme.colors.text_01};
    background-color: ${(props) => props.theme.colors.gray_04};
    border-radius: 0px 8px 8px 8px;
    margin-bottom: 8px;
  }
  .purple-box {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.purple};
    border-radius: 8px 8px 0px 8px;
  }
  img.person {
    width: 32px;
    height: 32px;
  }
  .time {
    color: ${(props) => props.theme.colors.text_02};
    font-size: 12px;
    line-height: 24px;
  }
`

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
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

export const ChatModal: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
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
            <Wrapper>
              <button onClick={handleClose} style={{ position: 'absolute', top: -15, right: -17 }}>
                <img src={closeModal} alt="" width={32} height="32px" />
              </button>
              <Flex direction="column">
                <div className="lhs">
                  <div className="gray-box text-box">Hello, are you available today?</div>
                  <Flex align="center" gap="8px">
                    <img src={dp} alt="person" className="person" />
                    <p className="time">09:30 PM</p>
                  </Flex>
                </div>
                <Flex align="flex-end" direction="column" gap="8px">
                  <div className="purple-box text-box">Yes I am available</div>
                  <Flex align="center" gap="8px">
                    <p className="time">09:30 PM</p>
                    <img src={dp} alt="person" className="person" />
                    <img src={check} alt="check" />
                  </Flex>
                </Flex>
                <Flex align="flex-end" direction="column" gap="8px">
                  <div className="purple-box text-box">
                    Lorem ipsum dolor sit amet, wdaconsectetur adipiscing elit. Velit at donec mi
                    diam leo sds
                  </div>
                  <Flex align="center" gap="8px">
                    <p className="time">09:30 PM</p>
                    <img src={dp} alt="person" className="person" />
                    <img src={check} alt="check" />
                  </Flex>
                </Flex>
                <div className="lhs">
                  <div className="gray-box text-box">
                    Lorem ipsum dolor sit amet , wdaconsectetur adipiscing elit. Velit at donec mi
                    diam leo sds
                  </div>
                  <Flex align="center" gap="8px">
                    <img src={dp} alt="person" className="person" />
                    <p className="time">09:30 PM</p>
                  </Flex>
                </div>
                <Flex align="flex-end" direction="column" gap="8px">
                  <div className="purple-box text-box">
                    Lorem ipsum dolor sit amet, wd onsectetur adipiscing elit.
                  </div>
                  <Flex align="center" gap="8px">
                    <p className="time">09:30 PM</p>
                    <img src={dp} alt="person" className="person" />
                    <img src={check} alt="check" />
                  </Flex>
                </Flex>
              </Flex>
            </Wrapper>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default ChatModal
