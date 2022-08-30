import {useState} from 'react'
import styled from 'styled-components'
import { DashboardLayout } from 'src/components/dashboard'
import { BookingStatusBg, InvoiceModal, ChatModal } from 'src/components/bookings'
import invoice from 'src/assets/images/bookings/invoice.svg'
import arrowRight from 'src/assets/images/common/arrowRight.svg'
import chat from 'src/assets/images/bookings/chat.svg'
import { theme } from 'src/styles/Theme'
import { Link } from 'react-router-dom'
import { Flex, Button, ButtonClass } from 'src/components/ui'
import avatar from 'src/assets/images/header/avatar.svg'

const BookingDetailsPageContainer = styled.div`
  .people {
    margin: 3rem 0 0 0;
  }

  .people-card {
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 16px;
    padding: 24px;
    width: 473px;
    max-width: 100%;
  }

  .lhs {
    img {
      width: 108px;
      height: 108px;
    }
    .info {
      color: ${(props) => props.theme.colors.text_01};
      .name {
        font-weight: 700;
        font-size: 20px;
        line-height: 32px;
      }
      .rating {
        font-size: 16px;
        margin-top: 2rem;
      }
      .value {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }

  .role {
    font-weight: 600;
    font-size: 18px;
    line-height: 30px;
    border-radius: 8px;
    padding: 8px 20px;
    background-color: ${(props) => props.theme.colors.gray_04};
    height: max-content;
  }

  .booking-status {
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 16px;
    padding: 24px;
    width: max-content;
    margin: 2rem 0;
    max-width: 100%;

    .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: ${(props) => props.theme.colors.text_01};
    }
  }

  .booking-details--info {
    background-color: ${(props) => props.theme.colors.white};
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 6rem;

    .gridy1 {
      display: grid;
      gap: 2%;
      grid-template-columns: 18% 40% 18% 18%;
      @media (max-width: ${(props) => props.theme.breakpoint.md}) {
			display: flex;
      flex-wrap: wrap;
      gap: 20px;
		}
    }
    .gridy2 {
      display: grid;
      gap: 2%;
      grid-template-columns: 18% 18% 40% 18%;
      @media (max-width: ${(props) => props.theme.breakpoint.md}) {
        grid-template-columns: 1fr 1fr;

		}
      @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
        display: flex;
      flex-wrap: wrap;
      gap: 20px;

		}
    }

    .item {
      font-size: 16px;
      line-height: 24px;
      color: ${(props) => props.theme.colors.text_01};
      .title {
        font-weight: 600;
      }
    }
  }
  .buttons {
    margin: 2rem 0;
  }
`

export const RhsHeading = () => (
  <Flex wrap="wrap">
    <Link to="/bookings">
      <Button
        classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
        style={{ backgroundColor: theme.colors.purple }}
      >
        {' '}
        <img src={arrowRight} alt="back" />
        <span>Back to Bookings</span>
      </Button>
    </Link>
  </Flex>
)

const BookingDetailsPage = () => {
  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);
  const handleOpenInvoiceModal = () => setOpenInvoiceModal(true);
  const handleCloseInvoiceModal = () => setOpenInvoiceModal(false);
 
  const [openChatModal, setOpenChatModal] = useState(false);
  const handleOpenChatModal = () => setOpenChatModal(true);
  const handleCloseChatModal = () => setOpenChatModal(false);
  return (
    <DashboardLayout pageTitle="Booking Details" rhsHeading={<RhsHeading />}>
      <BookingDetailsPageContainer>
        <div className="people">
          <Flex gap="2rem" wrap="wrap">
            <div className="user people-card">
              <Flex justify="space-between" wrap='wrap'>
                <div className="lhs">
                  <Flex >
                    <img src={avatar} alt="dp" />
                    <div className="info">
                      <p className="name">Olajide Olajide</p>
                      <div className="rating">
                        <Flex>
                          <p className="key">Rating</p>
                          <p className="value">4.5</p>
                        </Flex>
                      </div>
                    </div>
                  </Flex>
                </div>
                <p className="role">User</p>
              </Flex>
            </div>
            <div className="artisan people-card">
              <Flex justify="space-between" wrap='wrap'>
                <div className="lhs">
                  <Flex>
                    <img src={avatar} alt="dp" />
                    <div className="info">
                      <p className="name">Olajide Olajide</p>
                      <div className="rating">
                        <Flex>
                          <p className="key">Rating</p>
                          <p className="value">4.5</p>
                        </Flex>
                      </div>
                    </div>
                  </Flex>
                </div>
                <p className="role">Artisan</p>
              </Flex>
            </div>
          </Flex>
        </div>
        <div className="booking-status">
          <Flex align="center" gap="2rem">
            <p className="title">Booking Status</p>
            <BookingStatusBg status="Completed" />
          </Flex>
        </div>
        <div className="booking-details--info">
          <Flex direction="column" gap="2rem">
            <div className="gridy1">
              <div className="item">
                <Flex direction="column" gap="10px">
                  <p className="title">Service Rendered</p>
                  <p className="details">A/C Servicing</p>
                </Flex>
              </div>
              <div className="item">
                <Flex direction="column" gap="10px">
                  <p className="title">Description</p>
                  <p className="details">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar mauris
                    ultricies aliquam sit tortor congue sed eget. Tortor gravida fringilla metus
                    lacus porttitor.
                  </p>
                </Flex>
              </div>
              <div className="item">
                <Flex direction="column" gap="10px">
                  <p className="title">Time</p>
                  <p className="details">12:30pm</p>
                </Flex>
              </div>
              <div className="item">
                <Flex direction="column" gap="10px">
                  <p className="title">Date </p>
                  <p className="details">18/05/1990</p>
                </Flex>
              </div>
            </div>
            <div className="gridy2">
              <div className="item">
                <Flex direction="column" gap="10px">
                  <p className="title">Artisan Location </p>
                  <p className="details">14, Olabode Street, Old Bodija, Lagos.</p>
                </Flex>
              </div>
              <div className="item">
                <Flex direction="column" gap="10px">
                  <p className="title">User Location </p>
                  <p className="details">14, Olabode Street, Old Bodija, Lagos.</p>
                </Flex>
              </div>
            </div>
          </Flex>
          <InvoiceModal open={openInvoiceModal} handleClose={handleCloseInvoiceModal} />
          <ChatModal open={openChatModal} handleClose={handleCloseChatModal} />
          <div className="buttons">
            <Flex gap="1.5rem" wrap='wrap'>
              <div>
                <Button
                  classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
                  onClick={handleOpenInvoiceModal}
                  style={{ backgroundColor: theme.colors.purple }}
                >
                  {' '}
                  <img src={invoice} alt="paper" />
                  <span>View Booking Invoice</span>
                </Button>
              </div>
              <div>
                <Button
                  classes={[ButtonClass.SOLID, ButtonClass.WITH_ICON]}
                  style={{ backgroundColor: theme.colors.purple }}
                  onClick={handleOpenChatModal}
                >
                  {' '}
                  <img src={chat} alt="chat" />
                  <span>View Chat</span>
                </Button>
              </div>
            </Flex>
          </div>
        </div>
      </BookingDetailsPageContainer>
    </DashboardLayout>
  )
}

export default BookingDetailsPage
