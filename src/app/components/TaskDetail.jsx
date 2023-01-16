/**
 * The task detail component route is a more sophisticated form that has many different fields.
 * The component automatically calls the REST API [via a mutation] to update the server on every change.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';
import { ConnectedCommentForm } from './CommentForm';

const TaskDetail = ({
                        id,
                        comments,
                        task,
                        isComplete,
                        groups,
                        setTaskCompletion,
                        setTaskGroup,
                        setTaskName
                    }) => {
    return (
        <div className="card p-3 col-6">
            <div>
                <input type="text" value={task.name} onChange={setTaskName} className="form-control form-control-lg"/>
            </div>

            <button  className="btn btn-primary ml-2" onClick={() => setTaskCompletion(id, !isComplete)}>
                {isComplete ? `Reopen` : `Complete`} This Task
            </button>

            <form className="form-inline">
                <span className="mr-4">
                    Change Group
                </span>
                <select onChange={setTaskGroup} value={task.group} className="form-control">
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>
                            {group.name}
                        </option>
                    ))}
                </select>
            </form>

            <div>
                {comments.map(comment => (
                    <span key={comment.id}>
                        <div>{comment.content}</div>
                    </span>
                ))}
            </div>

            <ConnectedCommentForm id={task.id}/>

            <div>
                <Link to={`${REPO}/dashboard`}>
                    <button className="btn btn-primary mt-2">
                        Done
                    </button>
                </Link>
            </div>
        </div>
    )
}

function mapStateToProps(state, ownProps){
    let id = ownProps.match.params.id;
    let task = state.tasks.find(task => task.id === id);
    let groups = state.groups;
    let comments = state.comments.filter(comment => comment.task === id)

    return {
        id,
        task,
        groups,
        isComplete: task.isComplete,
        comments
    }
}

function mapDispatchToProps(dispatch, ownProps){
    let id = ownProps.match.params.id;
    return {
        setTaskCompletion(id, isComplete){
            dispatch(mutations.setTaskCompletion(id, isComplete));
        },
        setTaskGroup(e){
            dispatch(mutations.setTaskGroup(id, e.target.value));
        },
        setTaskName(e){
            dispatch(mutations.setTaskName(id, e.target.value));
        }
    }
}

export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
