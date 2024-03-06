import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={280}
    height={492}
    viewBox="0 0 280 492"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className="pizza-block"
  >
    <circle cx="135" cy="125" r="125" />
    <rect x="1" y="271" rx="10" ry="10" width="280" height="55" />
    <rect x="0" y="445" rx="10" ry="10" width="60" height="45" />
    <rect x="0" y="340" rx="10" ry="10" width="280" height="88" />
    <rect x="128" y="447" rx="30" ry="30" width="150" height="45" />
  </ContentLoader>
);

export default Skeleton;
