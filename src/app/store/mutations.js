export const REQUEST_TASK_CREATION = `REQUEST_TASK_CREATION`;
export const CREATE_TASK = `CREATE_TASK`;
export const SET_TASK_COMPLETE = `SET_TASK_COMPLETE`;
export const SET_TASK_GROUP = `SET_TASK_GROUP`;
export const SET_TASK_NAME = `SET_TASK_NAME`;
export const REQUEST_COMMENT_CREATION = `REQUEST_COMMENT_CREATION`;
export const CREATE_COMMENT = `CREATE_COMMENT`;

export const requestTaskCreation = (groupID) => ({
    type: REQUEST_TASK_CREATION,
    groupID
});

export const createTask = (taskID, groupID, ownerID) => ({
    type: CREATE_TASK,
    taskID,
    groupID,
    ownerID
});

export const setTaskCompletion = (id, isComplete) => ({
    type: SET_TASK_COMPLETE,
    taskID: id,
    isComplete
});

export const setTaskGroup = (id, groupID) => ({
    type: SET_TASK_GROUP,
    taskID: id,
    groupID
});

export const setTaskName = (id, name) => ({
    type: SET_TASK_NAME,
    taskID: id,
    name
});

export const requestCommentCreation = (taskID) => ({
    type: REQUEST_COMMENT_CREATION,
    taskID,
});

export const createComment = (commentID, taskID, ownerID) => ({
    type: CREATE_COMMENT,
    commentID,
    taskID,
    ownerID
});
