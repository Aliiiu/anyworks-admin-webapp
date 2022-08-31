import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import styled from 'styled-components'
import closeModal from 'src/assets/images/common/closeModal.svg'
import { theme } from 'src/styles/Theme'
import { Flex, Button, ButtonClass, Table } from 'src/components/ui'
import { INVOICE_TABLE_DATA } from 'src/constants'

const Wrapper = styled.div`
    width: 100%;

  .heading {
    margin-bottom: 1rem;
    padding: 0 20px;

    h3 {
      font-weight: 600;
      font-size: 24px;
      line-height: 32px;
      color: ${(props) => props.theme.colors.black};
    }
  }
`

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 841,
  maxWidth: '90%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  bgcolor: theme.colors.white,
  borderRadius: '8px',
  boxShadow: 24,
  outline:'none',
  p: '10px 0',
}

export const InvoiceModal: React.FC<{ open: boolean; handleClose: () => void }> = ({
  open,
  handleClose,
}) => {

const InvoiceTableHeaders = [

    { title: 'Amount', render: (row: any) => `${row.amount}` },
    { title: 'Status', render: (row: any) => `${row.status}` },
        { title: 'Narration', render: (row: any) => `${row.narration}` },

  ]
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
              <button onClick={handleClose} style={{ position: 'absolute', top: -13, right: -10 }}>
                <img src={closeModal} alt="" width={32} height="32px" />
              </button>
              <div className="heading">
                <Flex justify="space-between" align='center'>
                  <h3>Invoice</h3>
                  <div>
                    <Button
                      classes={[ButtonClass.SOLID]}
                      style={{ backgroundColor: theme.colors.purple, height: '37px',
                      padding: '0 22px' }}
                    >
                      {' '}
                      <span>Print Invoice</span>
                    </Button>
                  </div>
                </Flex>
              </div>
              <Table
        rows={INVOICE_TABLE_DATA()}
        headers={InvoiceTableHeaders}
        showHead={true}
      />
            </Wrapper>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default InvoiceModal
