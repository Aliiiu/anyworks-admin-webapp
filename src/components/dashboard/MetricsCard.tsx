import React from 'react'
import styled from 'styled-components'
import { Flex } from 'src/components/ui'
// import { URLS } from 'src/constants'
import arrow from 'src/assets/images/common/arrow.svg'

const MetricsCardContainer = styled.header`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  padding: 16px 20px;
  max-width: 316px;
  width: 316px;
  .metric__img {
    border-radius: 8px;
    padding: 20px;
    background-color: ${(props) => props.theme.colors.gray_01};
    width: 72px;
    height: 72pxA;
  }
  .metric__count {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: ${(props) => props.theme.colors.text_01};
  }
  .metric__key {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    color: ${(props) => props.theme.colors.text_01};
  }
`

interface Props {
  // 👇️ key      value
  metric: any
}

export const MetricsCard = ({ metric }: Props) => {
  return (
    <MetricsCardContainer>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <img className="metric__img" src={metric.img} alt="user" />
          <div className="text">
            <p className="metric__count">{metric.count}</p>
            <p className="metric__key">{metric.key}</p>
          </div>
        </Flex>

        <img src={arrow} alt="user" />
      </Flex>
    </MetricsCardContainer>
  )
}

export default MetricsCard
