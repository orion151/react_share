import React from 'react';
import clone from 'clone';
import IntlMessages from '../../../components/utility/intlMessages';
import {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell
} from '../../../components/tables/helperCells';

const renderCell = (object, type, key) => {
  const value = object[key];
  switch (type) {
    case 'ImageCell':
      return ImageCell(value);
    case 'DateCell':
      return DateCell(value);
    case 'LinkCell':
      return LinkCell(value);
    default:
      return TextCell(value);
  }
};

const columns = [
  {
    title: <IntlMessages id="antTable.title.image" />,
    key: 'avatar',
    width: '1%',
    className: 'isoImageCell',
    render: object => renderCell(object, 'ImageCell', 'avatar')
  },
  {
    title: <IntlMessages id="antTable.title.customer" />,
    key: 'customer',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'customer')
  },
  {
    title: <IntlMessages id="antTable.title.phone" />,
    key: 'phone',
    width: 100,
    render: object => renderCell(object, 'TextCell', 'phone')
  },
  {
    title: <IntlMessages id="antTable.title.city" />,
    key: 'city',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'city')
  },
  {
    title: <IntlMessages id="antTable.title.street" />,
    key: 'street',
    width: 200,
    render: object => renderCell(object, 'TextCell', 'street')
  },
  {
    title: <IntlMessages id="antTable.title.email" />,
    key: 'email',
    width: 200,
    render: object => renderCell(object, 'LinkCell', 'email')
  },
  {
    title: <IntlMessages id="antTable.title.dob" />,
    key: 'date',
    width: 200,
    render: object => renderCell(object, 'DateCell', 'date')
  }
];
const smallColumns = [columns[1], columns[2], columns[3], columns[4]];
const sortColumns = [
  { ...columns[1], sorter: true },
  { ...columns[2], sorter: true },
  // { ...columns[3], sorter: true },
  // { ...columns[4], sorter: true }
];
const editColumns = [
  { ...columns[1], width: 300 },
  { ...columns[2], width: 300 },
  columns[3],
  columns[4]
];
const groupColumns = [
  columns[0],
  {
    title: 'Name',
    children: [columns[1], columns[2]]
  },
  {
    title: 'Address',
    children: [columns[3], columns[4]]
  }
];
const tableinfos = [
  // {
  //   title: 'Simple Table',
  //   value: 'simple',
  //   columns: clone(smallColumns)
  // },
  {
    title: 'CustomerAging',
    value: 'sortView',
    columns: clone(sortColumns)
  },
  // {
  //   title: 'Search Text',
  //   value: 'filterView',
  //   columns: clone(smallColumns)
  // },
  // {
  //   title: 'Editable View',
  //   value: 'editView',
  //   columns: clone(editColumns)
  // },
  // {
  //   title: 'Grouping View',
  //   value: 'groupView',
  //   columns: clone(groupColumns)
  // },
  // {
  //   title: 'Customized View',
  //   value: 'customizedView',
  //   columns: clone(columns)
  // }
];

const defaultOptions = [
  {
    id: 'disabled',
    title: 'Disabled',
    trueValue: true,
    falseValue: false,
    value: false
  },
  {
    id: 'showDefaultInputIcon',
    title: 'Show Defaut Icon',
    trueValue: true,
    falseValue: false,
    value: true
  },
  {
    id: 'isRTL',
    title: 'Enable RTL',
    trueValue: true,
    falseValue: false,
    value: false
  },
  {
    id: 'numberOfMonths',
    title: 'Single Month Enable',
    trueValue: 1,
    falseValue: 2,
    value: 1
  },
  {
    id: 'enableOutsideDays',
    title: 'Enable Outside Days',
    trueValue: true,
    falseValue: false,
    value: true
  },
  {
    id: 'keepOpenOnDateSelect',
    title: 'Keep Open On Date Select',
    trueValue: true,
    falseValue: false,
    value: false
  }
];
const configs = [
  {
    id: 'SingleDatePicker',
    title: 'Single Date Picker',
    options: [
      ...clone(defaultOptions),
      {
        id: 'placeholder',
        title: 'Custom Placeholder',
        trueValue: 'Custom Date',
        falseValue: undefined,
        value: undefined
      }
    ]
  },
  {
    id: 'DateRangePicker',
    title: 'Date Range Picker',
    options: [
      ...clone(defaultOptions),
      {
        id: 'startDatePlaceholderText',
        title: 'Custom Start',
        trueValue: 'C start',
        falseValue: undefined,
        value: undefined
      },
      {
        id: 'endDatePlaceholderText',
        title: 'C end',
        trueValue: 'Custom Date',
        falseValue: undefined,
        value: undefined
      }
    ]
  }
];

export { columns, tableinfos, configs };
