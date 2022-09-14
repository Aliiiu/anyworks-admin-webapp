import { profileData } from 'src/constants/profileData'
import { Input } from 'src/styles/commonStyle'
import styled from 'styled-components'
import { formatDateYmd } from 'src/utils/helpers'

const ProfileContainer = styled.div`
  padding: 40px;
  background: #ffffff;
  width: 100%;
  margin-top: 36px;
  border-radius: 16px;
  h3 {
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 32px;
  }
  .input_wrapper {
    display: grid;
    grid: auto / auto auto;
    gap: 20px;
  }
  .input_container {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 15px;
    width: 100%;
  }
`

interface Props {
  artisanKyc: any
}

const KycProfileInfo = ({ artisanKyc }: Props) => {
  console.log(artisanKyc)
  return (
    <ProfileContainer>
      <h3>Profile Information</h3>
      <img src="/images/profilePics.png" alt="" width={153} height="153px" />
      <div className="input_wrapper">
        {profileData.map((item, id) => (
          <div key={id} className="input_container">
            <label htmlFor={item.for}>{item.label}</label>
            <Input
              placeholder={item.placeholder}
              type={item.type}
              style={{ background: '#F2F4F7' }}
              value={
                item.for === 'dob'
                  ? formatDateYmd(artisanKyc?.kyc?.identity_resolved_value[`${item.for}`])
                  : artisanKyc?.kyc?.identity_resolved_value[`${item.for}`]
              }
            />
          </div>
        ))}
      </div>
    </ProfileContainer>
  )
}

export default KycProfileInfo
