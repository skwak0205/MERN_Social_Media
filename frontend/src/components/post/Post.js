import { MoreVert } from '@material-ui/icons';
import './Post.css';

const Post = () => {
  return (
    <div className='post'>
      <div className='postWrapper'>
        <div className='postTop'>
          <div className='postTopLeft'>
            <img
              className='postProfileImg'
              src='/assets/person/1.jpeg'
              alt=''
            />

            <span className='postUsername'></span>

            <span className='postDate'></span>
          </div>

          <div className='postTopRight'>
            <MoreVert />
          </div>
        </div>

        <div className='postCenter'>
          <span className='postText'></span>
          <img className='postImg' src='assets/post/1.jpeg' alt='' />
        </div>

        <div className='postBottom'>
          <div className='postBottomLeft'>
            <img className='likeIcon' src='assets/like.png' alt='' />

            <img className='likeIcon' src='assets/heart.png' alt='' />

            <span className='postLikeCounter'> people like it</span>
          </div>

          <div className='postBottomRight'>
            <span className='postCommentText'> comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
