
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
            header: 'Name',
            accessor: 'name',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Item Name',
            accessor: 'item_name',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Project Id',
            accessor: 'project_id',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Type',
            accessor: 'type',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Range Start',
            accessor: 'range_start',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Range End',
            accessor: 'range_end',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Steps',
            accessor: 'steps',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },

    ];

    const ChildListPage = () => {
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
        	item_name: yup.string(),
        	project_id: yup.string(),
        	type: yup.string(),
        	range_start: yup.string(),
        	range_end: yup.string(),
        	steps: yup.string(),
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
        sdk.setTable("child");
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
        sdk.setTable("child");
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
    
        let name = getNonNullValue(_data.name);
        let item_name = getNonNullValue(_data.item_name);
        let project_id = getNonNullValue(_data.project_id);
        let type = getNonNullValue(_data.type);
        let range_start = getNonNullValue(_data.range_start);
        let range_end = getNonNullValue(_data.range_end);
        let steps = getNonNullValue(_data.steps);
        let filter = {
        id,
    
        name: name,
        item_name: item_name,
        project_id: project_id,
        type: type,
        range_start: range_start,
        range_end: range_end,
        steps: steps,
        };
        getData(1, pageSize, filter);
    };

    React.useEffect(() => {
        globalDispatch({
        type: "SETPATH",
        payload: {
            path: "child",
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
            <h4 className="text-2xl font-medium">Child Search</h4>
            <div className="filter-form-holder mt-10 flex flex-wrap">
    
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              placeholder="Name"
              {...register("name")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.name?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.name?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="item_name"
            >
              Item Name
            </label>
            <input
              placeholder="Item Name"
              {...register("item_name")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.item_name?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.item_name?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="project_id"
            >
              Project Id
            </label>
            <input
                type="number"
              placeholder="Project Id"
              {...register("project_id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.project_id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.project_id?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Type
            </label>
            <input
                type="number"
              placeholder="Type"
              {...register("type")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.type?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.type?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="range_start"
            >
              Range Start
            </label>
            <input
                type="number"
              placeholder="Range Start"
              {...register("range_start")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.range_start?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.range_start?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="range_end"
            >
              Range End
            </label>
            <input
                type="number"
              placeholder="Range End"
              {...register("range_end")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.range_end?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.range_end?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="steps"
            >
              Steps
            </label>
            <input
                type="number"
              placeholder="Steps"
              {...register("steps")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.steps?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.steps?.message}
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
            <h4 className="text-2xl font-medium">Child</h4>
            <div className="flex">
                <AddButton link={"/user/add-child"} />
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
                                    navigate("/user/edit-child/" + row.id, {
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
                                    navigate("/user/view-child/" + row.id, {
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

    export default ChildListPage;

    