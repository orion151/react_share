import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/customers/actions';
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
} from './customers.style';
import clone from 'clone';

class Customers extends Component {
  componentDidMount() {
    this.props.loadFromFireStore();
  }
  handleRecord = (actionName, customer) => {
    if (customer.key && actionName !== 'delete') actionName = 'update';
    this.props.saveIntoFireStore(customer, actionName);
  };
  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (customer = null) => {
    this.props.toggleModal(customer);
  };

  onRecordChange = (key, event) => {
    let { customer } = clone(this.props);
    if (key) customer[key] = event.target.value;
    this.props.update(customer);
  };

  onSelectChange = (key, value) => {
    let { customer } = clone(this.props);
    if (key) customer[key] = value;
    this.props.update(customer);
  };

  render() {
    const { modalActive, customers } = this.props;
    const { customer } = clone(this.props);
    const dataSource = [];
    Object.keys(customers).map((customer, index) => {
      return dataSource.push({
        ...customers[customer],
        key: customer,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
      {
        title: 'ID',
        dataIndex: 'customer_id',
        key: 'customer_id',
        // width: '200px',
        sorter: (a, b) => {
          if (a.customer_id < b.customer_id) return -1;
          if (a.customer_id > b.customer_id) return 1;
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

          return trimByWord(row.customer_id);
        },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // width: '200px',
        sorter: (a, b) => {
          if (a.name < b.name) return -1;
          if (a.name > b.name) return 1;
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

          return trimByWord(row.name);
        },
      },
      // {
      //   title: 'Description',
      //   dataIndex: 'description',
      //   key: 'description',
      //   // width: '360px',
      //   sorter: (a, b) => {
      //     if (a.description < b.description) return -1;
      //     if (a.description > b.description) return 1;
      //     return 0;
      //   },
      //   render: (text, row) => {
      //     const trimByWord = sentence => {
      //       let result = sentence;
      //       let resultArray = result.split(' ');
      //       if (resultArray.length > 20) {
      //         resultArray = resultArray.slice(0, 20);
      //         result = resultArray.join(' ') + '...';
      //       }
      //       return result;
      //     };

      //     return trimByWord(row.description);
      //   },
      // },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
        // width: '220px',
        sorter: (a, b) => {
          if (a.phone < b.phone) return -1;
          if (a.phone > b.phone) return 1;
          return 0;
        },
        render: (text, row) => {
          const trimByWord = sentence => {
            let result = sentence;
            let resultArray = result.split(' ');
            if (resultArray.length > 8) {
              resultArray = resultArray.slice(0, 8);
              result = resultArray.join(' ') + '...';
            }
            return result;
          };

          return trimByWord(row.phone);
        },
      },
      {
        title: 'Race',
        dataIndex: 'race',
        key: 'race',
        // width: '220px',
        sorter: (a, b) => {
          if (a.race < b.race) return -1;
          if (a.race > b.race) return 1;
          return 0;
        },
        render: (text, row) => {
          const trimByWord = sentence => {
            let result = sentence;
            let resultArray = result.split(' ');
            if (resultArray.length > 8) {
              resultArray = resultArray.slice(0, 8);
              result = resultArray.join(' ') + '...';
            }
            return result;
          };

          return trimByWord(row.race);
        },
      },
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
      // {
      //   title: 'Status',
      //   dataIndex: 'status',
      //   className: 'noWrapCell',
      //   key: 'status',
      //   sorter: (a, b) => {
      //     if (a.status < b.status) return -1;
      //     if (a.status > b.status) return 1;
      //     return 0;
      //   },

      //   render: (text, row) => {
      //     let className;
      //     if (row.status === ('draft' || 'Draft' || 'DRAFT')) {
      //       className = 'draft';
      //     } else if (row.status === ('publish' || 'Publish' || 'PUBLISH')) {
      //       className = 'publish';
      //     }
      //     return <StatusTag className={className}>{row.status}</StatusTag>;
      //   },
      // },
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
                title="Are you sure to delete this customer？"
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
              <ComponentTitle>Customers</ComponentTitle>

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
              title={customer.key ? 'Update Customer' : 'Add New Customer'}
              okText={customer.key ? 'Update Customer' : 'Add Customer'}
              onOk={this.handleRecord.bind(this, 'insert', customer)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                    <Label>ID</Label>
                    <Input
                      label="ID"
                      placeholder="Enter ID"
                      value={customer.customer_id}
                      onChange={this.onRecordChange.bind(this, 'customer_id')}
                    />
                </Fieldset>
                <Fieldset>
                  <Label>Name</Label>
                  <Input
                    label="Name"
                    placeholder="Enter Name"
                    value={customer.name}
                    onChange={this.onRecordChange.bind(this, 'name')}
                  />
                </Fieldset>

                {/* <Fieldset>
                  <Label>Description</Label>
                  <Textarea
                    label="Description"
                    placeholder="Enter Description"
                    rows={5}
                    value={customer.description}
                    onChange={this.onRecordChange.bind(this, 'description')}
                  />
                </Fieldset> */}

                <Fieldset>
                  <Label>Phone</Label>
                  <Input
                    label="Phone"
                    rows={5}
                    placeholder="Enter Phone"
                    value={customer.phone}
                    onChange={this.onRecordChange.bind(this, 'phone')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Race</Label>
                  <Input
                    label="Race"
                    rows={5}
                    placeholder="Enter Race"
                    value={customer.race}
                    onChange={this.onRecordChange.bind(this, 'race')}
                  />
                </Fieldset>

                {/* <Fieldset>
                  <Label>Slug</Label>

                  <Input
                    label="Slug"
                    placeholder="Enter Slugs"
                    value={customer.slug}
                    onChange={this.onRecordChange.bind(this, 'slug')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Status</Label>
                  <Select
                    defaultValue={customer.status}
                    placeholder="Enter Status"
                    onChange={this.onSelectChange.bind(this, 'status')}
                    style={{ width: '170px' }}
                  >
                    <Option value="draft">Draft</Option>
                    <Option value="publish">Publish</Option>
                  </Select>
                </Fieldset> */}
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
    ...state.Customers,
  }),
  actions
)(Customers);
