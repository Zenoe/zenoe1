import {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import { logout } from "@/actions/userActions";

import { useNavigate } from 'react-router-dom';

export default function Logout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(logout()).then(()=>{
      navigate("/login");
    });
  }, [navigate]);
  return (
    null
  )
}
