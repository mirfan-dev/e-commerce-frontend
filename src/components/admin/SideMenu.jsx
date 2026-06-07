import React, { useContext } from 'react'
import { Badge, ListGroup } from 'react-bootstrap'
import { BiCategory } from 'react-icons/bi'
import { FaUserSecret } from 'react-icons/fa'
import { GrHome } from 'react-icons/gr'
import { MdAddBox, MdDashboard, MdOutlineCategory, MdViewDay } from 'react-icons/md'

import { NavLink } from 'react-router-dom'
import UserContext from '../../context/user.context'
import { HiOutlineLogout } from 'react-icons/hi'

const SideMenu = () => {

  const {logout} = useContext(UserContext);
  return (
    <>
      <ListGroup variant="flush" className="sticky-top border border-0 shadow">
         <ListGroup.Item as={NavLink} to={"/admins/home"} action>
         <GrHome size={20} />
         <span className='ms-2'>Home</span>
         </ListGroup.Item>
         <ListGroup.Item as={NavLink} to={"/admins/add-category"} action>
         <BiCategory size={20} />
          <span className='ms-2'>Add Category</span>
         </ListGroup.Item>
         <ListGroup.Item as={NavLink} to={"/admins/categories"} action>
         <MdOutlineCategory size={20}/>
         <span className='ms-2'>View Category</span>
         </ListGroup.Item>
         <ListGroup.Item as={NavLink} to={"/admins/add-product"} action>
         <MdAddBox size={20} />
         <span className='ms-2'>Add Product</span>
         </ListGroup.Item>
         <ListGroup.Item as={NavLink} to={"/admins/products"} action>
         <MdViewDay size={20} />
         <span className='ms-2'>View Product</span>
         </ListGroup.Item>
         <ListGroup.Item as={NavLink} to={"/admins/userProfile"} className='d-flex justify-content-between align-items-start' action>
         <div>
            <FaUserSecret size={20}/>
            <span className='ms-2'>Users</span>
         </div>
         <Badge bg='danger' pill>
              New
         </Badge>
         </ListGroup.Item>
         <ListGroup.Item as={NavLink} to={"/"} action>
         <MdDashboard size={20} />
         <span className='ms-2'> Dashboard</span>
         </ListGroup.Item>
         <ListGroup.Item action onClick={(event) => {
                logout()
            }}>
            <HiOutlineLogout size={20} />
                  <span className="ms-2">Logout</span>
            </ListGroup.Item>
      </ListGroup>
    </>
  )
}

export default SideMenu