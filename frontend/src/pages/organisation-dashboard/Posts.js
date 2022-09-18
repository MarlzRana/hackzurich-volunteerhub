import { useEffect } from "react";
import { getUpdates } from "../../services/user.service";

const Posts = () => {
    useEffect(() => {
        console.log("test");
        getUpdates()
        .then(res => {
            console.log("a");
            console.log(res.data);
        });
    }, []);

    return (
        <div>
            <button>Create New Post</button>
            POSTS
        </div>
    );
}

export default Posts;