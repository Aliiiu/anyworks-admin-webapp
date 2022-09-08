import * as React from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import styled from 'styled-components'
import { Flex, Button, ButtonClass } from 'src/components/ui'
import closeIcon from 'src/assets/images/common/closeIcon.svg'
import imagePreview from 'src/assets/images/modal/imagePreview.svg'
import attach from 'src/assets/images/modal/attach.svg'
import { theme } from 'src/styles/Theme'

const Wrapper = styled.div`
  .heading {
    background-color: ${(props) => props.theme.colors.gray_04};
    padding: 10px 20px;
    height: 56px;
    align-items: center;
    display: flex;
    border-radius: 8px 8px 0 0;

    img {
      padding: 8px;
      &:hover {
        cursor: pointer;
        background-color: ${(props) => props.theme.colors.lilac};
        transition: 0.3s;
        border-radius: 50%;
      }
    }

    p {
      font-weight: 700;
      font-size: 16px;
      line-height: 20px;
      color: ${(props) => props.theme.colors.text_01};
    }
  }

  .content {
    border-radius: 0 0 8px 8px;
    padding: 20px;
    .label {
      font-size: 14px;
      line-height: 20px;
      color: ${(props) => props.theme.colors.text_01};
      margin-bottom: 5px;
    }
    input,
    textarea {
      padding: 10px 14px;
      border: 1px solid ${(props) => props.theme.colors.text_02};
      color: ${(props) => props.theme.colors.text_01};
      font-size: 16px;
      line-height: 24px;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 8px;
      width: 100%;
      height: 44px;
      outline: none;
      &:focus {
        border: 1px solid ${(props) => props.theme.colors.purple};
      }
      &:disabled {
        background-color: ${(props) => props.theme.colors.gray_04};
      }
    }

    textarea {
      resize: none;
      height: 235px;
      background-color: ${(props) => props.theme.colors.white};
    }
    .button {
      padding: 8px 15px;
      background-color: ${(props) => props.theme.colors.gray_04};
      border-radius: 8px;
      img {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }
  }
`
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 532,
  maxWidth: '90%',
  bgcolor: theme.colors.white,
  borderRadius: '8px',
  boxShadow: 24,
  outline: 'none',
}

export const SendMailModal: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {
  return (
    <>
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
              <div className="heading">
                <Flex justify="space-between" align="center" style={{ width: '100%' }}>
                  <p>New email</p>
                  <img src={closeIcon} alt="x" onClick={handleClose} />
                </Flex>
              </div>
              <div className="content">
                <Flex direction="column">
                  <div className="to">
                    <p className="label">To:</p>
                    <input type="text" value="admin@gmail.com" disabled />
                  </div>
                  <div className="to">
                    <p className="label">Subject</p>
                    <input type="text" />
                  </div>
                  <div className="to">
                    <p className="label">Body</p>
                    <textarea />
                  </div>
                  <div className="button">
                    <Flex justify="space-between">
                      <Flex align="center">
                        <img src={attach} alt="attach" />
                        <img src={imagePreview} alt="imagePreview" />
                      </Flex>
                      <div>
                        <Button
                          classes={[ButtonClass.SOLID]}
                          style={{ backgroundColor: theme.colors.purple }}
                        >
                          <span>Send message</span>
                        </Button>
                      </div>
                    </Flex>
                  </div>
                </Flex>
              </div>
            </Wrapper>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default SendMailModal
