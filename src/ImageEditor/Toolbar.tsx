import { FC, useEffect, useReducer } from "react";
import Slider from "../shared/Slider";
import { generatePath, useHistory } from "react-router-dom";
import { ImageEditorPath } from "../consts";
import { useDebouncedCallback } from "use-debounce";

declare type ToolbarState = {
  blur: number | null;
  grayscale: boolean;
  height: number;
  width: number;
};

type Action =
  | { type: "blur"; value: number }
  | { type: "grayscale"; value: boolean }
  | { type: "width"; value: number }
  | { type: "height"; value: number };

function toolbarReducer(state: ToolbarState, action: Action): ToolbarState {
  const aspectRatio = state.width / state.height;
  console.log(action);
  switch (action.type) {
    case "blur": {
      return {
        ...state,
        blur: action.value === 0 ? null : Math.min(10, action.value),
      };
    }
    case "grayscale": {
      return {
        ...state,
        grayscale: action.value,
      };
    }
    case "height":
      return {
        ...state,
        height: Math.round(action.value),
        width: Math.round(action.value * aspectRatio),
      };
    case "width":
      return {
        ...state,
        height: Math.round(action.value / aspectRatio),
        width: Math.round(action.value),
      };
    default: {
      return state;
    }
  }
}

const initialState: ToolbarState = {
  blur: null,
  grayscale: false,
  width: 0,
  height: 0,
};

const Toolbar: FC<{
  height: number;
  width: number;
  id: string;
}> = ({ width: originalWidth, height: originalHeight, id }) => {
  const [state, dispatch] = useReducer(toolbarReducer, initialState, (x) => ({
    ...x,
    width: originalWidth,
    height: originalHeight,
  }));
  const history = useHistory();

  const { blur, grayscale, width, height } = state;

  const debouncedHistoryPush = useDebouncedCallback(
    (arg) => history.push(arg),
    200
  );

  useEffect(() => {
    const params = new URLSearchParams();
    setUrlParam(params, "grayscale", grayscale);
    setUrlParam(params, "blur", blur);
    const search = params.toString();
    const param = {
      pathname: generatePath(ImageEditorPath, { id, width, height }),
      search,
    };
    debouncedHistoryPush(param);
  }, [blur, grayscale, width, height, debouncedHistoryPush, id]);

  return (
    <div className="flex justify-between">
      <div>
        <label>
          <span className="text-gray-700">Blur: </span>
          <Slider
            className="
                    mt-1
                    block
                  "
            max={10}
            min={0}
            value={blur || 0}
            onChange={(e) =>
              dispatch({ type: "blur", value: Number(e.target.value) })
            }
          ></Slider>
        </label>
      </div>
      <div>
        <label className="inline-flex items-center pt-2">
          <span className="text-gray-700 mr-2">Grayscale</span>
          <input
            className="
                    mt-1
                    block
                  "
            type="checkbox"
            onChange={(e) =>
              dispatch({ type: "grayscale", value: e.target.checked })
            }
          />
        </label>
      </div>
      <div>
        <label className="block">
          <span className="text-gray-700">Width: </span>
          <input
            type="number"
            className="w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={width}
            onChange={(e) =>
              dispatch({ type: "width", value: Number(e.target.value) })
            }
          />
        </label>
      </div>
      <div>
        <label className="block">
          <span className="text-gray-700">Height: </span>
          <input
            type="number"
            className=" w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={height}
            onChange={(e) =>
              dispatch({ type: "height", value: Number(e.target.value) })
            }
          />
        </label>
      </div>
    </div>
  );
};

function setUrlParam(
  params: URLSearchParams,
  key: string,
  value: number | boolean | null
) {
  if (value) {
    params.set(key, value.toString());
  } else {
    params.delete(key);
  }
}

export default Toolbar;
