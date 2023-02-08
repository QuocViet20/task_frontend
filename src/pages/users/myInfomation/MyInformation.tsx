import { useQuery } from "@tanstack/react-query"
import { memo } from "react"
import {  Link, useParams } from "react-router-dom";
import _ from "lodash"

//components
import Loading from "../../../components/elements/loading/Loading";

//api
import { getUserId } from "../../../api/serviceApi";

const MyInformation = memo(() => {
  const { userId } = useParams();

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useQuery({
    queryFn: () => getUserId(userId as string),
    enabled: !_.isNil(userId)
  })

  if (isUserLoading) {
    return <Loading />
  }
  if (isUserError) {
    return (
      <div className="container text-center mt-4">
        <h2 className="text-danger">Not found user</h2>
      </div>
    )
  }
  return (
    <div className="container mt-4">
      <div className="container d-flex justify-content-center">
        {user?.data &&
          <div >
            <h2 className="text-success">User infomation</h2>
            <p>Email: {user.data.email}</p>
            <p>Username: {user.data.username}</p>
            <p>Role: {user.data.role}</p>
          </div>
        }
        <div className="mx-5 mt-2">
          <Link to={`/users/${userId}/edit`}>
            <button className="btn btn-info">Edit</button>
          </Link>
          </div>
      </div>
    </div>
  )
})

export default MyInformation