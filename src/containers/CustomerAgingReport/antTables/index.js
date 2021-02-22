import React, { Component } from 'react';
import Tabs, { TabPane } from '../../../components/uielements/tabs';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper.js';
import TableDemoStyle from './demo.style';
import fakeData from '../fakeData';
import { tableinfos, configs } from './configs';
import * as TableViews from './tableViews/';
import Select, { SelectOption } from '../../../components/uielements/select';
import {
  DateRangePicker,
  SingleDatePicker
} from "../../../components/uielements/reactDates";
import { ReactDatesWrapper } from "./reactDates.style";
const Option = SelectOption;

const dataList = new fakeData(4);

export default class AntTable extends Component {
  constructor(props) {
    super(props);
    this.renderDatePicker = this.renderDatePicker.bind(this);
    
    this.state = {
      isRangePicker: false,
      configsValue: configs,
      singleFocused: false,
      singleResult: null,
      focusedInput: "startDate",
      startDate: null,
      endDate: null
    };
  }

  renderTable(tableInfo) {
    let Component;
    switch (tableInfo.value) {
      case 'sortView':
        Component = TableViews.SortView;
        break;
      case 'filterView':
        Component = TableViews.FilterView;
        break;
      case 'editView':
        Component = TableViews.EditView;
        break;
      case 'groupView':
        Component = TableViews.GroupView;
        break;
      case 'customizedView':
        Component = TableViews.CustomizedView;
        break;
      default:
        Component = TableViews.SimpleView;
    }
    return <Component tableInfo={tableInfo} dataList={dataList} />;
  }

  renderDatePicker(config) {    
    const {
      isRangePicker,
      startDate,
      endDate,
      focusedInput,
      singleResult,
      singleFocused,
      configsValue
    } = this.state;
    
    let options;
    if (isRangePicker) {
      options = {
        startDate,
        endDate,
        onDatesChange: ({ startDate, endDate }) =>
          this.setState({ startDate, endDate }),
        focusedInput,
        onFocusChange: focusedInput => {
          this.setState({ focusedInput });
        }
      };
    } else {
      options = {
        date: singleResult,
        onDateChange: singleResult => this.setState({ singleResult }),
        focused: singleFocused,
        onFocusChange: ({ focused }) =>
          this.setState({ singleFocused: focused })
      };
    }
    const renderOptions = isRangePicker
      ? configsValue[1].options
      : configsValue[0].options;
    renderOptions.forEach(option => {
      options[option.id] = option.value;
    });
    if (this.props.view === "MobileView") {
      options.numberOfMonths = 1;
    }
    return (
      <div className="isoReactDate">        
        {!isRangePicker ? (
          <SingleDatePicker {...options} />
        ) : (
          <DateRangePicker isOutsideRange={() => false} {...options} />
        )}        
      </div>
    );
  }

  render() {
    return (
      <LayoutContentWrapper>
        <TableDemoStyle className="isoLayoutContent">          
          <Select
            defaultValue="3 Days"
            onChange={this.handleChange}
            style={{ width: '200px' }}
          >
            <Option value="3 Days">3 Days</Option>
            <Option value="7 Days">7 Days</Option>            
            <Option value="14 Days">14 Days</Option>
            <Option value="30 Days">30 Days</Option>
          </Select>
          <Tabs className="isoTableDisplayTab">
            {tableinfos.map(tableInfo => (                              
              <TabPane tab={tableInfo.title} key={tableInfo.value}>
                {this.renderTable(tableInfo)}
              </TabPane>              
            ))}
          </Tabs>        
          <h2>Total Customers : 4</h2>  
        </TableDemoStyle>
      </LayoutContentWrapper>
    );
  }
}
export { TableViews, tableinfos, dataList };
