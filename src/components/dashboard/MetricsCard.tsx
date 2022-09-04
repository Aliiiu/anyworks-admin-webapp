import React from 'react'
import styled from 'styled-components'
import { Flex } from 'src/components/ui'
import arrow from 'src/assets/images/common/arrow.svg'

const MetricsCardContainer = styled.a`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  padding: 16px 20px;
  max-width: 316px;
  width: 316px;
  &:hover {
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%),
      0px 1px 3px 0px rgb(0 0 0 / 12%);
    transition: 0.5s;
  }
  .metric__img {
    border-radius: 8px;
    padding: 20px;
    width: 62px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 27px;
      height: 27px;
      filter: brightness(0) saturate(100%) invert(99%) sepia(60%) saturate(296%) hue-rotate(187deg)
        brightness(116%) contrast(100%);
    }
  }
  .metric__count {
    font-weight: 700;
    font-size: 22px;
    line-height: 32px;
    color: ${(props) => props.theme.colors.text_01};
  }
  .metric__key {
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    color: ${(props) => props.theme.colors.text_01};
  }
`

interface Props {
  metric: any
  href?: string
}

export const MetricsCard = ({ metric, href }: Props) => {
  return (
    <MetricsCardContainer href={href}>
      <Flex align="center" justify="space-between">
        <Flex align="center">
          <div className="metric__img" style={{ backgroundColor: `${metric.color}` }}>
            <img src={metric.img} alt="user" />
          </div>
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
