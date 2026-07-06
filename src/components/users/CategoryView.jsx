import { useEffect, useState } from "react"
import { getAllCategroy } from "../../services/category.service"
import { Container, ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

const CategoryView = () => {

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        loadCategores(0, 100000)
    }, [])


    const loadCategores = (pageNumber, pageSize) => {


        getAllCategroy(pageNumber, pageSize).then(data => {
            console.log(data)
            setCategories({ ...data })
        })
            .catch(error => {
                console.log(error);
            })

    }


   const categoryView = () => {
       return (
         categories && (
           <ListGroup variant="flush" className="sticky-top d-block text-center">
             <ListGroup.Item as={Link} to={'/store'}
               action
               className="d-flex flex-column align-items-center justify-content-center"
             >
               <span>All Product</span>
             </ListGroup.Item>
   
             {categories.content.map((cat) => (
               <ListGroup.Item
                 key={cat.categoryId}
                 as={Link}
                 to={`/store/${cat.categoryId}/${cat.title}`}
                 action
                 className="d-flex flex-column align-items-center justify-content-center"
               >
               <Container className="d-flex flex-column align-items-center justify-content-center">
                 <img
                   src={cat.coverImage}
                   alt={cat.title}
                   className="rounded-circle mb-2"
                   style={{
                     width: "50px",
                     height: "50px",
                     objectFit: "cover",
                   }}
                 />
   
                 <span>{cat.title}</span>
                 </Container>
               </ListGroup.Item>
             ))}
           </ListGroup>
         )
       );
     };

    return categories && categoryView()
}

export default CategoryView;