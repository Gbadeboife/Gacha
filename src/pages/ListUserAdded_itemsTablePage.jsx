
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
            header: 'Child Id',
            accessor: 'child_id',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Output Id',
            accessor: 'output_id',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Linked Item Id',
            accessor: 'linked_item_id',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Item Type',
            accessor: 'item_type',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
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
            header: 'Amount',
            accessor: 'amount',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Weights',
            accessor: 'weights',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Dupe Protection',
            accessor: 'dupe_protection',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Output Protection',
            accessor: 'output_protection',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Dupe Protection Map',
            accessor: 'dupe_protection_map',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },
        
        {
            header: 'Output Protection Map',
            accessor: 'output_protection_map',
            isSorted: false,
            isSortedDesc: false,
            mappingExist : false,
            mappings: {  }
        },

    ];

    const AddedItemsListPage = () => {
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
    
        	child_id: yup.string(),
        	output_id: yup.string(),
        	linked_item_id: yup.string(),
        	item_type: yup.string(),
        	name: yup.string(),
        	amount: yup.string(),
        	weights: yup.string(),
        	dupe_protection: yup.string(),
        	output_protection: yup.string(),
        	dupe_protection_map: yup.string(),
        	output_protection_map: yup.string(),
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
        sdk.setTable("added_items");
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
        sdk.setTable("added_items");
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
    
        let child_id = getNonNullValue(_data.child_id);
        let output_id = getNonNullValue(_data.output_id);
        let linked_item_id = getNonNullValue(_data.linked_item_id);
        let item_type = getNonNullValue(_data.item_type);
        let name = getNonNullValue(_data.name);
        let amount = getNonNullValue(_data.amount);
        let weights = getNonNullValue(_data.weights);
        let dupe_protection = getNonNullValue(_data.dupe_protection);
        let output_protection = getNonNullValue(_data.output_protection);
        let dupe_protection_map = getNonNullValue(_data.dupe_protection_map);
        let output_protection_map = getNonNullValue(_data.output_protection_map);
        let filter = {
        id,
    
        child_id: child_id,
        output_id: output_id,
        linked_item_id: linked_item_id,
        item_type: item_type,
        name: name,
        amount: amount,
        weights: weights,
        dupe_protection: dupe_protection,
        output_protection: output_protection,
        dupe_protection_map: dupe_protection_map,
        output_protection_map: output_protection_map,
        };
        getData(1, pageSize, filter);
    };

    React.useEffect(() => {
        globalDispatch({
        type: "SETPATH",
        payload: {
            path: "added_items",
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
            <h4 className="text-2xl font-medium">Added Items Search</h4>
            <div className="filter-form-holder mt-10 flex flex-wrap">
    
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="child_id"
            >
              Child Id
            </label>
            <input
                type="number"
              placeholder="Child Id"
              {...register("child_id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.child_id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.child_id?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="output_id"
            >
              Output Id
            </label>
            <input
                type="number"
              placeholder="Output Id"
              {...register("output_id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.output_id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.output_id?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="linked_item_id"
            >
              Linked Item Id
            </label>
            <input
                type="number"
              placeholder="Linked Item Id"
              {...register("linked_item_id")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.linked_item_id?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.linked_item_id?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="item_type"
            >
              Item Type
            </label>
            <input
                type="number"
              placeholder="Item Type"
              {...register("item_type")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.item_type?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.item_type?.message}
            </p>
          </div>
        
            
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
              htmlFor="amount"
            >
              Amount
            </label>
            <input
                type="number"
              placeholder="Amount"
              {...register("amount")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.amount?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.amount?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="weights"
            >
              Weights
            </label>
            <input
                type="number"
              placeholder="Weights"
              {...register("weights")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.weights?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.weights?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="dupe_protection"
            >
              Dupe Protection
            </label>
            <input
                type="number"
              placeholder="Dupe Protection"
              {...register("dupe_protection")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.dupe_protection?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.dupe_protection?.message}
            </p>
          </div>
        
            
            <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="output_protection"
            >
              Output Protection
            </label>
            <input
                type="number"
              placeholder="Output Protection"
              {...register("output_protection")}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                errors.output_protection?.message ? "border-red-500" : ""
              }`}
            />
            <p className="text-red-500 text-xs italic">
              {errors.output_protection?.message}
            </p>
          </div>
        
            
        <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dupe_protection_map"
        >
          Dupe Protection Map
        </label>
        <textarea
          placeholder="Dupe Protection Map"
          {...register("dupe_protection_map")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.dupe_protection_map?.message ? "border-red-500" : ""
          }`}
          row={15}
        ></textarea>
        <p className="text-red-500 text-xs italic">
          {errors.dupe_protection_map?.message}
        </p>
      </div>
        
            
        <div className="mb-4 w-full md:w-1/2 pr-2 pl-2 ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="output_protection_map"
        >
          Output Protection Map
        </label>
        <textarea
          placeholder="Output Protection Map"
          {...register("output_protection_map")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.output_protection_map?.message ? "border-red-500" : ""
          }`}
          row={15}
        ></textarea>
        <p className="text-red-500 text-xs italic">
          {errors.output_protection_map?.message}
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
            <h4 className="text-2xl font-medium">Added Items</h4>
            <div className="flex">
                <AddButton link={"/user/add-added_items"} />
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
                                    navigate("/user/edit-added_items/" + row.id, {
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
                                    navigate("/user/view-added_items/" + row.id, {
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

    export default AddedItemsListPage;

    