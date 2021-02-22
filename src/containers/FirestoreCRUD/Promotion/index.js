import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../../redux/promotions/actions';
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
} from './promotions.style';
import clone from 'clone';

class Promotions extends Component {
  componentDidMount() {
    this.props.loadFromFireStore();
  }
  handleRecord = (actionName, promotion) => {
    if (promotion.key && actionName !== 'delete') actionName = 'update';
    this.props.saveIntoFireStore(promotion, actionName);
  };
  resetRecords = () => {
    this.props.resetFireStoreDocuments();
  };

  handleModal = (promotion = null) => {
    this.props.toggleModal(promotion);
  };

  onRecordChange = (key, event) => {
    let { promotion } = clone(this.props);
    if (key) promotion[key] = event.target.value;
    this.props.update(promotion);
  };

  onSelectChange = (key, value) => {
    let { promotion } = clone(this.props);
    if (key) promotion[key] = value;
    this.props.update(promotion);
  };

  render() {
    const { modalActive, promotions } = this.props;
    const { promotion } = clone(this.props);
    const dataSource = [];
    Object.keys(promotions).map((promotion, index) => {
      return dataSource.push({
        ...promotions[promotion],
        key: promotion,
      });
    });

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {},
    };

    const columns = [
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
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        // width: '360px',
        sorter: (a, b) => {
          if (a.description < b.description) return -1;
          if (a.description > b.description) return 1;
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

          return trimByWord(row.description);
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
        title: 'Rule',
        dataIndex: 'rule',
        className: 'noWrapCell',
        key: 'rule',
        sorter: (a, b) => {
          if (a.rule < b.rule) return -1;
          if (a.rule > b.rule) return 1;
          return 0;
        },

        render: (text, row) => {
          let className;
          // if (row.rule === ('draft' || 'Draft' || 'DRAFT')) {
          //   className = 'draft';
          // } else if (row.rule === ('publish' || 'Publish' || 'PUBLISH')) {
            className = 'publish';
          // }
          return <StatusTag className={className}>{row.rule}</StatusTag>;
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
                title="Are you sure to delete this promotion？"
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
              <ComponentTitle>Promotions</ComponentTitle>

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
              title={promotion.key ? 'Update Promotion' : 'Add New Promotion'}
              okText={promotion.key ? 'Update Promotion' : 'Add Promotion'}
              onOk={this.handleRecord.bind(this, 'insert', promotion)}
              onCancel={this.props.toggleModal.bind(this, null)}
            >
              <Form>
                <Fieldset>
                  <Label>Name</Label>
                  <Input
                    label="Name"
                    placeholder="Enter Name"
                    value={promotion.name}
                    onChange={this.onRecordChange.bind(this, 'name')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Description</Label>
                  <Textarea
                    label="Description"
                    placeholder="Enter Description"
                    rows={5}
                    value={promotion.description}
                    onChange={this.onRecordChange.bind(this, 'description')}
                  />
                </Fieldset>

                {/* <Fieldset>
                  <Label>Excerpt</Label>
                  <Textarea
                    label="Excerpt"
                    rows={5}
                    placeholder="Enter excerpt"
                    value={promotion.excerpt}
                    onChange={this.onRecordChange.bind(this, 'excerpt')}
                  />
                </Fieldset>

                <Fieldset>
                  <Label>Slug</Label>

                  <Input
                    label="Slug"
                    placeholder="Enter Slugs"
                    value={promotion.slug}
                    onChange={this.onRecordChange.bind(this, 'slug')}
                  />
                </Fieldset> */}

                <Fieldset>
                  <Label>Rule</Label>
                  <Select
                    defaultValue={promotion.rule}
                    placeholder="Enter Rule"
                    onChange={this.onSelectChange.bind(this, 'rule')}
                    style={{ width: '170px' }}
                  >
                    <Option value="Rebate">Rebate</Option>
                    <Option value="Welcome To Bonus">Welcome to Bonus</Option>
                    <Option value="Daily Bonus">Daily Bonus</Option>
                  </Select>
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
    ...state.Promotions,
  }),
  actions
)(Promotions);
