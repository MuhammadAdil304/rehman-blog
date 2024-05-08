import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Table, Modal } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
export default function MADashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getUsers = () => {
    axios
      .get("http://localhost:3000/api/user/getUsers")
      .then((res) => {
        console.log(res);
        if (res?.data?.isSuccessfull) {
          setUsers([...res?.data?.data?.usersWithoutPassword]);
          if (res?.data?.data?.usersWithoutPassword.length < 9) {
            setShowMore(false);
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleShowMore = () => {
    const startIndex = users.length;
    axios
      .get(`http://localhost:3000/api/user/getUsers?startIndex=${startIndex}`)
      .then((res) => {
        if (res?.data?.isSuccessfull) {
          setUsers([...users, ...res?.data?.data?.usersWithoutPassword]);
          if (res?.data?.data?.usersWithoutPassword.length < 9) {
            setShowMore(false);
          }
        } else {
          console.log(res.data?.error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const handleDeleteUser = () => {
  //     setShowModal(false);
  //     axios
  //       .delete(`http://localhost:3000/api/post/deleteUser/${userId}`)
  //       .then((res) => {
  //         if (res?.data?.isSuccessfull) {
  //           getPosts();
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err.message);
  //       });
  //   };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {(currentUser.data?.user?.isAdmin || currentUser.isAdmin) &&
      users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Created</Table.HeadCell>
              <Table.HeadCell>User Image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((x) => {
              return (
                <Table.Body key={x._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>
                      {new Date(x.createdAt).toLocaleDateString()}
                    </Table.Cell>
                    <Table.Cell>
                      <img
                        src={x.profilePicture}
                        alt={x.userName}
                        className="w-10 h-10 object-cover rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{x.userName}</Table.Cell>
                    <Table.Cell>{x.email}</Table.Cell>
                    <Table.Cell>
                      {x.isAdmin ? (
                        <FaCheck className="text-green-500" />
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostid(x._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              );
            })}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full py-5 text-blue-500  text-sm"
            >
              Show More
            </button>
          )}
          {/* <Modal
            show={showModal}
            onClose={() => setShowModal(false)}
            popup
            size="md"
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="w-14 h-14 text-gray-400 dark:text-gray-200 mx-auto" />
                <h3 className="mb-5 text-lg  text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this post?
                </h3>
                <div className="flex justify-between">
                  <Button color="failure" onClick={handleDeletePost}>
                    Yes, I am sure
                  </Button>
                  <Button color="gray" onClick={() => setShowModal(false)}>
                    No, Cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal> */}
        </>
      ) : (
        <p>You Have No Users Yet</p>
      )}
    </div>
  );
}
