import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({comments,deleteComment}) => {
    
    return comments.map(comment=>(
        
        <tr key={comment.reviews}>
            <td>{comment.reviews}</td>
            <td>{comment.customer}</td>
            <td>{comment.resturant}</td>
            <td className='delete-btn' onClick={()=>deleteComment(comment.reviews)}>
                <Icon icon={trash}/>
            </td>           
        </tr>            
    
))
}