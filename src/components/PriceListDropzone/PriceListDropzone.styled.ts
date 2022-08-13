import styled from 'styled-components'

export const PriceListDropzone = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 30px 10px;
  border: 1px dashed #dedee2;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;

  & > span:last-child {
    margin-top: 18px;
    color: #7a7680;
  }
`

export const UploadFakeButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px 50px 12px 40px;
  background: #f4f5f7;
  border: 1px solid #e3e3e8;
  border-radius: 6px;

  span {
    margin-top: 4px;
    margin-left: 20px;
    color: #55556d;
  }
`

export const UploadedFile = styled.div`
  display: flex;
  flex-direction: column;

  span {
    text-align: center;

    &:last-child {
      margin-top: 5px;
      color: #7a7680;
    }
  }
`
