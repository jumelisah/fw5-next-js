import { Form } from 'react-bootstrap'
import { AiOutlineMail } from 'react-icons/ai'
import FormInput from '../../components/FormInput'
import { FiLock } from "react-icons/fi";
import Link from 'next/link';
import Button from '../../components/Button';
import Image from 'next/image';
import { connect, useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { Router, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const Logout = () => {
  const { auth } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const route = useRouter()
  

  useEffect ( () => {
    dispatch({type: 'AUTH_LOGOUT'})
    route.push('/')
  },)

  return(
    <Layout></Layout>
  )
}

export default Logout