// library
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash"

import { memo, useMemo, useState } from "react"
import {
  Button, 
  Form, 
  InputGroup,
  Modal, 
  Spinner, Table
} from "react-bootstrap"

import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { toast } from "react-toastify";

// types
import { Task, User } from "../../types";
import { RECORDS_PER_PAGE } from "./consts";

// api
import { deleteUser, getUsers } from "../../api/serviceApi";

//hooks
import useAuth from "../../hooks/useAuth";
import useDebounce from "../../hooks/useSearch";

const UserListPage = memo(() => {
  const [ show, setShow] = useState(false);
  const navigate= useNavigate();
  const [searchParams] = useSearchParams();
  const { authData } = useAuth();
  const username = authData.username;

  const debounceSearch = _.debounce((newSearchValue: string) => {
    setSearchValue(newSearchValue);
  }, 2000);

  const [ searchValue, setSearchValue ] = useState("");
  const debouncedSearchHook = useDebounce(searchValue, 1000);

  const currentPage = Number(searchParams.get("page")) || 1;

  const queryParams = {
    currentPage,
    limit: RECORDS_PER_PAGE,
    debouncedSearchHook,
    username
  }

  const { data, isLoading, refetch }: any = useQuery({
    queryKey: [
      "users",
      queryParams.currentPage,
      queryParams.debouncedSearchHook
    ],
    queryFn: () => {}
  })

  // const totalPages = useMemo(() => {
  //   if(_.isNil(data) )
  //   return 0;
  // })

  return (
    <></>
  )
})