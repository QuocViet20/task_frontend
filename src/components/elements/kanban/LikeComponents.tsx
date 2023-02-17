import React from "react";
import { AiFillLike, AiOutlineSmile } from 'react-icons/ai'
import { FcLike } from 'react-icons/fc';
import { ImSad } from 'react-icons/im';
import { FaSadCry, FaAngry } from 'react-icons/fa';
import './LikeComponents.scss'


interface LikeIcon {
  id?:string | undefined;
  icon: JSX.Element
}

interface LikeComponentprops {
  handleSelectLike:(item:LikeIcon) =>void;
}

export   const likeArrays = [
  {id:'like',
    icon: <AiFillLike/>
  },
  {id:'love',
  icon: <FcLike/>
  },
  {id:'smile',
  icon: <AiOutlineSmile/>
  },
  {id:'sad',
  icon: <ImSad/>
  },
  {id:'cry',
  icon: <FaSadCry/>
  },
  {id:'angry',
  icon: <FaAngry/>
  },
]


const LikeComponents = ({handleSelectLike}:LikeComponentprops)=> {

  return(
    <div className="d-flex">
      {likeArrays.map((item) => (
        <span className="mx-1 like_icon" key = {item.id} onClick={()=>handleSelectLike(item)}>{item.icon}</span>
      ))}
    </div>
  )
}
export default LikeComponents