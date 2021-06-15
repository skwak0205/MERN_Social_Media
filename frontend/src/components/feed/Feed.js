import Share from '../share/Share';
import Post from '../post/Post';
import { Posts } from '../../dummyData';
import './Feed.css';

const Feed = () => {
  return (
    <div className='feed'>
      <div className='feedWrapper'>
        <Share />

        {Posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
