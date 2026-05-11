
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { deleteUser } from "../../services/user.service";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../context/user.context";
import { formatDate } from "../../services/helper.service";





const SingleUserView = ({index,user,updateUserList}) => {

  


   const userContext = useContext(UserContext)

   const deleteUserLocal = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(user.userId)
          .then((data) => {
            console.log("Delete response:", data);
            toast.success("User Deleted Successfully");
            updateUserList(user.userId); 
          })
            .catch((error) => {
            console.log(error);
            toast.error("Something went wrong");
          });
      }
    });

    
            
  }
  return (
    <tr>
      <td className="px-3 small"> {index + 1}</td>
      <td className="px-3 small">{user.name}</td>
      <td className="px-3 small">{user.email}</td>
      <td className="px-3 small">{user.gender}</td>
      <td className="px-3 small">{user.about}</td>
      <td className="px-3 small">{formatDate(user.createdAt)}</td>
      <td className="px-3 small">{formatDate(user.updatedAt)}</td>
      <td className="px-3 small d-flex table-light ">
        <Button className="ms-2" variant="danger" size="sm" onClick={deleteUserLocal}>
           <MdDelete/>
        </Button>
        <Button className="ms-2" as={NavLink} to={`/users/profile/${userContext.userData.user.userId}`} variant="info" size="sm">
          <FaEye />
        </Button>
      </td>
    </tr>
  );
};

export default SingleUserView;
