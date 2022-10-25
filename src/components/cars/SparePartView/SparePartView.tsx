import { Fragment } from 'react'

import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'

import { Button } from 'ui'

import { UnitDetailUnit } from 'types/catalogs'

import * as S from './SparePartView.styled'

import MinusIcon from 'public/icons/minus-1.svg'
import PlusIcon from 'public/icons/plus-3.svg'
import TriangleIcon from 'public/icons/triangle.svg'

interface SparePartViewProps {
  img: string
  units: UnitDetailUnit[]
}

export const SparePartView = ({ img, units }: SparePartViewProps) => {
  const markPositions = units.map(({ oem, codeOnImage, name, imagePositions }) => {
    return (
      <Fragment key={oem}>
        <S.MarkContainer key={codeOnImage} left={imagePositions.x1} top={imagePositions.y1}>
          <S.Mark>{codeOnImage}</S.Mark>
        </S.MarkContainer>

        <S.Popover left={imagePositions.x1} top={imagePositions.y1}>
          {name[0]}
          {name.slice(1).toLowerCase()}

          <TriangleIcon />
        </S.Popover>
      </Fragment>
    )
  })

  return (
    <S.SparePartView>
      <TransformWrapper minScale={0.2} maxScale={2.5} initialScale={0.57} limitToBounds={false}>
        {({ state, zoomIn, zoomOut }) => {
          const { scale } = state

          const onZoomIn = () => {
            if (scale + 0.1 > 100) {
              zoomIn(0.35)
              return
            }

            zoomIn(scale + 0.1)
          }

          const onZoomOut = () => {
            if (scale - 0.1 < 35) {
              zoomOut(1)
              return
            }

            zoomOut(scale - 0.1)
          }

          return (
            <>
              <S.Tools>
                <S.ZoomControls>
                  <Button variant="text" onClick={onZoomOut}>
                    <MinusIcon />
                  </Button>

                  <div>{Number(state.scale * 100).toFixed(0)} %</div>

                  <Button variant="text" onClick={onZoomIn}>
                    <PlusIcon />
                  </Button>
                </S.ZoomControls>
              </S.Tools>

              <TransformComponent>
                {img && (
                  <S.Img>
                    <img src={img} />

                    {markPositions}
                  </S.Img>
                )}
              </TransformComponent>
            </>
          )
        }}
      </TransformWrapper>
    </S.SparePartView>
  )
}
