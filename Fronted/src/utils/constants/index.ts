// Env variables
export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE;
export const APP_NAME = import.meta.env.VITE_REACT_APP_NAME;
export const SOCKET_BASE = import.meta.env.VITE_REACT_SOCKET_BASE;

// Local Storage Variables
export const LocalStorageKeys = {
  user: `user${APP_NAME}`,
  authToken: `authToken${APP_NAME}`,
};

// Api Endpoint
export const ApiEndPoints = {
  uploadIImage: {
    uploadImage: `common/file-upload/uploadSingleFile`,
  },
  auth: {
    signIn: `auth/login`,
    register: `auth/signup`,
  },
  project: {
    projectList: `project/list`,
    projectDetail: `project/getDetails`,
    projectAdd: `project/create`,
    projectEdit: `project/update`,
    projectDelete: `project/delete`,
  },
  task: {
    taskList: `task/list`,
    taskDetail: `task/getDetails`,
    taskAdd: `task/create`,
    taskEdit: `task/update`,
    taskDelete: `task/delete`,
  },
  user: {
    userList: `admin/users/list`,
    userDetail: `admin/users/getDetails`,
    userEdit: `admin/users/update`,
    userDelete: `admin/users/delete`,
    userAll: `admin/users/getAll`,
  },
};

export const GENDER_LIST = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
];

export const USER_GENDER = {
  '1': 'Male',
  '0': 'Female',
};

export const TASK_PRIORITY_ENUM = {
  '0': 'LOW',
  '1': 'MEDIUM',
  '2': 'HIGH',
  '3': 'CRITICAL',
};

export const TASK_STATUS_ENUM = {
  '0': 'NOT_STARTED',
  '1': 'IN_PROGRESS',
  '2': 'COMPLETED',
  '3': 'ON_HOLD',
};

export const TASK_PRIORITY = [
  {
    label: 'Low',
    value: 'LOW',
  },
  {
    label: 'Medium',
    value: 'MEDIUM',
  },
  {
    label: 'High',
    value: 'HIGH',
  },
  {
    label: 'Critical',
    value: 'CRITICAL',
  },
];

export const TASK_STATUS = [
  {
    label: 'Not Started',
    value: 'NOT_STARTED',
  },
  {
    label: 'In Progress',
    value: 'IN_PROGRESS',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
  {
    label: 'On Hold',
    value: 'ON_HOLD',
  },
];
