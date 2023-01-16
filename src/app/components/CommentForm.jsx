import React from 'react';
import { connect } from 'react-redux';
import * as mutations from '../store/mutations';

const CommentForm = ({id, commentContent, setCommentContent, createNewComment}) => {
    return (
        <form className="form-inline" onSubmit={createNewComment}>        
            <input type="text" value={commentContent} onChange={setCommentContent} name="commentContent" autoComplete="off" placeholder="Add a comment" className="form-control"/>
            <button type="submit" className="btn">Submit</button>
        </form>
        
    );
}

function mapStateToProps(state, ownProps){
    let taskID = ownProps.id;
    return {
        id: taskID
    };
}

function mapDispatchToProps(dispatch, ownProps){
    let id = ownProps.id;
    let commentContent = ownProps.commentContent;
    return {
        setCommentContent(e){
            commentContent = e.target.value;
        },
        createNewComment(e) {
            dispatch(mutations.requestCommentCreation(id, commentContent));
            e.preventDefault();
            e.target.reset();
        }
    }
}

export const ConnectedCommentForm = connect(mapStateToProps, mapDispatchToProps)(CommentForm);