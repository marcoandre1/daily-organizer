import { take, put, select } from 'redux-saga/effects';
import * as mutations from './mutations';
import { v1 as uuid } from 'uuid';

/**
 * Reducers cannot have any randomness (they must be deterministic)
 * Since the action of creating a task involves generating a random ID, it is not pure.
 * When the response to an action is not deterministic in a Redux application, both Sagas and Thunks are appropriate.
 */
export function* taskCreationSaga(){
    while (true){
        const {groupID} = yield take(mutations.REQUEST_TASK_CREATION);
        const ownerID = 'U1';
        const taskID = uuid();
        yield put(mutations.createTask(taskID, groupID, ownerID));
    }
}

export function* commentCreationSaga(){
    while (true){
        const {taskID, content} = yield take(mutations.REQUEST_COMMENT_CREATION);
        const ownerID = 'U1';
        const commentID = uuid();
        yield put(mutations.createComment(commentID, taskID, ownerID, content));
    }
}
