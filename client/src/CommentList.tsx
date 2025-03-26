import { Comment } from '../src/types/comments';

const CommentList = ({ comments }: { comments: Comment[] }) => {
  // const [comments, setComments] = useState<Comment[]>([]);

  // const fetchData = async () => {
  //   const res = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );

  //   setComments(res.data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const renderedComments = comments?.map((comment) => {
    let content = '';

    switch (comment.status) {
      case 'approved':
        content = comment.content;
        break;
      case 'pending':
        content = 'This comment is awaiting moderation';
        break;
      case 'rejected':
        content = 'This comment has been rejected';
        break;
      default:
        console.log('Content is empty or unrecognized');
        break;
    }
    return <li key={comment.id}>{content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};

export default CommentList;
