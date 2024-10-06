import { IList } from 'components/common/interface/list.interface';

export const authKeys = {
  signin: ['auth-signin-key'],
  register: ['auth-register-key']
};

export const projectKeys = {
  projectList: (data: IList) => [
    `project-list`,
    `${data?.limit}`,
    `${data?.page}`,
    `${data?.search ?? ''}`,
    `${data?.sort_by ?? ''}`,
    `${data?.sort_order ?? ''}`
  ],
  projectDetail: (id: string) => [`project-detail-${id}`],
  projectDelete: [`project-delete`],
  projectAdd: [`add-project`],
  projectUpdate: [`edit-project`]
};

export const taskKeys = {
  taskList: (data: IList) => [
    `task-list`,
    `${data?.limit}`,
    `${data?.page}`,
    `${data?.search ?? ''}`,
    `${data?.sort_by ?? ''}`,
    `${data?.sort_order ?? ''}`,
    `${data?.projectId ?? ''}`
  ],
  taskDetail: (id: string) => [`task-detail-${id}`],
  taskDelete: [`task-delete`],
  taskAdd: [`add-task`],
  taskUpdate: [`edit-task`]
};

export const userKeys = {
  userList: (data: IList) => [
    `user-list`,
    `${data?.limit}`,
    `${data?.page}`,
    `${data?.search ?? ''}`,
    `${data?.sort_by ?? ''}`,
    `${data?.sort_order ?? ''}`
  ],
  userDetail: (id: string) => [`user-detail-${id}`],
  userDelete: [`user-delete`],
  userAdd: [`add-user`],
  userUpdate: [`edit-user`],
  userAll: [`all-user`]
};

export const profileKey = {
  profileDetail: [`profile-detail`],
  profileEdit: [`profile-edit`],
  profileUpload: [`profile-upload`]
};

export const chatKey = {
  chatList: [`chat-list`],
  chatHistory: (roomId: string) => [`chat-history-${roomId ?? ''}`]
};
