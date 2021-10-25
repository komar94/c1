import Paginator from "./Paginator";
import { FC } from "react";
import { generatePath, Link } from "react-router-dom";
import useGetImages from "../hooks/useGetImages";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../ErrorFallback";
import Loader from "../shared/Loader";
import { ImageEditorPath } from "../consts";

const ImageList: FC = () => {
  const { data, status, error, next, previous, hasNext, hasPrevious } =
    useGetImages();

  if (status === "loading") {
    return <Loader />;
  }

  if (status === "error") {
    throw error;
  }

  return (
    <>
      <div role="listbox">
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
      </div>
      <Paginator
        onNextClicked={next}
        onPreviousClicked={previous}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      />
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
    <div role="listitem" className="inline-block md:w-full lg:w-1/3 px-4 mb-8">
      <Link to={generatePath(ImageEditorPath, { id, width, height })}>
        <img
          width="367"
          height="267"
          alt={`by ${author}`}
          src={createImageUrl(id)}
        />
      </Link>
      <div>{author}</div>
    </div>
  );
};

const SafeImageList: FC = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <ImageList />
  </ErrorBoundary>
);

export default SafeImageList;
