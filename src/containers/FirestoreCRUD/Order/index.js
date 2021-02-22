import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/orders/actions';
import Input, { Textarea } from '../../../components/uielements/input';
import Select, {
  SelectOption as Option,
} from '../../../components/uielements/select';
import Modal from '../../../components/feedback/modal';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper.js';
import Box from '../../../components/utility/box';
import ContentHolder from '../../../components/utility/contentHolder';
import Popconfirms from '../../../components/feedback/popconfirm';
import {
  ActionBtn,
  Fieldset,
  Form,
  Label,
  TitleWrapper,
  ButtonHolders,
  ActionWrapper,
  ComponentTitle,
  TableWrapper,
  StatusTag,
} from './orders.style';
import clone from 'clone';

class Orders extends Component {
  componentDidMount() {
    this.props.loadFromFireStore();
  }
  handleRecord = (actionName, order) => {
    if (order.key && actionName !== 'delete') actionName = 'update';
    this.props.saveIntoFireStore(order, actionName);
  };
  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (order = null) => {
    this.props.toggleModal(order);
  };

  onRecordChange = (key, event) => {
    let { order } = clone(this.props);
    if (key) order[key] = event.target.value;
    this.props.update(order);
  };

  onSelectChange = (key, value) => {
    let { order } = clone(this.props);
    if (key) order[key] = value;
    this.props.update(order);
  };

  render() {
    const { modalActive, orders } = this.props;
    const { order } = clone(this.props);
    const dataSource = [];
    Object.keys(orders).map((order, index) => {
      return dataSource.push({
        ...orders[order],
        key: order,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        width: '200px',
        sorter: (a, b) => {
          if (a.customer < b.customer) return -1;
          if (a.customer > b.customer) return 1;
          return 0;
        },
        render: (text, row) => {
          const trimByWord = sentence => {
            let result = sentence;
            let resultArray = result.split(' ');
            if (resultArray.length > 7) {
              resultArray = resultArray.slice(0, 7);
              result = resultArray.join(' ') + '...';
            }
            return result;
          };

          return trimByWord(row.customer);
        },
      },
      {
        title: 'Product',
        dataIndex: 'product',
        key: 'product',
        width: '360px',
        sorter: (a, b) => {
          if (a.product < b.product) return -1;
          if (a.product > b.product) return 1;
          return 0;
        },
        render: (text, row) => {
          const trimByWord = sentence => {
            let result = sentence;
            let resultArray = result.split(' ');
            if (resultArray.length > 20) {
              resultArray = resultArray.slice(0, 20);
              result = resultArray.join(' ') + '...';
            }
            return result;
          };

          return trimByWord(row.product);
        },
      },
      // {
      //   title: 'Excerpt',
      //   dataIndex: 'excerpt',
      //   key: 'excerpt',
      //   width: '220px',
      //   sorter: (a, b) => {
      //     if (a.excerpt < b.excerpt) return -1;
      //     if (a.excerpt > b.excerpt) return 1;
      //     return 0;
      //   },
      //   render: (text, row) => {
      //     const trimByWord = sentence => {
      //       let result = sentence;
      //       let resultArray = result.split(' ');
      //       if (resultArray.length > 8) {
      //         resultArray = resultArray.slice(0, 8);
      //         result = resultArray.join(' ') + '...';
      //       }
      //       return result;
      //     };

      //     return trimByWord(row.excerpt);
      //   },
      // },
      // {
      //   title: 'Slugs',
      //   dataIndex: 'slug',
      //   width: '170px',
      //   key: 'slug',
      //   sorter: (a, b) => {
      //     if (a.slug < b.slug) return -1;
      //     if (a.slug > b.slug) return 1;
      //     return 0;
      //   },
      // },
      {
        title: 'Type',
        dataIndex: 'type',
        className: 'noWrapCell',
        key: 'type',
        sorter: (a, b) => {
          if (a.type < b.type) return -1;
          if (a.type > b.type) return 1;
          return 0;
        },

        render: (text, row) => {
          let className;
          // if (row.type === ('draft' || 'Draft' || 'DRAFT')) {
            className = 'draft';
          // } else if (row.type === ('publish' || 'Publish' || 'PUBLISH')) {
          //   className = 'publish';
          // }
          return <StatusTag className={className}>{row.type}</StatusTag>;
        },
      },
      {
        title: 'Promotion',
        dataIndex: 'promotion',
        className: 'noWrapCell',
        key: 'promotion',
        sorter: (a, b) => {
          if (a.promotion < b.promotion) return -1;
          if (a.promotion > b.promotion) return 1;
          return 0;
        },

        render: (text, row) => {
          let className;
          // if (row.type === ('draft' || 'Draft' || 'DRAFT')) {
            // className = 'draft';
          // } else if (row.type === ('publish' || 'Publish' || 'PUBLISH')) {
            className = 'publish';
          // }
          return <StatusTag className={className}>{row.promotion}</StatusTag>;
        },
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        width: '220px',
        sorter: (a, b) => {
          if (a.amount < b.amount) return -1;
          if (a.amount > b.amount) return 1;
          return 0;
        },
        render: (text, row) => {
          const trimByWord = sentence => {
            let result = sentence;
            // let resultArray = result.split(' ');
            // if (resultArray.length > 8) {
            //   resultArray = resultArray.slice(0, 8);
            //   result = resultArray.join(' ') + '...';
            // }
            return result;
          };

          return trimByWord(row.amount);
        },
      },
      {
        title: 'Actions',
        key: 'action',
        width: '60px',
        className: 'noWrapCell',
        render: (text, row) => {
          return (
            <ActionWrapper>
              <a onClick={this.handleModal.bind(this, row)} href="# ">
                <i className="ion-android-create" />
              </a>

              <Popconfirms
                title="Are you sure to delete this order？"
                okText="Yes"
                cancelText="No"
                placement="topRight"
                onConfirm={this.handleRecord.bind(this, 'delete', row)}
              >
                <a className="deleteBtn" href="# ">
                  <i className="ion-android-delete" />
                </a>
              </Popconfirms>
            </ActionWrapper>
          );
        },
      },
    ];

    return (
      <LayoutContentWrapper>
        <Box>
          <ContentHolder style={{ marginTop: 0, overflow: 'hidden' }}>
            <TitleWrapper>
              <ComponentTitle>Orders</ComponentTitle>

              <ButtonHolders>
                {/* <ActionBtn type="danger" onClick={this.resetRecords}>
                  Reset record
                </ActionBtn> */}

                <ActionBtn
                  type="primary"
                  onClick={this.handleModal.bind(this, null)}
                >
                  Add new record
                </ActionBtn>
              </ButtonHolders>
            </TitleWrapper>

            <Modal
              visible={modalActive}
              onClose={this.props.toggleModal.bind(this, null)}
              title={order.key ? 'Update Order' : 'Add New Order'}
              okText={order.key ? 'Update Order' : 'Add Order'}
              onOk={this.handleRecord.bind(this, 'insert', order)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Customer</Label>
                  <Input
                    label="Customer"
                    placeholder="Enter Customer"
                    value={order.customer}
                    onChange={this.onRecordChange.bind(this, 'customer')}
                  />
                </Fieldset>

                {/* <Fieldset>
                  <Label>Description</Label>
                  <Textarea
                    label="Description"
                    placeholder="Enter Description"
                    rows={5}
                    value={order.description}
                    onChange={this.onRecordChange.bind(this, 'description')}
                  />
                </Fieldset> */}

                <Fieldset>
                  <Label>Product</Label>
                  <Input
                    label="Product"
                    rows={5}
                    placeholder="Enter Product"
                    value={order.product}
                    onChange={this.onRecordChange.bind(this, 'product')}
                  />
                </Fieldset>

                {/* <Fieldset>
                  <Label>Slug</Label>

                  <Input
                    label="Slug"
                    placeholder="Enter Slugs"
                    value={order.slug}
                    onChange={this.onRecordChange.bind(this, 'slug')}
                  />
                </Fieldset> */}

                <Fieldset>
                  <Label>Type</Label>
                  <Select
                    defaultValue={order.type}
                    placeholder="Enter Type"
                    onChange={this.onSelectChange.bind(this, 'type')}
                    style={{ width: '170px' }}
                  >
                    <Option value="TopUp">TopUp</Option>
                    <Option value="Withdrawal">Withdrawal</Option>
                  </Select>
                </Fieldset>

                <Fieldset>
                  <Label>Promotion</Label>
                  <Select
                    defaultValue={order.promotion}
                    placeholder="Enter Promotion"
                    onChange={this.onSelectChange.bind(this, 'promotion')}
                    style={{ width: '170px' }}
                  >
                    <Option value="Rebate">Rebate</Option>
                    <Option value="Welcome To Bonus">Welcome to Bonus</Option>
                    <Option value="Daily Bonus">Daily Bonus</Option>
                  </Select>
                </Fieldset>


                <Fieldset>
                  <Label>Amount</Label>
                  <Input
                    label="Amount"
                    placeholder="Enter Amount"
                    value={order.amount}
                    onChange={this.onRecordChange.bind(this, 'amount')}
                  />
                </Fieldset>
              </Form>
            </Modal>
            <TableWrapper
              rowKey="key"
              rowSelection={rowSelection}
              columns={columns}
              bordered={true}
              dataSource={dataSource}
              loading={this.props.isLoading}
              className="isoSimpleTable"
              pagination={{
                // defaultPageSize: 1,
                hideOnSinglePage: true,
                total: dataSource.length,
                showTotal: (total, range) => {
                  return `Showing ${range[0]}-${range[1]} of ${
                    dataSource.length
                  } Results`;
                },
              }}
            />
          </ContentHolder>
        </Box>
      </LayoutContentWrapper>
    );
  }
}

export default connect(
  state => ({
    ...state.Orders,
  }),
  actions
)(Orders);
