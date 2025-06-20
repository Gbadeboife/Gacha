
    import React from "react";
    import { AuthContext,tokenExpireError } from "../authContext";
    import MkdSDK from "../utils/MkdSDK";
    import { useForm } from "react-hook-form";
    import { useNavigate } from "react-router-dom";
    import { GlobalContext } from "../globalContext";
    import { yupResolver } from "@hookform/resolvers/yup";
    import * as yup from "yup";
    import { getNonNullValue } from "../utils/utils";
    import PaginationBar from "../components/PaginationBar";
    import AddButton from "../components/AddButton";
    import ExportButton from "../components/ExportButton";

    let sdk = new MkdSDK();

    const columns = [
    {
        header: "Action",
        accessor: "",
    },
    
        
        {
            header: 'Create At',
            accessor: 'create_at',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Update At',
            accessor: 'update_at',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Meeting Link',
            accessor: 'meeting_link',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Meeting Password',
            accessor: 'meeting_password',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Meeting Start',
            accessor: 'meeting_start',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Meeting End',
            accessor: 'meeting_end',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Meeting Details',
            accessor: 'meeting_details',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },

    ];

    const SchedulingListPage = () => {
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
    
        	create_at: yup.string(),
        	update_at: yup.string(),
        	meeting_link: yup.string(),
        	meeting_password: yup.string(),
        	meeting_start: yup.string(),
        	meeting_end: yup.string(),
        	meeting_details: yup.string(),
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
        sdk.setTable("scheduling");
        let sortField = columns.filter((col) => col.isSorted);
        const result = await sdk.callRestAPI(
            {
            payload: { ...currentTableData },
            page: pageNum,
            limit: limitNum,
            sortId: sortField.length ? sortField[0].accessor : "",
            direction: sortField.length ? (sortField[0].isSortedDesc ? "DESC" : "ASC") : "",
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
        sdk.setTable("scheduling");
        const result = await sdk.callRestAPI({id}, "DELETE");
        setCurrentTableData(list => list.filter( x => Number(x.id) !== Number(id)));
        } catch (err) {
        throw new Error(err);
        }

    }

    const exportTable = async (id) => {
        try {
        sdk.setTable("notes");
        const result = await sdk.exportCSV();
        } catch (err) {
        throw new Error(err);
        }

    }

    const resetForm = async () => {
        reset();
        await getData(0, pageSize);
    }


    const onSubmit = (_data) => {
    
        let create_at = getNonNullValue(_data.create_at);
        let update_at = getNonNullValue(_data.update_at);
        let meeting_link = getNonNullValue(_data.meeting_link);
        let meeting_password = getNonNullValue(_data.meeting_password);
        let meeting_start = getNonNullValue(_data.meeting_start);
        let meeting_end = getNonNullValue(_data.meeting_end);
        let meeting_details = getNonNullValue(_data.meeting_details);
        let filter = {
        id,
    
        create_at: create_at,
        update_at: update_at,
        meeting_link: meeting_link,
        meeting_password: meeting_password,
        meeting_start: meeting_start,
        meeting_end: meeting_end,
        meeting_details: meeting_details,
        };
        getData(1, pageSize, filter);
    };

    React.useEffect(() => {
        globalDispatch({
        type: "SETPATH",
        payload: {
            path: "scheduling",
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
            <h4 className="text-2xl font-medium">Scheduling Search</h4>
            <div className="filter-form-holder mt-10 flex flex-wrap">
    
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="create_at"
            >
              Create At
            </label>
            <input
                type="date"
              placeholder="Create At"
              {...register("create_at")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.create_at?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.create_at?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
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
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="meeting_link"
            >
              Meeting Link
            </label>
            <input
              placeholder="Meeting Link"
              {...register("meeting_link")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.meeting_link?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.meeting_link?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="meeting_password"
            >
              Meeting Password
            </label>
            <input
              placeholder="Meeting Password"
              {...register("meeting_password")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.meeting_password?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.meeting_password?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="meeting_start"
            >
              Meeting Start
            </label>
            <input
                type="datetime-local"
              placeholder="Meeting Start"
              {...register("meeting_start")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.meeting_start?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.meeting_start?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="meeting_end"
            >
              Meeting End
            </label>
            <input
                type="datetime-local"
              placeholder="Meeting End"
              {...register("meeting_end")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.meeting_end?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.meeting_end?.message}
            </p>
          </div>
        
            
        <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="meeting_details"
        >
          Meeting Details
        </label>
        <textarea
          placeholder="Meeting Details"
          {...register("meeting_details")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.meeting_details?.message ? "border-red-500" : ""
          }`}
          row={15}
        ></textarea>
        <p className="text-red-500 text-xs italic">
          {errors.meeting_details?.message}
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
            onClick={() => {resetForm()}}
            type="button"
            className=" inline ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
            Clear
            </button>
        </form>

        <div className="overflow-x-auto  p-5 bg-white shadow rounded">
            <div className="mb-3 text-center justify-between w-full flex  ">
            <h4 className="text-2xl font-medium">Scheduling</h4>
            <div className="flex">
                <AddButton link={"/user/add-scheduling"} />
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
                                <img src={row[cell.accessor]}  className="h-[100px] w-[150px]" />
                            </td>
                            );
                        }
                        if (cell.accessor.indexOf("pdf") > -1 || cell.accessor.indexOf("doc") > -1 || cell.accessor.indexOf("file") > -1 || cell.accessor.indexOf("video") > -1) {
                            return (
                            <td
                                key={index}
                                className="px-6 py-4 whitespace-nowrap"
                            >
                            <a className="text-blue-500" target="_blank" href={row[cell.accessor]} > View</a>
                            </td>
                            );
                        }
                        if (cell.accessor == "") {
                            return (
                            <td
                                key={index}
                                className="px-6 py-4 whitespace-nowrap"
                            >
                                <button
                                className="text-xs"
                                onClick={() => {
                                    navigate("/user/edit-scheduling/" + row.id, {
                                    state: row,
                                    });
                                }}
                                >
                                {" "}
                                Edit
                                </button>
                                <button
                                className="text-xs px-1 text-blue-500"
                                onClick={() => {
                                    navigate("/user/view-scheduling/" + row.id, {
                                    state: row,
                                    });
                                }}
                                >
                                {" "}
                                View
                                </button>
                                <button
                                className="text-xs px-1 text-red-500"
                                onClick={ () => deleteItem(row.id) }
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

    export default SchedulingListPage;

    