import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAdminUser } from '../../auth/auth.helper'
import UserContext from '../../context/user.context'
import { Col, Container, Row } from 'react-bootstrap'
import SideMenu from '../../components/admin/SideMenu'

const AdminDashboard = () => {

  const userContext = useContext(UserContext);

  const dashboardView = () => {
    return(
        <div>
           <Container className='p-5'>
             <Row>
                       {/* side menu  */}
                <Col md={{
                  span:2,
                  offset:1
                }} className=''>
                     <SideMenu/>
                </Col>
                     {/* content area */}
                <Col md={9} className='ps-3 pt-2'>
                     <Outlet />

                </Col>
             </Row>
           </Container>
        </div>
    )

  }
  return (
    (isAdminUser()) ? (dashboardView()) : <Navigate to={"/users/home"} />
    
  )
}

export default AdminDashboard