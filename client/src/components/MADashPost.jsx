import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
export default function MADashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  console.log(userPosts);

  const getPosts = () => {
    axios
      .get(
        `http://localhost:3000/api/post/getPosts?userId=${
          currentUser.data?.user?._id || currentUser._id
        }`
      )
      .then((res) => {
        if (res?.data?.isSuccessfull) {
          setUserPosts([...res?.data?.data?.posts]);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {(currentUser.data?.user?.isAdmin || currentUser.isAdmin) &&
      userPosts.length > 0 ? (
        <Table hoverable className="shadow-md">
          <Table.Head>
            <Table.HeadCell>Date Updated</Table.HeadCell>
            <Table.HeadCell>Post Image</Table.HeadCell>
            <Table.HeadCell>Post Title</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
          </Table.Head>
          {userPosts.map((x) => {
            return (
              <Table.Body key={x._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(x.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${x.slug}`}>
                      <img
                        src={x.image}
                        alt={x.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-semibold text-gray-900 dark:text-white"
                      to={`/post/${x.slug}`}
                    >
                      {x.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{x.category}</Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-red-500 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-post/${x._id}`}>
                      <span className="font-medium text-blue-500 hover:underline cursor-pointer">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            );
          })}
        </Table>
      ) : (
        <p>You Have No Post Yet</p>
      )}
    </div>
  );
}
