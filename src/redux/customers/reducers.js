import actions from './actions';

const initState = {
  isLoading: false,
  errorMessage: false,
  customers: {},
  modalActive: false,
  customer: {
    key: null,
    id: new Date().getTime(),
    customer_id:'',
    name:'',    
    // title: '',
    // slug: '',
    // excerpt: '',
    // status: 'draft', // publish
    // description: '',
    phone:'',
    race:'',
    created_at: new Date().getTime(),
    deleted_at: null, // soft delete
  },
};

export default function reducer(
  state = initState,
  { type, payload, newRecord }
) {
  switch (type) {
    case actions.LOAD_FROM_FIRESTORE:
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        modalActive: false,
      };
    case actions.LOAD_FROM_FIRESTORE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customers: payload.data,
        errorMessage: false,
      };
    case actions.LOAD_FROM_FIRESTORE_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: 'There is a loading problem',
      };
    case actions.TOGGLE_FIRESTORE_HANDLE_MODAL:
      return {
        ...state,
        modalActive: !state.modalActive,
        customer: payload.data == null ? initState.customer : payload.data,
      };
    case actions.FIRESTORE_UPDATE:
      return {
        ...state,
        customer: payload.data,
      };
    default:
      return state;
  }
}
