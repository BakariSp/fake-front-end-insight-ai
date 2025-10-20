import React from 'react';
import styles from './Table.module.css';

export interface TableColumn {
  key: string;
  title: string;
  dataIndex: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, record: any, index: number) => React.ReactNode;
}

export interface TableProps {
  columns: TableColumn[];
  data: any[];
  className?: string;
  hover?: boolean;
}

const Table: React.FC<TableProps> = ({ columns, data, className = '', hover = true }) => {
  return (
    <div className={`${styles.tableContainer} ${className}`}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={column.align ? styles[`align${column.align.charAt(0).toUpperCase() + column.align.slice(1)}`] : ''}
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr
              key={index}
              className={hover ? styles.hover : ''}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={column.align ? styles[`align${column.align.charAt(0).toUpperCase() + column.align.slice(1)}`] : ''}
                >
                  {column.render
                    ? column.render(record[column.dataIndex], record, index)
                    : record[column.dataIndex]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

