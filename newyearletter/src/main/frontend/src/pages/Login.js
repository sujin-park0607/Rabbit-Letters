import styled from 'styled-components'
import React, { useCallback, useState } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import LinkItem from '../components/LinkItem'
import ButtonItem from '../components/ButtonItem'
import { SubTitle, Wrapper } from './Main'
import { login } from '../utils/reducers/loginState'

import axios from 'axios'
import Logo from '../components/Logo'
import Container from '../components/Container'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // 버튼 구현
  const [userID, setUserID] = useState('')
  const [password, setPassword] = useState('')

  const handleIdChange = e => {
    setUserID(e.target.value)
  }
  const handlePwChange = e => {
    setPassword(e.target.value)
  }

  const attemptLogin = async (userID, password) => {
    try {
      const res = await axios.post('/api/users/login', {
        userID: userID,
        password: password,
      })
      if (res.status === 200) {
        alert('로그인에 성공했습니다.')
        dispatch(login(res.data.result.jwt, res.data.result.url))
        navigate('/')
      }
    } catch (err) {
      const res = err.response
      alert(`로그인에 실패했습니다: ${res.data.result.message}`)
      window.location.reload()
    }
  }

  const handleSubmit = useCallback(
    e => {
      if (!(4 <= userID.length)) {
        alert('아이디는 4자 이상 이어야 합니다.')
      } else if (password.length === 0) {
        alert('비밀번호를 입력해 주세요.')
      } else {
        attemptLogin(userID, password)
      }
    },
    [userID, password]
  )

  const onCheckEnter = e => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <Container>
      <Wrapper gap={4}>
        <Logo />
        <Wrapper gap={1.2}>
          <SubTitle>환영합니다!</SubTitle>
          <Input
            type="text"
            name="userID"
            placeholder="아이디"
            onChange={handleIdChange}
            onKeyDown={onCheckEnter}
          />
          <Input
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={handlePwChange}
            onKeyDown={onCheckEnter}
          />
        </Wrapper>

        <Wrapper>
          <ButtonItem onClick={handleSubmit}>로그인</ButtonItem>

          <LinkItem target="/sign-up">
            <BottomText>처음이신가요? 계정 생성하기</BottomText>
          </LinkItem>
        </Wrapper>
      </Wrapper>
    </Container>
  )
}

export const Input = styled.input`
  width: max(16rem, 280px);
  padding: max(1rem, 18px);
  color: var(--brown);

  font-family: nanumRound;
  font-weight: bold;
  font-size: max(1rem, 16px);
  text-align: center;

  border: none;
  border-radius: max(0.5rem, 9px);
  filter: drop-shadow(3px 3px 2px var(--light-300));

  :focus {
    outline: 2px solid var(--pink-200);
  }

  ::placeholder {
    text-align: center;
    color: var(--brown-100);
  }
`

export const BottomText = styled.div`
  font-family: nanumRound;
  font-weight: 600;
  font-size: max(1rem, 16px);
`

export default Login
