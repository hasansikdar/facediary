import React from 'react';
import Comment from './Comment/Comment';

const Comments = ({comments, DeleteComment}) => {
    return (
        <div>
            {
                comments.map(cm => <Comment DeleteComment={DeleteComment} cm={cm}></Comment>)
            }
        </div>
    );
};

export default Comments;