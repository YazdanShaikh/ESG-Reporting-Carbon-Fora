import React, { useState, useMemo, useEffect, useCallback } from "react";
import Card from "@/components/ui/Card";
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from "react-table";
import GlobalFilter from "../../../components/shared/GlobalFilter";
import { formatDate, handleError } from "../../../utils/functions";
import ActionButton from "../../../components/ui/ActionButton";
import axiosInstance from "../../../configs/axios.config";
import { useNavigate } from "react-router-dom";
import usePaginate from "../../../hooks/usePaginate";
import DynamicTableBody from "../../../components/shared/DynamicTableBody";
import AddButton from "../../../components/ui/AddButton";
import useConfirmationDialog from "../../../hooks/useConfirmation";
import ConfirmationDialog from "../../../components/shared/ConfirmationDialog";
import { toast } from "react-toastify";

const COLUMNS = [
  {
    Header: "Name",
    accessor: (info) => `${info.firstName} ${info.lastName}`,
    Cell: (row) => {
      return <span>{row?.cell?.value}</span>;
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
    Header: "created At",
    accessor: "createdAt",
    Cell: (row) => {
      return <span>{formatDate(row?.cell?.value)}</span>;
    },
  },
];

const Category = () => {
  const columns = useMemo(() => COLUMNS, []);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { handlePageChange, handlePageSizeChange, pagination, setPagination } = usePaginate();
  const { closeDialog, isOpen, onConfirm, openDialog } = useConfirmationDialog();

  const fetchData = useCallback(async (page, limit) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/user/email`, {
        params: {
          page,
          limit,
        },
      });
      if (!data.error) {
        setData(data.emails);
        setPagination(data.pagination);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(pagination.currentPage, pagination.pageSize);
  }, [pagination.currentPage, pagination.pageSize]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/user/email/${id}`);
      if (!data.error) {
        fetchData(pagination.currentPage, pagination.pageSize);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const tableInstance = useTable(
    {
      columns,
      data,
      manualPagination: true,
      pageCount: pagination.totalPages,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          Header: "action",
          accessor: "action",
          Cell: ({ row }) => {
            return (
              <div className="flex space-x-3 rtl:space-x-reverse">
                <ActionButton
                  title="Delete"
                  icon={"mdi:delete-outline"}
                  onClick={() => openDialog(() => handleDelete(row.original._id))}
                />
              </div>
            );
          },
        },
      ]);
    }
  );

  const { state, setGlobalFilter } = tableInstance;
  const { globalFilter } = state;

  return (
    <>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Emails</h4>
          <div className="flex gap-2">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Search Emails..." />
            <AddButton />
          </div>
        </div>
        <DynamicTableBody
          tableInstance={tableInstance}
          pagination={pagination}
          handlePageSizeChange={handlePageSizeChange}
          handlePageChange={handlePageChange}
          isLoading={isLoading}
        />
      </Card>
      <ConfirmationDialog isOpen={isOpen} closeDialog={closeDialog} onConfirm={onConfirm} />
    </>
  );
};

export default Category;
