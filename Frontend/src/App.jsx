import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './Start/Start'
import UserLogin from './Login/UserLogin'
import CaptainLogin from './Login/CaptainLogin'
import CaptainSignUp from './SignUp/CaptainSIgnUp'
import UserSignUp from './SignUp/UserSignUp'
import UserHome from './Home/UserHome' 
import UserProtectWrapper from './WrapperProtection/UserProtectWrapper'
import UserLogout from './Logout/UserLogout'
import CaptainLogout from './Logout/CaptainLogout'
import CaptainHome from './Home/CaptainHome'
import Riding from './Components/Riding'
import CaptainProtectionWrapper from './WrapperProtection/CaptainProtectionWrapper'


const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<Start/>}/>
    <Route path='/UserLogin' element ={<UserLogin/>}/>
    <Route path='/Riding' element ={<Riding/>}/>
    <Route path='/CaptainLogin' element ={<CaptainLogin/>}/>
    <Route path='/UserSignUp' element ={<UserSignUp/>}/>
    <Route path='/CaptainSignUp' element ={<CaptainSignUp/>}/>
    <Route path='/home' element ={
      <UserProtectWrapper>
         <UserHome/>
      </UserProtectWrapper>
      } />
       <Route path='/captain-home' element ={
      <CaptainProtectionWrapper>
         <CaptainHome/>
         </CaptainProtectionWrapper>
      } />
      <Route path ='/Userlogout' element = { 
       <UserProtectWrapper>
       <UserLogout/>
      </UserProtectWrapper>
      }/>
      <Route path ='/Captainlogout' element = { 
       <CaptainProtectionWrapper>
       <CaptainLogout/>
      </CaptainProtectionWrapper>
      }/>
   </Routes>
   </>
  )
}

export default App
