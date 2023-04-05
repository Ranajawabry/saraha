import _ from 'lodash';
import React from 'react'

export default function Pagination({users , changePageNumber , pageNumber, pageSize}) {
 
 const pageCount= Math.ceil(users.length/pageSize);
   let pages= _.range(0,pageCount);
  if (pageCount==1){
    return <></>
  }
  else
    return (
    <div>
 <nav aria-label="Page navigation example">
  <ul className="pagination">
    {
        pages.map((page,index)=>(
            <li key={index} className={page===pageNumber? "page-item active" : "page-item"} onClick={()=> changePageNumber(page)}><a className="page-link" >{page+1}</a></li>
        
        ))
    }
  </ul>
</nav>

    </div>
  )
}
