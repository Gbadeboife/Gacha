import React from "react";
import { AuthContext, tokenExpireError } from "../authContext";
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
import AddModal from "../components/AddProjectModal";


let sdk = new MkdSDK();

const columns = [
  {
    header: "Action",
    accessor: "",
  },

  {
    header: "Name",
    accessor: "name",
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },

  {
    header: "Author",
    accessor: "author",
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },

  {
    header: "Create At",
    accessor: "create_at",
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
  const [addModalOpen, setAddModalOpen] = React.useState(true); // set to true by default
  
  const schema = yup.object({
    name: yup.string(),
    author: yup.string(),
    create_at: yup.string(),
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
      const result = await sdk.callRawAPI(
        `/v3/api/custom/gacha/projects`,
        "",
        "GET"
      );
      setCurrentTableData(result.payload);

      //   const { list, total, limit, num_pages, page } = result;
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

  const onSubmit = (_data) => {
    let name = getNonNullValue(_data.name);
    let author = getNonNullValue(_data.author);
    let create_at = getNonNullValue(_data.create_at);
    let update_at = getNonNullValue(_data.update_at);
    let filter = {
      id,

      name: name,
      author: author,
      create_at: create_at,
      update_at: update_at,
    };
    getData(1, pageSize, filter);
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

  // Prevent body scroll when modal is open
  React.useEffect(() => {
    if (addModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [addModalOpen]);

  return (
    <>
      <div className="w-full min-h-screen overflow-y-hidden">
        <div className="pl-10 pr-10 mb-3">
          <div className="flex">
            {/*currentTableData.map((project, index) => {
              return (
                <div
                  key={index}
                  className="h-[270px] cursor-pointer flex justify-center mr-7 items-end w-[200px] border-2 border-grey"
                >
                  <h4 className="mb-10 font-normal capitalize">
                    {project?.name}
                  </h4>
                </div>
              );
            })*/}

            {addModalOpen && (
              <>
                <AddModal/>
              </>
            )} 
          </div>
        </div>
      </div>
    </>

    
  );
};

export default ProjectsListPage;
