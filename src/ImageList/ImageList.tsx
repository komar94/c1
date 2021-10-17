import Paginator from "./Paginator";
import { FC } from "react";
import { Link } from "react-router-dom";
import useGetImages from "./hooks/useGetImages";
import usePagination from "./hooks/usePagination";

const ImageList: FC = () => {
  const { nextPage, prevPage, page } = usePagination(1);
  const { data, isError, isLoading } = useGetImages(page);

  if (isLoading) {
    return <p role="progressbar">Loading...</p>;
  }

  if (isError) {
    return (
      <p>Picture service is currently unavailable. Please try again later.</p>
    );
  }

  return (
    <>
      <div className="bg-gray-100 rounded-xl p-8">ImageList</div>
      <ul>
        {data?.map(({ id, author, download_url: url, width, height }) => (
          <ImageItem
            key={id}
            author={author}
            url={url}
            id={id}
            width={width}
            height={height}
          />
        ))}
      </ul>
      <Paginator onNextClicked={nextPage} onPreviousClicked={prevPage} />
    </>
  );
};

function createImageUrl(id: string) {
  return `https://picsum.photos/id/${id}/${367}/${267}`;
}

const ImageItem: FC<{
  url: string;
  author: string;
  id: string;
  width: number;
  height: number;
}> = ({ author, id, height, width }) => {
  return (
    <li className="md:w-full lg:w-1/3 px-4 mb-8">
      <Link to={`/edit/${id}/${height}/${width}`}>
        <img
          width="200"
          height="200"
          alt={`by ${author}`}
          src={createImageUrl(id)}
        />
      </Link>
      <div>{author}</div>
    </li>
  );
};

export default ImageList;
