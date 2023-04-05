import { array } from "joi";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import pagination from "../../utils/Pagination";
import Pagination from "../Pagination/Pagination";

export default function FindUser({ users }) {
  let [search, setSearch] = useState("");

  let [pageInfo, setPageInfo] = useState({
    pageNumber: 0,
    pageSize: 12,
  });

  const result = users.filter((user) => {
    if (search == "") {
      return user;
    } else {
      if (user.userName.toLowerCase().includes(search.toLowerCase())) {
        return user;
      }
    }
  });

  let changePageNumber = (page) => {
    // console.log("hii");
    // let newPageInfo = {...pageInfo};
    // newPageInfo.pageNumber = page;
    // setPageInfo(newPageInfo);
    setPageInfo({...pageInfo,pageNumber:page})
  };

  let getData = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    setPageInfo({ ...pageInfo, pageNumber: 0 });
  };

  return (
    <div>
      <div className="container">
        <h1 className="text-center my-3 ">List of users</h1>

        <input
          className="form-control w-50 m-auto my-2 "
          type="search"
          onChange={getData}
          placeholder="search user ..."
        />
        <table className="table caption-top">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {pagination(result,pageInfo.pageNumber, pageInfo.pageSize).map(
              (user, index) => {
                console.log(user);
                return (
                  <tr key={user._id}>
                    <th scope="row">{index+1+(pageInfo.pageNumber*pageInfo.pageSize)}</th>
                    <td>{user.userName}</td>
                    <td>
                      <Link to={`/user/${user._id}`}>
                        <button className=" btn bg-dark rounded text-white">
                          send message
                          <i className="fa-solid fa-paper-plane ps-2"></i>
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>

        <Pagination
          users={result}
          changePageNumber={changePageNumber}
          {...pageInfo}
        />
      </div>
    </div>
  );
}
