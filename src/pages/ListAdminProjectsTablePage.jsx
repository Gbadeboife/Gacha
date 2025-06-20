import React from "react";
import { AuthContext, tokenExpireError } from "../authContext";
import MkdSDK from "../utils/MkdSDK";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { GlobalContext, showToast } from "../globalContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getNonNullValue } from "../utils/utils";
import PaginationBar from "../components/PaginationBar";
import AddButton from "../components/AddButton";
import ExportButton from "../components/ExportButton";
import { list } from "postcss";

let sdk = new MkdSDK();

const columns = [
  {
    header: "Author",
    accessor: "author",
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },

  {
    header: "Project Id",
    accessor: "id",
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },

  {
    header: "Project Name",
    accessor: "name",
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },

  {
    header: "Update At",
    accessor: "update_at",
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "Action",
    accessor: "",
  },
];

const ProjectsListPage = () => {
  const { dispatch } = React.useContext(AuthContext);
  const { dispatch: globalDispatch } = React.useContext(GlobalContext);

  const [query, setQuery] = React.useState("");
  const [currentTableData, setCurrentTableData] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [pageCount, setPageCount] = React.useState(0);
  const [dataTotal, setDataTotal] = React.useState(0);
  const [currentPage, setPage] = React.useState(0);
  const [canPreviousPage, setCanPreviousPage] = React.useState(false);
  const [canNextPage, setCanNextPage] = React.useState(false);
  const navigate = useNavigate();

  const schema = yup.object({
    name: yup.string(),
    author: yup.string(),
    id: yup.string(),
    update_at: yup.string(),
  });
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSort(columnIndex) {
    console.log(columns[columnIndex]);
    if (columns[columnIndex].isSorted) {
      columns[columnIndex].isSortedDesc = !columns[columnIndex].isSortedDesc;
    } else {
      columns.map((i) => (i.isSorted = false));
      columns.map((i) => (i.isSortedDesc = false));
      columns[columnIndex].isSorted = true;
    }

    (async function () {
      await getData(0, pageSize);
    })();
  }

  function updatePageSize(limit) {
    (async function () {
      setPageSize(limit);
      await getData(0, limit);
    })();
  }

  function previousPage() {
    (async function () {
      await getData(currentPage - 1 > 0 ? currentPage - 1 : 0, pageSize);
    })();
  }

  function nextPage() {
    (async function () {
      await getData(
        currentPage + 1 <= pageCount ? currentPage + 1 : 0,
        pageSize
      );
    })();
  }

  async function getData(pageNum, limitNum, currentTableData) {
    try {
      sdk.setTable("projects");
      let sortField = columns.filter((col) => col.isSorted);
      const result = await sdk.callRestAPI(
        {
          payload: { ...currentTableData },
          page: pageNum,
          limit: limitNum,
          sortId: sortField.length ? sortField[0].accessor : "",
          direction: sortField.length
            ? sortField[0].isSortedDesc
              ? "DESC"
              : "ASC"
            : "",
        },
        "PAGINATE"
      );

      const { list, total, limit, num_pages, page } = result;

      setCurrentTableData(list);
      setPageSize(limit);
      setPageCount(num_pages);
      setPage(page);
      setDataTotal(total);
      setCanPreviousPage(page > 1);
      setCanNextPage(page + 1 <= num_pages);
    } catch (error) {
      console.log("ERROR", error);
      tokenExpireError(dispatch, error.message);
    }
  }

  const deleteItem = async (id) => {
    try {
      sdk.setTable("projects");
      const result = await sdk.callRestAPI({ id }, "DELETE");
      setCurrentTableData((list) =>
        list.filter((x) => Number(x.id) !== Number(id))
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  const exportTable = async (id) => {
    try {
      sdk.setTable("notes");
      const result = await sdk.exportCSV();
    } catch (err) {
      throw new Error(err);
    }
  };

  const resetForm = async () => {
    reset();
    await getData(0, pageSize);
  };

  const onSubmit = async (_data) => {
    let name = getNonNullValue(_data.name);
    let author = getNonNullValue(_data.author);
    let id = getNonNullValue(_data.id);
    let update_at = getNonNullValue(_data.update_at);
    //     let filter = {
    //       name: name,
    //       author: author,
    //       create_at: create_at,
    //       update_at: update_at,
    //     };
    //     getData(1, pageSize, filter);

    let nameQuery = "";
    let authorQuery = "";
    let idQuery = "";
    let updateQuery = "";

    if (name) nameQuery = `name,eq,"${name}",`;

    if (author) authorQuery = `&filter=author,eq,"${author}",`;

    if (id) idQuery = `&filter=id,eq,"${id}",`;

    if (update_at) updateQuery = `&filter=update_at,eq,"${updateQuery}",`;

    const res = await sdk.callRawAPI(
      `/v4/api/records/projects?filter=` +
        nameQuery +
        authorQuery +
        idQuery +
        updateQuery,
      "",
      "GET"
    );

    if (res.list.length > 0) {
      setCurrentTableData(res.list);
      console.log(res);
    } else {
      getData(1, pageSize);
      showToast(globalDispatch, "item not found", 2000, "error");
    }
  };

  React.useEffect(() => {
    globalDispatch({
      type: "SETPATH",
      payload: {
        path: "projects",
      },
    });

    (async function () {
      await getData(1, pageSize);
    })();
  }, []);

  return (
    <>
      <form
        className="p-5 bg-white shadow rounded mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h4 className="text-2xl font-medium">Projects Search</h4>
        <div className="filter-form-holder mt-10 flex flex-wrap">
          <div className="mb-4 w-full md:w-1/3 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="author"
            >
              Author
            </label>
            <input
              type="number"
              {...register("author")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.author?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.author?.message}
            </p>
          </div>

          <div className="mb-4 w-full md:w-1/3 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="id"
            >
              Project Id
            </label>
            <input
              type="number"
              {...register("id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">{errors.id?.message}</p>
          </div>

          <div className="mb-4 w-full md:w-1/3 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Project Name
            </label>
            <input
              type="text"
              {...register("name")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.name?.message}
            </p>
          </div>

          <div className="mb-4 w-full md:w-1/3 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="update_at"
            >
              Update At
            </label>
            <input
              type="datetime-local"
              placeholder="Update At"
              {...register("update_at")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.update_at?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.update_at?.message}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className=" inline ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Search
        </button>

        <button
          onClick={() => {
            resetForm();
          }}
          type="button"
          className=" inline ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Clear
        </button>
      </form>

      <div className="overflow-x-auto  p-5 bg-white shadow rounded">
        <div className="mb-3 text-center justify-between w-full flex  ">
          <h4 className="text-2xl font-medium">Projects</h4>
          <div className="flex">
            <AddButton link={"/admin/add-projects"} />
            <ExportButton onClick={exportTable} className="mx-1" />
          </div>
        </div>
        <div className="shadow overflow-x-auto border-b border-gray-200 ">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, i) => (
                  <th
                    key={i}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    onClick={() => onSort(i)}
                  >
                    {column.header}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTableData.map((row, i) => {
                return (
                  <tr key={i}>
                    {columns.map((cell, index) => {
                      if (cell.accessor.indexOf("image") > -1) {
                        return (
                          <td
                            key={index}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <img
                              src={row[cell.accessor]}
                              className="h-[100px] w-[150px]"
                            />
                          </td>
                        );
                      }
                      if (
                        cell.accessor.indexOf("pdf") > -1 ||
                        cell.accessor.indexOf("doc") > -1 ||
                        cell.accessor.indexOf("file") > -1 ||
                        cell.accessor.indexOf("video") > -1
                      ) {
                        return (
                          <td
                            key={index}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            <a
                              className="text-blue-500"
                              target="_blank"
                              href={row[cell.accessor]}
                            >
                              {" "}
                              View
                            </a>
                          </td>
                        );
                      }
                      if (cell.accessor == "") {
                        return (
                          <td
                            key={index}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {/* <button
                              className="text-xs"
                              onClick={() => {
                                navigate("/admin/edit-projects/" + row.id, {
                                  state: row,
                                });
                              }}
                            >
                              {" "}
                              Edit
                            </button> */}
                            <button
                              className="text-xs px-1 text-blue-500"
                              onClick={() => {
                                navigate("/admin/view-projects/" + row.id, {
                                  state: row,
                                });
                              }}
                            >
                              {" "}
                              View
                            </button>
                            <button
                              className="text-xs px-1 text-red-500"
                              onClick={() => deleteItem(row.id)}
                            >
                              {" "}
                              Delete
                            </button>
                          </td>
                        );
                      }
                      if (cell.mappingExist) {
                        return (
                          <td
                            key={index}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {cell.mappings[row[cell.accessor]]}
                          </td>
                        );
                      }
                      return (
                        <td key={index} className="px-6 py-4 whitespace-nowrap">
                          {row[cell.accessor]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationBar
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        updatePageSize={updatePageSize}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </>
  );
};

export default ProjectsListPage;
