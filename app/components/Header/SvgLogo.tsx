import Link from "next/link";
import React, { Fragment } from "react";
import { type SvgLogoProps } from "../InterfaceType";

type IconType = "iconA" | "iconB" | "iconC";

interface LogoProps extends SvgLogoProps {
  type: "logo";
}

interface IconProps extends SvgLogoProps {
  type: IconType;
  text: string[];
}

type SvgLogoType = LogoProps | IconProps;
function SvgLogo(props: SvgLogoType) {
  const { width, height, type } = props;
  if (type == "logo") {
    return (
      <Link href="/" className="flex items-center space-x-2 text-xl">
        <svg
          preserveAspectRatio="xMidYMid meet"
          viewBox="10 55 180 90"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Logo"
          className="fill-current text-white"
        >
          <g>
            <path d="M55 122.5c0 12.426-10.074 22.5-22.5 22.5S10 134.926 10 122.5 20.074 100 32.5 100 55 110.074 55 122.5z" />
            <path d="M167.5 100c-21.039 0-22.501-17.017-22.525-21.453.016-.347.025-.696.025-1.047 0-12.426-10.074-22.5-22.5-22.5h-45C65.074 55 55 65.074 55 77.5S65.074 100 77.5 100h45c20.596 0 22.58 14.832 22.597 20.411A22.889 22.889 0 0 0 145 122.5c0 12.426 10.074 22.5 22.5 22.5s22.5-10.074 22.5-22.5-10.074-22.5-22.5-22.5z" />
          </g>
        </svg>
        <p className="font-semibold">autopile</p>
      </Link>
    );
  }
  if (type == "iconA") {
    const { text } = props;
    return (
      <div className="flex items-center mt-16 gap-5">
        <svg
          className="text-white fill-current "
          preserveAspectRatio="xMidYMid meet"
          viewBox="39.995 10 120.005 180.006"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Abstract shape icon"
        >
          <g>
            <path d="M130 70c-28.052 0-30.002-22.69-30.033-28.604.021-.463.033-.928.033-1.396 0-16.569-13.431-30-30-30-16.569 0-30 13.431-30 30 0 16.569 13.431 30 30 30 27.462 0 30.107 19.776 30.13 27.215-.085.917-.13 1.846-.13 2.785 0 16.568 13.431 30 30 30 16.569 0 30-13.431 30-30 0-16.569-13.431-30-30-30z" />
            <path d="M81.483 132.282c15.308 6.34 22.577 23.889 16.236 39.197-6.34 15.307-23.889 22.576-39.197 16.236-15.307-6.341-22.576-23.89-16.236-39.197 6.341-15.308 23.89-22.577 39.197-16.236z" />
          </g>
        </svg>
        <div className="w-1 h-20 bg-orange-500" />
        <p>
          {text.map((line, index) => (
            <Fragment key={index}>
              {index === 1 ? <i>{line}</i> : line}
              {index < text.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      </div>
    );
  }
  if (type == "iconB") {
    const { text } = props;
    return (
      <div className="flex items-center mt-16 gap-5">
        <svg
          className="text-white fill-current "
          preserveAspectRatio="xMidYMid meet"
          data-bbox="10 10 180 180"
          viewBox="10 10 180 180"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          data-type="shape"
          role="presentation"
          aria-hidden="true"
        >
          <g>
            <path d="M130 40c0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30z" />
            <path d="M130 160c0 16.569-13.431 30-30 30-16.569 0-30-13.431-30-30 0-16.569 13.431-30 30-30 16.569 0 30 13.431 30 30z" />
            <path d="M160 70a29.883 29.883 0 0 0-20.073 7.709v-.002c-42.182 30.214-79.856 0-79.856 0A29.883 29.883 0 0 0 40 70c-16.568 0-30 13.432-30 30s13.432 30 30 30a29.873 29.873 0 0 0 19.306-7.044c41.307-26.483 80.621-.664 80.621-.664v-.001A29.883 29.883 0 0 0 160 130c16.569 0 30-13.431 30-30s-13.431-30-30-30z" />
          </g>
        </svg>
        <div className="w-1 h-20 bg-orange-500" />
        <p>
          {text.map((line, index) => (
            <Fragment key={index}>
              {index === 1 ? <i>{line}</i> : line}
              {index < text.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      </div>
    );
  }
  if (type == "iconC") {
    const { text } = props;
    return (
      <div className="flex items-center mt-16 gap-5">
        <svg
          className="text-white fill-current "
          preserveAspectRatio="xMidYMid meet"
          data-bbox="10 9.983 180.001 180.034"
          viewBox="10 9.983 180.001 180.034"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          data-type="shape"
          role="presentation"
          aria-hidden="true"
        >
          <g>
            <path d="M189.318 145.617a37.186 37.186 0 0 0-2.362-7.633 37.17 37.17 0 0 0-7.874-11.607c-24.649-24.649-6.425-46.299-1.256-51.523.425-.388.845-.786 1.256-1.198 14.558-14.558 14.558-38.162 0-52.721-14.559-14.558-38.162-14.558-52.721 0-14.558 14.559-14.558 38.162 0 52.721 24.13 24.13 9.078 43.83 2.561 50.388-.182.151-.358.313-.539.468-.24.207-.482.41-.717.624a36.2 36.2 0 0 0-1.305 1.241c-24.649 24.649-46.299 6.425-51.523 1.256a37.158 37.158 0 0 0-1.198-1.256c-14.558-14.558-38.162-14.558-52.721 0-14.558 14.558-14.558 38.162 0 52.721 14.558 14.558 38.162 14.558 52.721 0 24.13-24.13 43.83-9.078 50.388-2.561.15.181.311.356.465.535.208.241.412.484.627.721.398.438.807.87 1.229 1.293l.011.012a37.275 37.275 0 0 0 9.024 6.654 37.094 37.094 0 0 0 3.724 1.692c1.227.481 2.475.891 3.737 1.237a37.32 37.32 0 0 0 4.164.892c.191.029.381.06.572.086 1.69.234 3.393.355 5.096.357l.043.001a37.432 37.432 0 0 0 12.333-2.09 37.008 37.008 0 0 0 6.61-3.071 37.704 37.704 0 0 0 9.977-8.589 37.058 37.058 0 0 0 4.095-6.193 37.174 37.174 0 0 0 4.094-13.763 37.414 37.414 0 0 0 0-7.146 37.32 37.32 0 0 0-.511-3.548z" />
            <path d="M84.462 47.214c0 20.562-16.669 37.231-37.231 37.231S10 67.776 10 47.214 26.669 9.983 47.231 9.983s37.231 16.669 37.231 37.231z" />
          </g>
        </svg>
        <div className="w-1 h-20 bg-orange-500" />
        <p>
          {text.map((line, index) => (
            <Fragment key={index}>
              {index === 1 ? <i>{line}</i> : line}
              {index < text.length - 1 && <br />}
            </Fragment>
          ))}
        </p>
      </div>
    );
  }
}

export default SvgLogo;
