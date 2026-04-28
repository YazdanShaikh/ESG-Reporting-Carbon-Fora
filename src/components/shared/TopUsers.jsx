import { useMemo } from "react";
import Card from "@/components/ui/Card";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
import GlobalFilter from "../../components/shared/GlobalFilter";
import TableBody from "../../components/shared/TableBody";
import { formatDate } from "../../utils/functions";

const COLUMNS = [
  {
    Header: "User",
    accessor: "name",
    Cell: (row) => {
      return (
        <div className="flex items-center gap-2">
          <img
            src={row.cell.row.original.profile}
            alt={row?.cell?.value}
            className="h-16 w-16 object-cover rounded-full"
          />
          <span>{row?.cell?.value}</span>
        </div>
      );
    },
  },
  {
    Header: "Email",
    accessor: "email",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Whatsapp Number",
    accessor: "whatsApp",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "Cnic",
    accessor: "cnic",
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
    },
  },
  {
    Header: "created At",
    accessor: "createdAt",
    Cell: (row) => {
      return <span>{formatDate(row?.cell?.value)}</span>;
    },
  },
  {
    Header: "status",
    accessor: (info) => (info.status ? "Public" : "Private"),
    Cell: (row) => {
      return (
        <span className="block w-full">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
              row?.cell?.value === "Public" ? "text-success-500 bg-success-500" : ""
            } 
            ${row?.cell?.value === "Private" ? "text-danger-500 bg-danger-500" : ""}
            
             `}
          >
            {row?.cell?.value}
          </span>
        </span>
      );
    },
  },
];

const TopRatedUsers = ({ data, title }) => {
  const columns = useMemo(() => COLUMNS, []);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const { state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  return (
    <Card>
      <div className="md:flex justify-between items-center mb-6">
        <h4 className="card-title">{title}</h4>
        <div className="flex gap-2">
          <GlobalFilter
            filter={globalFilter}
            setFilter={setGlobalFilter}
            placeholder={`Search ${title}...`}
          />
        </div>
      </div>
      <TableBody tableInstance={tableInstance} />
    </Card>
  );
};

export default TopRatedUsers;
